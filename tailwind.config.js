module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainColor': 'rgb(228 226 201)',
        'secondColor': '#B0A171'	,
        'secondText' : '#888888',
        'priceText' : '#585858'
      },
      boxShadow: {
        '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
