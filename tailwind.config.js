/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx, ts, tsx}", "./public/index.html"],
    theme: {
        fontFamily: {
            main: ["Poppins"],
        },
        extend: {
            maxWidth: {
                main: "1280px",
            },
            width: {
                main: "1280px",
            },
            backgroundColor: {
                main: "#ee3131",
            },
            textColor: {
                main: "#ee3131",
                span: "#505050",
            },
            keyframes: {
                showMenu: {
                    "0%": { opacity: "0", transform: "translateY(100%)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                showMenu2: {
                    "0%": { opacity: "0", transform: "translateY(-40%)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                leftSlider: {
                    "0%": { transform: "translateX(0)", opacity: "1" },
                    "100%": { transform: "translateX(-100%)", opacity: "0" },
                },
                rightSlider: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                topSlider: {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                showText: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideLeftToRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                rotation: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                
            },
            animation: {
                showMenu: "showMenu 0.5s ease-in-out",
                leftSlider: "leftSlider 0.5s ease-in-out",
                rightSlider: "rightSlider 0.5s ease-in-out",
                topSlider: "topSlider 0.5s ease-in-out",
                showText: "showText 0.5s ease-in-out",
                slideLeftToRight: "slideLeftToRight 0.5s ease-in-out",
                showMenu2: "showMenu2 0.5s ease-in-out",
                rotation: "rotation 1s linear infinite",
            },
        },
    },
    plugins: [],
};
