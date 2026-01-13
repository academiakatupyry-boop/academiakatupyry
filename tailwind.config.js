/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary-island": "#7C3AED", "primary-light": "#9F7AEA",
                "secondary-adventure": "#FFD700", "secondary-orange": "#FFA500",
                "accent-ocean": "#6DD5ED", "accent-path": "#FF6B6B",
                "text-dark-fun": "#2D3748", "text-light-fun": "#FFFFFF",
                "background-sky": "#E0FFFF", "background-grass": "#90EE90",
                "surface-cloud": "#FFFFFF", primary: "#607AFB",
                "background-light": "#f5f6f8", "background-dark": "#0f1323",
                "primary-dark": "#0284c7", accent: "#fbbf24", "accent-dark": "#d97706",
                "surface-light": "#ffffff", "surface-dark": "#075985",
                "text-main-light": "#0c4a6e", "text-main-dark": "#f0f9ff",
                "text-muted-light": "#64748b", "text-muted-dark": "#bae6fd",
                "adventure-green": "#4ade80", "adventure-brown": "#8d6e63",
                "island-primary": "#00C49A", "island-primary-dark": "#009E7B",
                "island-secondary": "#FFB347", "island-accent": "#FF6B6B",
                "bg-light": "#FDFCF5", "bg-dark": "#122A26",
                "text-main": "#1A3C34", "text-muted": "#648F83",
                "board-light": "#F0E6D2", "board-dark": "#6AB098",
                "island-bg": "#FFF9F0", "island-text": "#4A3B32",
                leaf: "#8AC926", wood: "#8D6E63", ocean: "#4CC9F0", danger: "#FF595E",
                "primary-hover": "#16a34a", secondary: "#fbbf24", "bg-page": "#fffbeb",
                "bg-card": "#ffffff", "border-main": "#e7e5e4", forest: "#5DB56E",
                "wood-light": "#D7CCC8", "wood-medium": "#A1887F", "wood-dark": "#5D4037", parchment: "#FFF3E0",
                "dark-text": "#0F1C2E"
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
                body: ["Nunito", "Lexend", "Noto Sans", "sans-serif"],
                sans: ["Spline Sans", "Lexend", "sans-serif"]
            },
            borderRadius: { DEFAULT: "0.5rem", lg: "1rem", xl: "1.5rem", full: "9999px" },
            animation: {
                float: "float 6s ease-in-out infinite",
                "bounce-slow": "bounce 3s infinite",
                wiggle: "wiggle 1s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            },
            keyframes: {
                float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-20px)" } },
                wiggle: { "0%, 100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } }
            },
            boxShadow: {
                cartoon: "4px 4px 0px rgba(45, 55, 72, 1)",
                "cartoon-lg": "8px 8px 0px rgba(45, 55, 72, 0.15)",
                "cartoon-hover": "2px 2px 0px rgba(45, 55, 72, 1)",
                comic: "4px 4px 0px 0px rgba(0,0,0,0.15)",
                "comic-hover": "6px 6px 0px 0px rgba(0,0,0,0.15)",
                "comic-primary": "4px 4px 0px 0px #0284c7",
                "comic-accent": "4px 4px 0px 0px #d97706",
                game: "0 4px 0 0 rgba(0,0,0,0.1)",
                "game-hover": "0 2px 0 0 rgba(0,0,0,0.1)",
                "game-active": "0 0 0 0 rgba(0,0,0,0.1), inset 0 2px 0 0 rgba(0,0,0,0.1)",
                card: "0 8px 20px -6px rgba(0, 0, 0, 0.05)",
                board: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
                "btn-primary": "0 4px 0 0 #15803d",
                "btn-white": "0 4px 0 0 #d6d3d1",
                button: "0 4px 0px 0px rgba(0,0,0,0.2)",
                "button-active": "0 0px 0px 0px rgba(0,0,0,0.2)",
                floating: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                btn: "0 4px 0 0 #D68C00", "btn-hover": "0 2px 0 0 #D68C00"
            }
        }
    },
    plugins: [],
}
