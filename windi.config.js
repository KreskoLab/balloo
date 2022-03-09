import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: false,
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
        }
      },
      animation: {
        border: 'border 0.4s ease-in forwards',
      },
    }
  },
  shortcuts: {
    "page": "px-4 pt-6 lg:(pt-6 px-6)"
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('@windicss/plugin-scrollbar'),
    require('@windicss/animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 0,
      },
    })
  ]
})