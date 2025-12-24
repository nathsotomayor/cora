# 💙 Quiero hacer contigo - Storytelling Visual

**Una experiencia inmersiva del poema de Elvira Sastre**

> *"Si la palabra es acción entonces ven a contarme el amor,*
> *que quiero hacer contigo todo lo que la poesía aún no ha escrito."*

---

## 📖 Sobre el Proyecto

Este proyecto transforma el hermoso poema **"Quiero hacer contigo todo lo que la poesía aún no ha escrito"** de **Elvira Sastre** en una experiencia visual inmersiva de storytelling.

Cada verso del poema se presenta en pantalla completa, acompañado de una imagen cuidadosamente seleccionada que refuerza la emoción y el mensaje de esos versos. El resultado es un viaje narrativo que cuenta la historia de amor del poema verso a verso, imagen a imagen.

### 🎯 Concepto

- **22 secciones**: Cada parte del poema tiene su propia pantalla
- **Navegación vertical**: Desliza hacia abajo para descubrir la historia
- **Imágenes temáticas**: Cada verso está acompañado por una imagen que representa visualmente su mensaje
- **Diseño inmersivo**: Pantalla completa, sin distracciones, solo el poema y las imágenes

---

## ✨ Características

### 🎨 Experiencia Visual

- **Pantalla de carga con corazón animado** - Un corazón se dibuja progresivamente antes de comenzar
- **Fullscreen storytelling** - Cada verso ocupa toda la pantalla para máxima inmersión
- **Scroll snap fluido** - Navegación suave entre secciones con anclaje automático
- **Paleta Midnight Blue** - Colores oscuros y elegantes que crean atmósfera íntima

### 🧭 Navegación

Múltiples formas de explorar el poema:
- **Scroll/deslizamiento** - Natural y fluido
- **Botones flotantes** - Controles a la derecha (← ↑ ↓ →)
- **Teclado** - Flechas arriba/abajo, izquierda/derecha, y Espacio
- **Contador visual** - Muestra en qué verso estás (ej: 5/22)

### 💻 Técnicas

- **Cursor personalizado** con física de interpolación (Lerp)
- **Animaciones suaves** de entrada para cada sección
- **Sistema híbrido** de carga de imágenes
- **Totalmente responsivo** - Funciona en desktop, tablet y móvil
- **Accesibilidad** - Respeta `prefers-reduced-motion`

---

## 📝 El Poema

**"Quiero hacer contigo todo lo que la poesía aún no ha escrito"**
por **Elvira Sastre**

Del libro: *43 Maneras de Soltarse el Pelo*

El poema narra una historia de amor íntima y visceral. Dividido en 22 secciones, cada una representa un momento de la narrativa:

1. **La Aparición** - "Cualquiera diría al verte..."
2. **La Llegada** - "Te veo venir por el pasillo..."
3. **La Entrada** - "Entras en mi casa —en mi vida—..."
4. ... hasta llegar a...
22. **La Invitación Final** - "Si la palabra es acción..."

---

## 🎬 Estructura Narrativa

El poema se divide en momentos temáticos:

| Secciones | Tema | Emoción |
|-----------|------|---------|
| 1-5 | **El Encuentro** | Asombro, presentación |
| 6-10 | **El Diálogo** | Vulnerabilidad, valentía |
| 11-14 | **La Conexión** | Intimidad, reciprocidad |
| 15-18 | **La Admiración** | Belleza, contemplación |
| 19-22 | **La Revelación** | Deseo, invitación |

---

## 🚀 Cómo Usar

### Ejecución Local

```bash
cd instantes-cotidianos
python -m http.server 8000
```

Abre tu navegador en: `http://localhost:8000`

### Experiencia Recomendada

1. **Pantalla completa** (F11) para máxima inmersión
2. **Auriculares** con música ambiental suave (opcional)
3. **Tiempo sin prisa** - Lee cada verso, contempla cada imagen
4. **Navegación lenta** - Deja que cada sección respire antes de continuar

---

## 🖼️ Personalización de Imágenes

Las imágenes se gestionan en `/data/data-fallback.js`. Cada sección tiene una imagen asignada:

```javascript
{
    id: "img_01",
    url: "https://images.unsplash.com/photo-...",
    alt: "Descripción de la imagen",
    photographer: "Nombre",
    photographerUrl: "#",
    color: "#1a1a2e"  // Color de placeholder
}
```

### Temas de Imágenes por Sección

- **Versos 1-5**: Siluetas, pasillos, puertas abiertas
- **Versos 6-10**: Intimidad, miradas, luces rojas
- **Versos 11-14**: Tiempo, caminos, libertad
- **Versos 15-18**: Belleza física, ojos, despertar
- **Versos 19-22**: Sorpresa, deseo, ciudad, escritura

### Cambiar las Imágenes

Para usar tus propias imágenes:

1. Abre `data/data-fallback.js`
2. Modifica la propiedad `url` de cada imagen:

```javascript
url: "https://tu-imagen.com/foto.jpg"  // Tu URL aquí
```

**Fuentes de imágenes gratuitas:**
- [Unsplash](https://unsplash.com) - Fotografía de alta calidad
- [Pexels](https://pexels.com) - Imágenes libres
- [Pixabay](https://pixabay.com) - Recursos gratuitos

---

## 📁 Estructura del Proyecto

```
instantes-cotidianos/
├── index.html                 # Página principal
├── README.md                  # Este archivo
├── LICENSE                    # Licencia MIT
├── assets/
│   ├── css/
│   │   └── styles.css         # Estilos con paleta Midnight Blue
│   └── js/
│       └── app.js             # Lógica de navegación y animaciones
└── data/
    ├── data-fallback.js       # Poema completo + imágenes
    └── quotes.json            # Versión JSON del poema
```

---

## 🎨 Paleta de Colores

```css
--color-midnight-blue: #191970    /* Azul midnight principal */
--color-bg-primary: #0a0913       /* Fondo oscuro */
--color-text-primary: #EAEAFA     /* Texto claro */
--color-text-secondary: #9F9FEA   /* Texto secundario lavanda */
```

---

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `↓` o `→` | Siguiente verso |
| `↑` o `←` | Verso anterior |
| `Espacio` | Siguiente verso |
| `Home` | Ir al inicio (scroll al principio) |
| `End` | Ir al final (scroll al último verso) |

---

## 📱 Responsividad

El proyecto se adapta a diferentes dispositivos:

### Desktop
- Texto grande (2rem / 32px)
- Controles flotantes a la derecha
- Cursor personalizado activo

### Tablet
- Texto mediano (1.75rem)
- Controles adaptados

### Móvil
- Texto optimizado (1.5rem)
- Controles en la parte inferior central
- Cursor personalizado desactivado (táctil)

---

## 🛠️ Stack Tecnológico

- **HTML5** - Estructura semántica
- **CSS3** - Variables, Grid, Animaciones
- **Vanilla JavaScript (ES6+)** - Sin frameworks
- **SVG** - Corazón animado en splash screen
- **Scroll Snap API** - Navegación fluida
- **Intersection Observer API** - Animaciones de entrada

---

## 💡 Inspiración

Este proyecto nace de la idea de que la poesía no solo se lee, sino que se **experimenta**. Al combinar los versos de Elvira Sastre con imágenes que amplifican su mensaje, creamos una nueva forma de conectar con el poema.

La navegación vertical imita el acto de pasar páginas de un libro, pero cada "página" es una experiencia visual completa que invita a la pausa y la contemplación.

---

## 📜 Créditos y Licencias

### Poema
- **Autora**: Elvira Sastre
- **Obra**: "Quiero hacer contigo todo lo que la poesía aún no ha escrito"
- **Libro**: *43 Maneras de Soltarse el Pelo*
- **Uso**: Con fines educativos y de apreciación artística

### Código
- **Licencia**: MIT
- **Autor del proyecto**: [Tu nombre]
- **Basado en**: El hermoso poema de Elvira Sastre

### Imágenes
- Las imágenes provienen de Unsplash y están sujetas a la [Licencia de Unsplash](https://unsplash.com/license)
- Atribución automática al fotógrafo en cada imagen

---

## 🤝 Contribuciones

Este es un proyecto de homenaje al trabajo de Elvira Sastre. Si quieres contribuir:

1. **Mejora las imágenes** - Sugiere imágenes más representativas para cada verso
2. **Optimiza la experiencia** - Mejora animaciones, transiciones, UX
3. **Añade features** - Música de fondo, efectos de sonido sutiles, etc.

---

## 💌 Nota Final

> *"Que quiero hacer contigo todo lo que la poesía aún no ha escrito."*

Este proyecto es un intento de hacer visible lo que Elvira Sastre escribió con palabras. Cada verso merece ser contemplado, cada emoción merece su imagen.

Tómate tu tiempo. Lee despacio. Siente cada verso.

---

**Hecho con 💙 como homenaje a la poesía de Elvira Sastre**

*Si disfrutas de este proyecto, considera comprar el libro original "[43 Maneras de Soltarse el Pelo](https://www.amazon.es/43-maneras-soltarse-pelo-Seix/dp/841532261X)" para apoyar a la autora.*
