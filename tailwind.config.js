/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  utilities: {
    '.input': {
      width: '100%',
      padding: '0.5rem',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderColor: '#CBD5E0',
      fontWeight: '500',
      outline: 'none',
    },
    '.button': {
      width: '100%',
      height: '2.25rem',
      backgroundColor: '#64748B',
      borderRadius: '2px',
      cursor: 'pointer',
    },
    '.link-button': {
      width: '100%',
      height: '2.25rem',
      backgroundColor: '#64748B',
      borderRadius: '2px',
      cursor: 'pointer',
      display: 'block',
      textAlign: 'center',
      lineHeight: '2.25rem',
    },
  },
};
