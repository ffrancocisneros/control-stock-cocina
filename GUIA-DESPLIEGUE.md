# 🚀 Guía para Usar la App en tu Celular

## Opción 1: Netlify (LA MÁS FÁCIL - 2 minutos) ⭐ RECOMENDADA

### Pasos:
1. **Ve a**: https://app.netlify.com
2. **Regístrate** con tu email (o usa GitHub)
3. **Arrastra** la carpeta `control-stock-cocina` al área que dice "Drag and drop your site output folder here"
4. **¡Listo!** Netlify te dará una URL como: `https://random-name-123.netlify.app`
5. **Abre esa URL** en tu celular y guárdala en favoritos

### Ventajas:
- ✅ Gratis para siempre
- ✅ Sin instalar nada
- ✅ Solo arrastrar y soltar
- ✅ URL personalizable
- ✅ HTTPS automático

---

## Opción 2: GitHub Pages (10 minutos)

### Requisitos:
- Cuenta de GitHub (gratis)
- Git instalado (o usar GitHub Desktop)

### Pasos:

#### A) Instalar Git (si no lo tienes):
1. Descarga desde: https://git-scm.com/download/win
2. Instala con opciones por defecto

#### B) Subir a GitHub:
1. Crea cuenta en: https://github.com/join
2. Crea nuevo repositorio: https://github.com/new
3. Nombre: `control-stock-cocina`
4. Marca como **Público**
5. Haz clic en **Create repository**

#### C) Subir archivos (elegir una opción):

**Opción C1: GitHub Desktop (Más fácil)**
1. Descarga: https://desktop.github.com/
2. Instala e inicia sesión
3. File → Add Local Repository
4. Selecciona la carpeta `control-stock-cocina`
5. Commit → Push

**Opción C2: Terminal Git**
```bash
cd C:\Users\Franco\control-stock-cocina
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/control-stock-cocina.git
git push -u origin main
```

#### D) Activar GitHub Pages:
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `main`
4. Save

#### E) Acceder:
- URL será: `https://TU-USUARIO.github.io/control-stock-cocina`

---

## Opción 3: Vercel (Similar a Netlify)

### Pasos:
1. Ve a: https://vercel.com
2. Regístrate con GitHub
3. Importa tu repositorio
4. ¡Listo!

---

## Opción 4: Firebase Hosting (más avanzado)

### Requisitos:
- Cuenta de Google
- Node.js instalado

### Pasos:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📱 Acceso desde Celular

Una vez tengas la URL:

### Android:
1. Abre Chrome
2. Ve a tu URL
3. Menú → "Añadir a pantalla de inicio"

### iPhone:
1. Abre Safari
2. Ve a tu URL
3. Compartir → "Añadir a pantalla de inicio"

---

## 🎯 Recomendación Final

**Usa Netlify** - Es la opción más rápida y fácil. Solo:
1. Entras a la web
2. Arrastras la carpeta
3. ¡Ya está funcionando!

**No necesitas Git ni saber código.**

---

## 💡 Sincronización entre Dispositivos

**IMPORTANTE**: La app actualmente guarda datos en el navegador local. Esto significa:
- Cada dispositivo tiene su propio control
- No se sincronizan automáticamente entre PC y celular
- Para sincronización necesitarías agregar una base de datos

**Para trabajar en varios dispositivos**:
- Usa siempre el mismo navegador
- Los datos se guardan en ese navegador específico
- Si cambias de dispositivo, necesitas hacer un nuevo control

**Si quieres sincronización real**, puedo ayudarte a agregar Firebase para que tus controles se guarden en la nube y sean accesibles desde cualquier dispositivo.

