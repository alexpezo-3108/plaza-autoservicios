# Plaza Autoservicios — Sitio web (prototipo)

Sitio estático. No requiere build ni dependencias.

## Estructura
```
/
├── index.html                 → redirige a Home.dc.html
├── Home.dc.html               → Inicio
├── Conocenos.dc.html          → Conócenos
├── Aliados.dc.html            → Aliados
├── Trabaja.dc.html            → Trabaja con nosotros
├── Vacantes.dc.html           → Vacantes
├── Novedades.dc.html          → Blog
├── NovedadDetalle.dc.html     → Entrada de blog
├── Ubicaciones.dc.html        → Encontrar tienda
├── VentaCorporativa.dc.html   → Venta corporativa
├── Legal.dc.html              → Legales
├── support.js                 → runtime de las páginas (requerido)
├── vercel.json                → configuración de Vercel
└── assets/
    ├── fonts/                 → Malmo Sans (.woff2)
    ├── *.svg                  → íconos, logo, decoraciones
    ├── *.webp / *.png         → ilustraciones e imágenes
    ├── mapa-norte-chico.json  → geometría del mapa
    ├── delivery.js            → botón flotante Plazito en moto
    └── confetti.js
```

## Subir a GitHub
```bash
cd plaza-autoservicios
git init
git add .
git commit -m "Sitio Plaza Autoservicios"
git branch -M main
git remote add origin https://github.com/USUARIO/plaza-autoservicios.git
git push -u origin main
```

## Desplegar en Vercel
1. vercel.com → **Add New → Project** → importar el repositorio.
2. Framework Preset: **Other**. Build Command: *(vacío)*. Output Directory: *(vacío / raíz)*.
3. **Deploy**. La raíz (/) abre Home.dc.html.

## Notas
- Requiere conexión a internet (React se carga desde unpkg.com).
- Formularios: demostración, sin backend conectado.
- Imágenes fotográficas: referenciales (excepto Ubicanos).
