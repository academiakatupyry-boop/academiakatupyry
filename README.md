# ♟️ Academia Katupyry

Plataforma interactiva de enseñanza de ajedrez diseñada para potenciar el talento de niños y jóvenes. Combina lecciones dinámicas, resolución de puzzles y seguimiento de progreso en un entorno gamificado y amigable.

![Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## 🚀 Características Principales

- **Tablero Interactivo**: Implementación robusta usando `chessground` y `chess.js` para una experiencia de juego fluida.
- **Lecciones Gamificadas**: Módulos de aprendizaje paso a paso (movimiento de piezas, tácticas, estrategias).
- **Sistema de Puzzles**: Ejercicios tácticos categorizados (Mate en 1, Celadas, etc.) con validación de movimientos.
- **Suscripciones**: Diversos planes adaptados a las necesidades del estudiante:
  - ♟️ **Peón**: Fundamentos y ejercicios básicos.
  - ♖ **Torre**: Estrategias y torneos mensuales.
  - ♔ **Rey**: Análisis profundo y soporte prioritario.
  - 👑 **Gran Maestro**: Mentoría personalizada y clases en vivo.
  - 🏫 **Institucional**: Planes especiales para colegios y academias.
- **Sección para Padres**: Información detallada sobre los beneficios cognitivos y educativos del ajedrez.
- **Diseño Responsivo**: Interfaz moderna y adaptada a dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Ajedrez**: `chess.js` (lógica) + `chessground` (UI)
- **Base de Datos y Auth**: [Supabase](https://supabase.com/)
- **Despliegue**: [Vercel](https://vercel.com/)

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/academiakatupyry-boop/academiakatupyry.git
   cd academiakatupyry
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` o `.env.local` en la raíz con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```

4. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request para mejoras y correcciones.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
