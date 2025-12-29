/**
 * INSTANTES COTIDIANOS - Aplicación Fullscreen
 * Experiencia inmersiva de poesía con versos del poema "Quiero hacer contigo" de Elvira Sastre
 * Navegación vertical fluida con scroll snap
 *
 * Arquitectura:
 * - Sistema híbrido con respaldo estático para textos
 * - Fondos degradados animados con figuras SVG
 * - Imágenes de fondo sutiles en slides seleccionados
 * - Cursor personalizado con física Lerp
 * - Navegación con scroll, teclado y botones
 */

// ========================================
// CONFIGURACIÓN Y CONSTANTES
// ========================================

const CONFIG = {
    // Unsplash API (Plan A para imágenes)
    unsplash: {
        apiUrl: 'https://api.unsplash.com/photos/random',
        // IMPORTANTE: Reemplaza con tu Access Key
        accessKey: 'TU_UNSPLASH_ACCESS_KEY_AQUI',
        count: 15, // Número de imágenes a solicitar
        queries: [
            'urban details',
            'minimal street',
            'abstract shadows',
            'city geometry',
            'street photography',
            'urban minimalism'
        ],
        orientation: 'landscape', // landscape para fullscreen
        contentFilter: 'high',
        timeout: 5000
    },

    // JSON Remoto de citas (Plan A para textos)
    quotes: {
        remoteUrl: 'data/quotes.json',
        timeout: 5000
    },

    // Cursor
    cursor: {
        lerpFactor: 0.15
    },

    // Navegación
    navigation: {
        keyboardEnabled: true,
        scrollHintDuration: 5000 // Ocultar hint después de 5s
    }
};

// ========================================
// ESTADO DE LA APLICACIÓN
// ========================================

const AppState = {
    quotes: [],
    sections: [],
    currentIndex: 0,
    totalSections: 0,
    isNavigating: false, // Flag para prevenir actualizaciones durante navegación programática
    usingFallback: {
        quotes: false
    },
    cursor: {
        pointer: { x: 0, y: 0 },
        follower: { x: 0, y: 0 },
        isHovering: false
    },
    dom: {
        container: null,
        navCounterCurrent: null,
        navCounterTotal: null,
        prevBtn: null,
        nextBtn: null
    },
    isInitialized: false
};

// ========================================
// UTILIDADES
// ========================================

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ========================================
// OBTENCIÓN DE DATOS - IMÁGENES
// ========================================

async function fetchImagesFromUnsplash() {
    console.log('[Plan A - Imágenes] Intentando obtener imágenes de Unsplash API...');

    if (CONFIG.unsplash.accessKey === 'TU_UNSPLASH_ACCESS_KEY_AQUI') {
        console.warn('[Plan A - Imágenes] Access Key no configurada.');
        throw new Error('Unsplash Access Key no configurada');
    }

    try {
        const randomQuery = CONFIG.unsplash.queries[
            Math.floor(Math.random() * CONFIG.unsplash.queries.length)
        ];

        const params = new URLSearchParams({
            client_id: CONFIG.unsplash.accessKey,
            count: CONFIG.unsplash.count,
            query: randomQuery,
            orientation: CONFIG.unsplash.orientation,
            content_filter: CONFIG.unsplash.contentFilter
        });

        const url = `${CONFIG.unsplash.apiUrl}?${params}`;
        const response = await fetchWithTimeout(url, {}, CONFIG.unsplash.timeout);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        const normalizedImages = data.map(img => ({
            id: img.id,
            url: img.urls.regular,
            alt: img.alt_description || 'Fotografía urbana minimalista',
            photographer: img.user.name,
            photographerUrl: img.user.links.html,
            color: img.color || '#1a1a2e'
        }));

        console.log(`[Plan A - Imágenes] ✓ Obtenidas ${normalizedImages.length} imágenes`);
        AppState.usingFallback.images = false;
        return normalizedImages;

    } catch (error) {
        console.error('[Plan A - Imágenes] ✗ Error:', error.message);
        throw error;
    }
}

async function fetchImages() {
    try {
        return await fetchImagesFromUnsplash();
    } catch (error) {
        console.log('[Circuit Breaker - Imágenes] Activando Plan B...');
        console.log('[Circuit Breaker - Imágenes] Nota: Las imágenes no se usan en el diseño actual');
        return [];
    }
}

// ========================================
// OBTENCIÓN DE DATOS - TEXTOS
// ========================================

async function fetchQuotesFromRemote() {
    console.log('[Plan A - Textos] Intentando obtener citas...');

    try {
        const response = await fetchWithTimeout(
            CONFIG.quotes.remoteUrl,
            {},
            CONFIG.quotes.timeout
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(`[Plan A - Textos] ✓ Obtenidas ${data.length} citas`);
        AppState.usingFallback.quotes = false;
        return data;

    } catch (error) {
        console.error('[Plan A - Textos] ✗ Error:', error.message);
        throw error;
    }
}

async function fetchQuotesFromLocal() {
    console.log('[Plan B - Textos] Cargando citas locales...');

    try {
        if (typeof FALLBACK_QUOTES === 'undefined') {
            throw new Error('Datos de respaldo no disponibles');
        }

        console.log(`[Plan B - Textos] ✓ Cargadas ${FALLBACK_QUOTES.length} citas locales`);
        AppState.usingFallback.quotes = true;
        return FALLBACK_QUOTES;

    } catch (error) {
        console.error('[Plan B - Textos] ✗ Error:', error.message);
        return [];
    }
}

async function fetchQuotes() {
    try {
        return await fetchQuotesFromRemote();
    } catch (error) {
        console.log('[Circuit Breaker - Textos] Activando Plan B...');
        return await fetchQuotesFromLocal();
    }
}

// ========================================
// CREACIÓN DE SECCIONES
// ========================================

/**
 * Crea secciones con versos del poema
 */
function createSections(quotes) {
    console.log('[Sections] Creando secciones con versos...');

    const sections = quotes.map(quote => ({
        type: 'quote',
        quote: quote
    }));

    console.log(`[Sections] ✓ Creadas ${sections.length} secciones`);
    return sections;
}

// ========================================
// RENDERIZADO
// ========================================

/**
 * Genera posiciones variadas para las figuras basadas en el índice de sección
 */
function getShapePositions(index, shapeType, shapeNumber) {
    // Usar múltiples seeds para mayor variación
    const seed1 = (index * 17 + shapeNumber * 23) % 50;
    const seed2 = (index * 31 + shapeNumber * 41) % 40;
    const seed3 = (index * 13 + shapeNumber * 19) % 30;

    const positions = {
        heart: [
            { top: (8 + seed1) + '%', left: (5 + seed2) + '%' },
            { top: (50 + seed2) + '%', right: (10 + seed1) + '%' },
            { bottom: (10 + seed3) + '%', left: (15 + seed1) + '%' }
        ],
        star: [
            { top: (10 + seed2) + '%', right: (20 + seed1) + '%' },
            { top: (60 + seed3) + '%', left: (30 + seed2) + '%' },
            { bottom: (20 + seed1) + '%', right: (8 + seed3) + '%' }
        ],
        sparkle: [
            { top: (5 + seed1) + '%', left: (40 + seed2) + '%' },
            { top: (30 + seed3) + '%', right: (5 + seed1) + '%' },
            { bottom: (15 + seed2) + '%', left: (25 + seed3) + '%' }
        ],
        line: [
            { top: (20 + seed1) + '%', left: (2 + seed3) + '%' },
            { bottom: (8 + seed2) + '%', right: (3 + seed1) + '%' }
        ]
    };

    return positions[shapeType][shapeNumber - 1];
}

/**
 * Genera el HTML de las figuras SVG animadas para una sección
 * Varía las figuras según el índice para crear diversidad visual
 */
function generateShapesHTML(index) {
    const shapes = [];

    // Calcular qué combinación de figuras mostrar (varía cada 3 secciones)
    const patternIndex = index % 6;

    // Corazones (3 por sección) - opacidad aumentada en +0.1 (0.7-0.8)
    if (patternIndex === 0 || patternIndex === 2 || patternIndex === 4) {
        const pos1 = getShapePositions(index, 'heart', 1);
        const pos2 = getShapePositions(index, 'heart', 2);
        const pos3 = getShapePositions(index, 'heart', 3);

        shapes.push(`
            <svg class="shape shape--heart shape--heart-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="top: ${pos1.top || 'auto'}; left: ${pos1.left || 'auto'}; right: ${pos1.right || 'auto'}; bottom: ${pos1.bottom || 'auto'};">
                <path d="M50,85 C50,85 15,60 15,40 C15,28 23,20 33,20 C40,20 46,24 50,30 C54,24 60,20 67,20 C77,20 85,28 85,40 C85,60 50,85 50,85 Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.8)" stroke-width="1.5"/>
            </svg>
            <svg class="shape shape--heart shape--heart-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="top: ${pos2.top || 'auto'}; left: ${pos2.left || 'auto'}; right: ${pos2.right || 'auto'}; bottom: ${pos2.bottom || 'auto'};">
                <path d="M50,85 C50,85 15,60 15,40 C15,28 23,20 33,20 C40,20 46,24 50,30 C54,24 60,20 67,20 C77,20 85,28 85,40 C85,60 50,85 50,85 Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.75)" stroke-width="1.5"/>
            </svg>
            <svg class="shape shape--heart shape--heart-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="top: ${pos3.top || 'auto'}; left: ${pos3.left || 'auto'}; right: ${pos3.right || 'auto'}; bottom: ${pos3.bottom || 'auto'};">
                <path d="M50,85 C50,85 15,60 15,40 C15,28 23,20 33,20 C40,20 46,24 50,30 C54,24 60,20 67,20 C77,20 85,28 85,40 C85,60 50,85 50,85 Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.7)" stroke-width="1.5"/>
            </svg>
        `);

        // Sparkles solo en pantallas con corazones
        const sparklePos1 = getShapePositions(index, 'sparkle', 1);
        const sparklePos2 = getShapePositions(index, 'sparkle', 2);
        const sparklePos3 = getShapePositions(index, 'sparkle', 3);

        shapes.push(`
            <div class="shape shape--sparkle shape--sparkle-1" style="top: ${sparklePos1.top || 'auto'}; left: ${sparklePos1.left || 'auto'}; right: ${sparklePos1.right || 'auto'}; bottom: ${sparklePos1.bottom || 'auto'};"></div>
            <div class="shape shape--sparkle shape--sparkle-2" style="top: ${sparklePos2.top || 'auto'}; left: ${sparklePos2.left || 'auto'}; right: ${sparklePos2.right || 'auto'}; bottom: ${sparklePos2.bottom || 'auto'};"></div>
            <div class="shape shape--sparkle shape--sparkle-3" style="top: ${sparklePos3.top || 'auto'}; left: ${sparklePos3.left || 'auto'}; right: ${sparklePos3.right || 'auto'}; bottom: ${sparklePos3.bottom || 'auto'};"></div>
        `);
    }

    // Estrellas (3 por sección) - opacidad aumentada en +0.1 (0.8-0.9)
    if (patternIndex === 1 || patternIndex === 3 || patternIndex === 5) {
        const pos1 = getShapePositions(index, 'star', 1);
        const pos2 = getShapePositions(index, 'star', 2);
        const pos3 = getShapePositions(index, 'star', 3);

        shapes.push(`
            <svg class="shape shape--star shape--star-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="top: ${pos1.top || 'auto'}; left: ${pos1.left || 'auto'}; right: ${pos1.right || 'auto'}; bottom: ${pos1.bottom || 'auto'};">
                <path d="M12 2L15 9L22 10L16.5 15L18 22L12 18.5L6 22L7.5 15L2 10L9 9L12 2Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.9)" stroke-width="1.5"/>
            </svg>
            <svg class="shape shape--star shape--star-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="top: ${pos2.top || 'auto'}; left: ${pos2.left || 'auto'}; right: ${pos2.right || 'auto'}; bottom: ${pos2.bottom || 'auto'};">
                <path d="M12 2L15 9L22 10L16.5 15L18 22L12 18.5L6 22L7.5 15L2 10L9 9L12 2Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.85)" stroke-width="1.5"/>
            </svg>
            <svg class="shape shape--star shape--star-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="top: ${pos3.top || 'auto'}; left: ${pos3.left || 'auto'}; right: ${pos3.right || 'auto'}; bottom: ${pos3.bottom || 'auto'};">
                <path d="M12 2L15 9L22 10L16.5 15L18 22L12 18.5L6 22L7.5 15L2 10L9 9L12 2Z"
                      fill="none" stroke="rgba(159, 159, 234, 0.8)" stroke-width="1.5"/>
            </svg>
        `);

        // Líneas curvas en pantallas con estrellas (sin sparkles)
        const linePos1 = getShapePositions(index, 'line', 1);
        const linePos2 = getShapePositions(index, 'line', 2);

        shapes.push(`
            <svg class="shape shape--line shape--line-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="top: ${linePos1.top || 'auto'}; left: ${linePos1.left || 'auto'}; right: ${linePos1.right || 'auto'}; bottom: ${linePos1.bottom || 'auto'};">
                <path d="M 10 100 Q 60 50 110 100 T 210 100"
                      fill="none" stroke="rgba(159, 159, 234, 0.85)" stroke-width="3" stroke-dasharray="1000" stroke-dashoffset="0" stroke-linecap="round"/>
            </svg>
            <svg class="shape shape--line shape--line-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="top: ${linePos2.top || 'auto'}; left: ${linePos2.left || 'auto'}; right: ${linePos2.right || 'auto'}; bottom: ${linePos2.bottom || 'auto'};">
                <path d="M 10 50 Q 60 100 110 50 T 210 50"
                      fill="none" stroke="rgba(159, 159, 234, 0.75)" stroke-width="3" stroke-dasharray="1000" stroke-dashoffset="0" stroke-linecap="round"/>
            </svg>
        `);
    }

    return shapes.join('');
}

/**
 * Crea el HTML de una sección fullscreen con fondo degradado y figuras animadas
 * Solo muestra autor y fuente en el último verso
 */
function createFullscreenSection(sectionData, index, totalSections, sections) {
    const section = document.createElement('section');
    section.className = 'fullscreen-section';
    section.dataset.index = index;
    section.setAttribute('aria-label', `Sección ${index + 1}`);

    const { quote } = sectionData;

    // El último verso es el último slide (sections.length - 1)
    const isLastQuote = index === sections.length - 1;

    const authorHTML = isLastQuote
        ? `<cite class="section__quote-author">— ${quote.autor}</cite>
           <p class="section__quote-source">${quote.fuente}</p>`
        : '';

    // Seleccionar degradado (rotar entre 5 variantes)
    const gradientIndex = (index % 5) + 1;

    // Mapeo de slides con imágenes de fondo
    const slideBackgroundImages = {
        0: 'assets/img/slide-13.jpg',  // Slide 1
        2: 'assets/img/slide-10.jpg',  // Slide 3
        4: 'assets/img/slide-4.jpg',   // Slide 5
        6: 'assets/img/slide-12.jpg',  // Slide 7
        8: 'assets/img/slide-2.jpg',   // Slide 9
        10: 'assets/img/slide-19.jpg', // Slide 11
        12: 'assets/img/slide-8.jpg',  // Slide 13
        14: 'assets/img/slide-11.jpg', // Slide 15
        16: 'assets/img/slide-6.jpg',  // Slide 17
        18: 'assets/img/slide-15.jpg', // Slide 19
        20: 'assets/img/slide-17.jpg'  // Slide 21
    };

    // Agregar imagen de fondo si este slide tiene una asignada
    let backgroundImageHTML = '';
    if (slideBackgroundImages[index]) {
        let bgPosition = 'center';
        if (index === 14) {
            bgPosition = 'center 65%';  // Slide 15: desplazar un poco hacia abajo
        } else if (index === 20) {
            bgPosition = 'center 70%';  // Slide 21: desplazar 30% hacia arriba desde bottom
        }
        backgroundImageHTML = `<div class="section__background-image" style="background-image: url('${slideBackgroundImages[index]}'); background-position: ${bgPosition};"></div>`;
    }

    // Agregar clase especial para hacer el gradiente semi-transparente
    let backgroundClass = `section__background section__background--gradient-${gradientIndex}`;
    if (slideBackgroundImages[index]) {
        backgroundClass += ' section__background--with-image';
        if (index === 20) {
            backgroundClass += ' section__background--diagonal-fade';  // Slide 21: degradado diagonal
        }
    }

    section.innerHTML = `
        ${backgroundImageHTML}
        <div class="${backgroundClass}">
            <div class="animated-shapes">
                ${generateShapesHTML(index)}
            </div>
        </div>
        <div class="section__content">
            <div class="section__quote">
                <blockquote class="section__quote-text">
                    ${quote.texto}
                </blockquote>
                ${authorHTML}
            </div>
        </div>
    `;

    return section;
}

/**
 * Renderiza todas las secciones
 */
function renderSections(sections) {
    console.log('[Render] Renderizando secciones fullscreen...');

    const container = document.getElementById('fullscreenContainer');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const totalSections = sections.length;

    sections.forEach((sectionData, index) => {
        const section = createFullscreenSection(sectionData, index, totalSections, sections);
        fragment.appendChild(section);
    });

    container.appendChild(fragment);

    console.log(`[Render] ✓ Renderizadas ${sections.length} secciones`);
}

// ========================================
// NAVEGACIÓN
// ========================================

/**
 * Navega a una sección específica
 */
function navigateToSection(index) {
    if (!AppState.dom.container) return;

    const sections = AppState.dom.container.querySelectorAll('.fullscreen-section');

    if (index < 0 || index >= sections.length) {
        return;
    }

    // Activar flag de navegación para prevenir detección durante scroll
    AppState.isNavigating = true;
    AppState.currentIndex = index;

    // Scroll a la sección
    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Actualizar contador
    updateNavigationCounter();

    // Actualizar estado de botones
    updateNavigationButtons();

    // Desactivar flag después de que complete la animación de scroll
    setTimeout(() => {
        AppState.isNavigating = false;
    }, 1000); // 1s es suficiente para que termine el smooth scroll
}

/**
 * Navega a la siguiente sección
 */
function navigateNext() {
    const nextIndex = AppState.currentIndex + 1;
    if (nextIndex < AppState.totalSections) {
        navigateToSection(nextIndex);
    }
}

/**
 * Navega a la sección anterior
 */
function navigatePrev() {
    const prevIndex = AppState.currentIndex - 1;
    if (prevIndex >= 0) {
        navigateToSection(prevIndex);
    }
}

/**
 * Actualiza el contador de navegación
 */
function updateNavigationCounter() {
    if (AppState.dom.navCounterCurrent && AppState.dom.navCounterTotal) {
        AppState.dom.navCounterCurrent.textContent = AppState.currentIndex + 1;
        AppState.dom.navCounterTotal.textContent = AppState.totalSections;
    }
}

/**
 * Actualiza el estado de los botones (disabled si estamos al inicio/final)
 */
function updateNavigationButtons() {
    if (AppState.dom.prevBtn) {
        AppState.dom.prevBtn.disabled = AppState.currentIndex === 0;
    }

    if (AppState.dom.nextBtn) {
        AppState.dom.nextBtn.disabled = AppState.currentIndex === AppState.totalSections - 1;
    }
}

/**
 * Detecta el índice actual basado en la posición del scroll
 */
function detectCurrentSection() {
    // No detectar durante navegación programática (botones/teclado)
    if (AppState.isNavigating || !AppState.dom.container) {
        return;
    }

    const sections = AppState.dom.container.querySelectorAll('.fullscreen-section');

    let currentIndex = 0;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
            minDistance = distance;
            currentIndex = index;
        }
    });

    if (currentIndex !== AppState.currentIndex) {
        AppState.currentIndex = currentIndex;
        updateNavigationCounter();
        updateNavigationButtons();
    }
}

/**
 * Configura los event listeners de navegación
 */
function setupNavigation() {
    console.log('[Navigation] Configurando controles...');

    // Cachear elementos DOM
    AppState.dom.container = document.getElementById('fullscreenContainer');
    AppState.dom.prevBtn = document.getElementById('prevBtn');
    AppState.dom.nextBtn = document.getElementById('nextBtn');
    AppState.dom.navCounterCurrent = document.querySelector('.nav-counter__current');
    AppState.dom.navCounterTotal = document.querySelector('.nav-counter__total');

    const scrollHint = document.getElementById('scrollHint');

    // Botones de navegación
    if (AppState.dom.prevBtn) {
        AppState.dom.prevBtn.addEventListener('click', navigatePrev);
    }

    if (AppState.dom.nextBtn) {
        AppState.dom.nextBtn.addEventListener('click', navigateNext);
    }

    // Navegación con teclado
    if (CONFIG.navigation.keyboardEnabled) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                navigateNext();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                navigatePrev();
            }
        });
    }

    // Detectar sección actual en scroll
    if (AppState.dom.container) {
        AppState.dom.container.addEventListener('scroll', () => {
            detectCurrentSection();

            // Ocultar hint al hacer scroll
            if (scrollHint && !scrollHint.classList.contains('hidden')) {
                scrollHint.classList.add('hidden');
            }
        });
    }

    // Ocultar hint automáticamente después de X segundos
    if (scrollHint) {
        setTimeout(() => {
            scrollHint.classList.add('hidden');
        }, CONFIG.navigation.scrollHintDuration);
    }

    console.log('[Navigation] ✓ Controles configurados');
}

// ========================================
// CURSOR PERSONALIZADO
// ========================================

function setupCustomCursor() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        console.log('[Cursor] Dispositivo táctil detectado');
        return;
    }

    const cursorPointer = document.querySelector('.cursor__pointer');
    const cursorFollower = document.querySelector('.cursor__follower');
    const cursorContainer = document.querySelector('.cursor');

    if (!cursorPointer || !cursorFollower) {
        return;
    }

    // Movimiento del puntero
    document.addEventListener('mousemove', (e) => {
        AppState.cursor.pointer.x = e.clientX;
        AppState.cursor.pointer.y = e.clientY;

        cursorPointer.style.left = `${e.clientX}px`;
        cursorPointer.style.top = `${e.clientY}px`;
    });

    // Hover sobre elementos interactivos
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button')) {
            cursorContainer.classList.add('cursor--hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button')) {
            cursorContainer.classList.remove('cursor--hover');
        }
    });

    // Animación del follower con Lerp
    function animateCursorFollower() {
        AppState.cursor.follower.x = lerp(
            AppState.cursor.follower.x,
            AppState.cursor.pointer.x,
            CONFIG.cursor.lerpFactor
        );

        AppState.cursor.follower.y = lerp(
            AppState.cursor.follower.y,
            AppState.cursor.pointer.y,
            CONFIG.cursor.lerpFactor
        );

        cursorFollower.style.left = `${AppState.cursor.follower.x}px`;
        cursorFollower.style.top = `${AppState.cursor.follower.y}px`;

        requestAnimationFrame(animateCursorFollower);
    }

    animateCursorFollower();

    console.log('[Cursor] ✓ Cursor personalizado inicializado');
}

// ========================================
// UTILIDADES DE UI
// ========================================

function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    if (splash) {
        // Esperar un mínimo de 2 segundos para que se vea la animación completa
        setTimeout(() => {
            splash.classList.add('hidden');
        }, 2000);
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

function showStatus() {
    const status = [];

    if (AppState.usingFallback.images) {
        status.push('🖼️ Imágenes: Plan B (Local)');
    } else {
        status.push('🖼️ Imágenes: Plan A (Unsplash API)');
    }

    if (AppState.usingFallback.quotes) {
        status.push('📝 Textos: Plan B (Local)');
    } else {
        status.push('📝 Textos: Plan A (JSON Remoto)');
    }

    console.log('\n=================================');
    console.log('ESTADO DEL SISTEMA');
    console.log('=================================');
    status.forEach(s => console.log(s));
    console.log(`📊 Total de secciones: ${AppState.totalSections}`);
    console.log('=================================\n');
}

// ========================================
// INICIALIZACIÓN
// ========================================

async function init() {
    console.log('[App] Inicializando aplicación fullscreen...');

    try {
        // Fase 1: Obtener datos
        console.log('[App] Fase 1: Obteniendo datos...');
        const [quotes] = await Promise.allSettled([
            fetchQuotes()
        ]);

        AppState.quotes = quotes.status === 'fulfilled' ? quotes.value : [];

        if (AppState.quotes.length === 0) {
            throw new Error('No hay suficiente contenido disponible');
        }

        // Fase 2: Crear secciones con versos del poema
        console.log('[App] Fase 2: Creando secciones...');
        AppState.sections = createSections(AppState.quotes);
        AppState.totalSections = AppState.sections.length;

        // Fase 3: Renderizar
        console.log('[App] Fase 3: Renderizando...');
        renderSections(AppState.sections);

        // Fase 4: Configurar navegación
        console.log('[App] Fase 4: Configurando navegación...');
        updateNavigationCounter();
        updateNavigationButtons();
        setupNavigation();

        // Fase 5: Cursor personalizado
        console.log('[App] Fase 5: Inicializando cursor...');
        setupCustomCursor();

        // Ocultar splash screen y loading
        hideSplashScreen();
        hideLoading();

        // Mostrar estado
        showStatus();

        AppState.isInitialized = true;

        console.log('[App] ✓ Aplicación inicializada correctamente');

    } catch (error) {
        console.error('[App] ✗ Error crítico:', error);

        const container = document.getElementById('fullscreenContainer');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 2rem;">
                    <div>
                        <h2 style="color: #9F9FEA; margin-bottom: 1rem; font-size: 2rem;">
                            No se pudo cargar el contenido
                        </h2>
                        <p style="color: #6b6b8f; font-size: 1.125rem;">
                            Por favor, recarga la página o verifica tu conexión.
                        </p>
                    </div>
                </div>
            `;
        }

        // Ocultar splash y loading incluso en caso de error
        hideSplashScreen();
        hideLoading();
    }
}

// ========================================
// PROTECCIÓN DE IMÁGENES
// ========================================

/**
 * Previene descarga de imágenes mediante varios métodos
 */
function setupImageProtection() {
    // Prevenir click derecho en todo el documento
    document.addEventListener('contextmenu', (e) => {
        // Permitir click derecho solo en inputs y textareas
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // Prevenir arrastrar imágenes
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('section__background-image')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevenir copiar imágenes con Ctrl+C
    document.addEventListener('copy', (e) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length === 0) {
            e.preventDefault();
            return false;
        }
    });

    // Prevenir guardar imagen con teclado (Ctrl+S)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            return false;
        }
    });

    console.log('[Protection] ✓ Protección de imágenes activada');
}

// ========================================
// PUNTO DE ENTRADA
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        setupImageProtection();
    });
} else {
    init();
    setupImageProtection();
}

console.log('=================================');
console.log('INSTANTES COTIDIANOS');
console.log('Experiencia inmersiva fullscreen');
console.log('=================================');
