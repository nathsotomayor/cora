/**
 * ARCHIVO DE CONFIGURACIÓN DE EJEMPLO
 *
 * Este archivo muestra cómo puedes externalizar la configuración de tu proyecto.
 * Para usarlo:
 *
 * 1. Copia este archivo y renómbralo a: config.js
 * 2. Añade tus propias API keys y URLs
 * 3. Asegúrate de que config.js esté en .gitignore (para no subir tus keys)
 * 4. Importa la configuración en app.js
 *
 * NOTA: Este enfoque es opcional. El proyecto funciona configurando
 * directamente en app.js, pero externalizar la config es una mejor práctica.
 */

const INSTANTES_CONFIG = {
    // ==========================================
    // UNSPLASH API - Configuración de Imágenes
    // ==========================================
    unsplash: {
        // Obtén tu Access Key en: https://unsplash.com/developers
        // 1. Crea una cuenta
        // 2. Ve a "Your apps" → "New Application"
        // 3. Copia tu "Access Key"
        accessKey: 'TU_UNSPLASH_ACCESS_KEY_AQUI',

        // URL de la API (no cambiar a menos que uses un proxy)
        apiUrl: 'https://api.unsplash.com/photos/random',

        // Cantidad de imágenes a solicitar por carga (max: 30)
        count: 12,

        // Keywords de búsqueda para la curaduría algorítmica
        // Personaliza según la estética que busques
        queries: [
            'urban details',
            'minimal street',
            'abstract shadows',
            'city geometry',
            'street photography',
            'urban minimalism',
            'architecture minimal',
            'concrete texture'
        ],

        // Orientación de imágenes: 'landscape', 'portrait', 'squarish'
        // 'squarish' permite mix de orientaciones (recomendado para Masonry)
        orientation: 'squarish',

        // Filtro de contenido: 'low', 'high'
        // 'high' filtra contenido sensible o inapropiado
        contentFilter: 'high',

        // Timeout en milisegundos (5000 = 5 segundos)
        timeout: 5000
    },

    // ==========================================
    // JSON REMOTO - Configuración de Textos
    // ==========================================
    quotes: {
        // URL del JSON remoto con las citas
        // Opciones:
        // - GitHub Gist: 'https://gist.githubusercontent.com/usuario/id/raw/quotes.json'
        // - GitHub Pages: 'https://usuario.github.io/repo/data/quotes.json'
        // - Tu propio servidor: 'https://tudominio.com/api/quotes.json'
        // - Local (development): 'data/quotes.json'
        remoteUrl: 'data/quotes.json',

        // Timeout en milisegundos
        timeout: 5000
    },

    // ==========================================
    // LAYOUT MASONRY
    // ==========================================
    masonry: {
        // Altura base de fila (debe coincidir con --grid-row-height en CSS)
        rowHeight: 10,

        // Espacio entre tarjetas (debe coincidir con --grid-gap en CSS)
        // 24px = 1.5rem (si root font-size es 16px)
        gap: 24
    },

    // ==========================================
    // CURSOR PERSONALIZADO
    // ==========================================
    cursor: {
        // Factor de interpolación lineal (Lerp)
        // Valores: 0 a 1
        // Menor = más suave pero más lag
        // Mayor = más directo pero menos fluido
        // Recomendado: 0.10 - 0.20
        lerpFactor: 0.15,

        // Tamaño del puntero (px)
        pointerSize: 8,

        // Tamaño del follower (px)
        followerSize: 32,

        // Tamaño del follower en hover (px)
        followerSizeHover: 60
    },

    // ==========================================
    // INTERSECTION OBSERVER
    // ==========================================
    intersectionObserver: {
        // Margen alrededor del root (viewport)
        // Positivo: trigger antes de entrar al viewport
        // Negativo: trigger después de entrar al viewport
        rootMargin: '0px',

        // Threshold: porcentaje visible para trigger (0 a 1)
        // 0.1 = 10% visible
        threshold: 0.1
    },

    // ==========================================
    // PERFORMANCE Y OPTIMIZACIÓN
    // ==========================================
    performance: {
        // Debounce para recálculo de Masonry en resize (ms)
        resizeDebounce: 150,

        // Lazy loading: distancia para pre-cargar imágenes (px)
        lazyLoadMargin: 200,

        // Delay inicial para cálculo de Masonry (ms)
        // Permite que el DOM se estabilice
        masonryInitialDelay: 100
    },

    // ==========================================
    // FEATURES OPCIONALES
    // ==========================================
    features: {
        // Activar/desactivar cursor personalizado
        customCursor: true,

        // Activar/desactivar animaciones de entrada
        entryAnimations: true,

        // Activar/desactivar efecto parallax (no implementado aún)
        parallax: false,

        // Modo debug: logs extendidos en consola
        debug: true
    },

    // ==========================================
    // MENSAJES Y TEXTOS DE UI
    // ==========================================
    ui: {
        loadingText: 'Descubriendo instantes...',
        errorText: 'No se pudo cargar el contenido',
        errorSubtext: 'Por favor, recarga la página o verifica tu conexión.',
        noContentText: 'No hay contenido disponible en este momento.'
    }
};

// Exportar configuración
// (Descomentar si usas módulos ES6)
// export default INSTANTES_CONFIG;

// Para usar con CommonJS (Node.js)
// (Descomentar si lo necesitas)
// module.exports = INSTANTES_CONFIG;
