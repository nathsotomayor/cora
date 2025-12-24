# 📸 Imágenes de Respaldo (Plan B)

Esta carpeta contiene las imágenes locales que se utilizan como **Plan B** cuando la API de Unsplash no está disponible o falla.

## 🎯 Propósito

El sistema implementa un **Circuit Breaker** que automáticamente cambia al Plan B (imágenes locales) en los siguientes casos:

- La API de Unsplash no responde (timeout)
- Error de red o conectividad
- Límite de tasa excedido (50 peticiones/hora en cuenta gratuita)
- Access Key no configurada o inválida

## 📋 Requisitos de las Imágenes

Para mantener la coherencia estética del proyecto, las imágenes de respaldo deben seguir estos criterios:

### Estética y Contenido

- **Temática**: Fotografía urbana minimalista
- **Elementos visuales**:
  - Sombras geométricas
  - Texturas de paredes y pavimentos
  - Arquitectura abstracta
  - Espacios negativos
  - Intersecciones y calles vacías
  - Detalles urbanos cotidianos
  - Reflejos en cristales
  - Siluetas solitarias

### Especificaciones Técnicas

| Aspecto | Especificación | Razón |
|---------|----------------|-------|
| **Formato** | WebP (preferido) o JPG | Mejor compresión y calidad |
| **Compresión** | 80% lossy | Balance entre calidad y tamaño |
| **Orientaciones** | Mix: vertical, horizontal, cuadrada | Layout Masonry dinámico |
| **Dimensiones** | Variables (min: 600px lado corto) | Responsive y flexible |
| **Tonos** | Desaturados, azulados, nocturnos | Coherencia con paleta Midnight Blue |
| **Cantidad** | 15-20 imágenes | Suficiente variedad |

### Esquema de Nombres

```
fallback-01.webp
fallback-02.webp
fallback-03.webp
...
fallback-15.webp
```

**Importante**: Los nombres deben coincidir con los definidos en `/data/data-fallback.js`

## 🔍 Fuentes Recomendadas

### Sitios de Fotografía Gratuita

1. **Unsplash** - [unsplash.com](https://unsplash.com)
   - Búsquedas sugeridas:
     - `minimal street photography`
     - `urban shadows`
     - `abstract architecture`
     - `city geometry`

2. **Pexels** - [pexels.com](https://www.pexels.com)
   - Búsquedas sugeridas:
     - `urban minimal`
     - `street photography black and white`
     - `concrete texture`

3. **Pixabay** - [pixabay.com](https://pixabay.com)
   - Búsquedas sugeridas:
     - `minimalist architecture`
     - `urban details`

### Licencias

- ✅ Usa solo imágenes con licencia libre (dominio público, CC0, o similar)
- ✅ Verifica los términos de cada plataforma
- ❌ No uses imágenes con copyright sin permiso

## 🛠️ Proceso de Optimización

### Opción 1: Herramientas Online

**Squoosh** (Recomendado)
- URL: [squoosh.app](https://squoosh.app)
- Pasos:
  1. Sube la imagen
  2. Selecciona formato WebP
  3. Ajusta calidad a ~80%
  4. Descarga

**TinyPNG/TinyJPG**
- URL: [tinypng.com](https://tinypng.com)
- Para JPG/PNG (antes de convertir a WebP)

### Opción 2: Línea de Comandos

**ImageMagick** (Para usuarios avanzados)

```bash
# Convertir a WebP con 80% calidad
magick convert imagen.jpg -quality 80 fallback-01.webp

# Redimensionar si es muy grande (max 1920px ancho)
magick convert imagen.jpg -resize 1920x\> -quality 80 fallback-01.webp
```

**cwebp** (Conversor oficial de Google)

```bash
# Instalar en Ubuntu/Debian
sudo apt-get install webp

# Convertir
cwebp -q 80 imagen.jpg -o fallback-01.webp
```

### Opción 3: Scripts Automatizados

**Bash Script** (Linux/macOS)

```bash
#!/bin/bash
# optimizar-imagenes.sh

counter=1
for img in *.jpg *.png; do
    [ -f "$img" ] || continue
    output=$(printf "fallback-%02d.webp" "$counter")
    cwebp -q 80 "$img" -o "$output"
    echo "✓ Creado: $output"
    ((counter++))
done
```

## 📐 Ejemplos de Dimensiones Recomendadas

Para crear un layout Masonry visual mente interesante, mezcla diferentes proporciones:

| Tipo | Proporción | Ejemplo (px) | Uso |
|------|-----------|--------------|-----|
| Vertical | 3:4 o 2:3 | 900 × 1200 | Calles, edificios |
| Horizontal | 4:3 o 3:2 | 1200 × 900 | Panoramas urbanos |
| Cuadrada | 1:1 | 1000 × 1000 | Detalles, texturas |
| Vertical extendida | 9:16 | 1080 × 1920 | Formato móvil |

## ✅ Checklist de Integración

Después de añadir tus imágenes:

- [ ] Las imágenes están en formato WebP u optimizado
- [ ] Los nombres coinciden con `data/data-fallback.js`
- [ ] Hay al menos 15 imágenes
- [ ] Las imágenes tienen diferentes orientaciones
- [ ] La temática es coherente con el proyecto
- [ ] Probé el Plan B desactivando la API de Unsplash

## 🧪 Probar el Plan B

Para verificar que tus imágenes de respaldo funcionan:

1. Abre `assets/js/app.js`
2. En la configuración de Unsplash, comenta el Access Key:

```javascript
accessKey: '', // Temporal: forzar Plan B
```

3. Abre el proyecto en el navegador
4. Verifica en la consola:

```
[Plan A - Imágenes] Access Key de Unsplash no configurada. Saltando a Plan B.
[Circuit Breaker - Imágenes] Activando Plan B...
[Plan B - Imágenes] ✓ Cargadas 15 imágenes locales
```

5. Las imágenes locales deben mostrarse correctamente

## 📝 Actualizar el Array de Imágenes

Cada vez que añadas nuevas imágenes, actualiza `/data/data-fallback.js`:

```javascript
const FALLBACK_IMAGES = [
    {
        id: "fallback_01",
        url: "assets/img/fallback/fallback-01.webp",
        alt: "Descripción descriptiva de la imagen",
        photographer: "Archivo Local",
        photographerUrl: "#",
        color: "#2a2a3e" // Color dominante para placeholder
    },
    // ... más imágenes
];
```

### Cómo obtener el color dominante

**Opción 1: Herramienta Online**
- [imagecolorpicker.com](https://imagecolorpicker.com)
- Sube la imagen y toma el color principal

**Opción 2: Eyedropper en el navegador**
- Abre la imagen en el navegador
- Usa DevTools → Eyedropper
- Anota el color hexadecimal

**Opción 3: Usar tonos genéricos**
- Para fondos oscuros: `#1a1a2e`, `#2a2a3e`, `#0a0a1a`
- Mantiene consistencia con la paleta Midnight Blue

## 🎨 Ejemplos de Imágenes Ideales

### ✅ Buenos Ejemplos

- Sombra alargada de una persona en pavimento gris
- Escaleras de concreto con líneas diagonales
- Ventana con reflejo distorsionado de edificios
- Intersección vacía con señalización minimalista
- Textura de pared con luz y sombra
- Banco de parque solitario bajo farola
- Lluvia en cristal con luces borrosas al fondo

### ❌ Evitar

- Imágenes con mucho texto visible
- Escenas muy saturadas o coloridas
- Multitudes o muchas personas
- Branding o logos prominentes
- Imágenes pixeladas o de baja calidad
- Contenido inapropiado o sensible

## 💡 Tip Final

**Consistencia es clave**: Aunque cada imagen sea diferente, deben sentirse parte de la misma familia visual. Piensa en ellas como capítulos de un mismo libro fotográfico sobre la belleza oculta de lo cotidiano.

---

¿Necesitas ayuda? Consulta el [README principal](../../../README.md) del proyecto.
