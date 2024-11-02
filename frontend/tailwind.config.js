/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            boxShadow: {
                Default: "0 0 10px rgba(0, 0, 0, 0.2) ",
                highlight: "0 0 10px theme('colors.cyan.300')",
            },
        },
    },
    plugins: [],
}
