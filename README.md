# Control de Stock - Cocina

Una aplicación web moderna para el control de inventario en cocinas gastronómicas. Permite registrar el estado de productos por categoría y generar reportes automáticos de faltantes.

## ✨ Funcionalidades

### 🏠 Pantalla Principal
- **Información del turno**: Muestra fecha y turno actual automáticamente
- **Acceso rápido**: Botones para iniciar nuevo control o ver faltantes anteriores
- **Tema oscuro/claro**: Toggle para cambiar entre modos de visualización

### 📋 Control por Categorías
- **8 categorías organizadas**: Panificados, Carne, Pastas, Verduras, Frituras, Rellenos, Insumos Pizza, Postres, Condimentos
- **Búsqueda inteligente**: Buscador que filtra items en tiempo real por nombre
- **Navegación directa**: Click en resultado de búsqueda lleva directamente al item específico
- **Progreso visual**: Barra de progreso que muestra items completados por categoría

### ✅ Estados de Items
- **Hay**: Producto disponible en stock
- **Poco**: Producto con stock limitado
  - **Cantidad**: Selector de 1 a 50 unidades
  - **Unidad**: Opciones de unidades, porciones o paquetes
- **Falta**: Producto sin stock

### 📊 Resumen Final
- **Reporte automático**: Lista organizada de items faltantes y con poco stock
- **Información detallada**: Para items con "Poco", muestra cantidad y unidad específica
- **Compartir**: Envío directo por WhatsApp con formato optimizado
- **Copiar**: Lista formateada para portapapeles
- **Navegación**: Botón para volver y revisar categorías

### 🔄 Validaciones
- **Completitud obligatoria**: No permite avanzar sin seleccionar estado para todos los items
- **Navegación inteligente**: Permite volver a categorías anteriores para revisar y modificar
- **Persistencia**: Guarda automáticamente el progreso del control

### 📱 Experiencia Móvil
- **Diseño responsive**: Optimizado para uso en smartphones
- **PWA ready**: Se puede agregar a la pantalla de inicio como app nativa
- **Acceso offline**: Funciona sin conexión con datos guardados localmente

## 🎯 Casos de Uso

### Control Diario de Stock
1. Iniciar nuevo control desde pantalla principal
2. Seleccionar categoría o usar buscador para item específico
3. Marcar estado de cada producto (Hay/Poco/Falta)
4. Para items con "Poco", especificar cantidad y unidad
5. Completar todas las categorías
6. Revisar resumen final y compartir por WhatsApp

### Búsqueda Rápida
- Escribir nombre del producto en buscador
- Click en resultado para ir directamente al item
- El item se destaca visualmente al llegar a su categoría

### Revisión de Controles Anteriores
- Acceder a "Ver faltantes del control anterior"
- Revisar resumen del último control realizado

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Almacenamiento**: LocalStorage para persistencia
- **Iconos**: Font Awesome 6.0
- **Responsive**: CSS Grid y Flexbox
- **PWA**: Compatible con Progressive Web App

## 📱 Instalación en Móvil

1. Abre la web app en Safari (iPhone) o Chrome (Android)
2. Toca el botón de compartir
3. Selecciona "Agregar a Pantalla de Inicio"
4. Personaliza el nombre (ej: "Control Stock")
5. ¡Acceso instantáneo como app nativa!

## 🚀 Despliegue

La aplicación está lista para desplegar en:
- **GitHub Pages**: Automático desde rama `main`
- **Netlify**: Drag & drop del repositorio
- **Vercel**: Importación directa desde GitHub
- **Firebase Hosting**: Deploy desde CLI

---

*Desarrollado para optimizar el control de inventario en cocinas gastronómicas con enfoque en usabilidad móvil y experiencia de usuario moderna.*