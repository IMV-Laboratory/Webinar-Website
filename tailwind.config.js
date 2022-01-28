module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Montserrat'],
            nulshock: ['Nulshock'],
        },
        letterSpacing: {
            1: '0em',
            2: '0.1em',
            3: '0.2em',
            4: '0.45em',
        },
    },
    plugins: [],
};
