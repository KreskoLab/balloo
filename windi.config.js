import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    extend: {
      keyframes: {
        border: {
          '0%': { transform: 'scale(0,0)' },
          '100%': { transform: 'scale(1,1)' },
        },
      },
      animation: {
        border: 'border 0.4s ease-in forwards',
      },
    },
  },
  shortcuts: {
    maxcontainer: 'max-w-screen-2xl mx-auto px-4 lg:px-6',
    page: 'py-6',
    lang: 'transition-all duration-200 w-12 decoration-3 decoration-transparent underline underline-offset-3 hover:(decoration-dark-600)',
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/scroll-snap'),
    require('@windicss/animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 0,
      },
    }),
  ],
})
