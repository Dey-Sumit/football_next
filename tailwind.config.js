module.exports = {
   purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         colors: {
            green: {
               DEFAULT: '#05D66E',
            },
            dark: {
               DEFAULT: '#1e2120',
            },
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
