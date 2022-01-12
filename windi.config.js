import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  shortcuts: {
    'btn': 'px-4 py-1 rounded-none border-gray-800 border-4 transition duration-150 hover:(border-orange-400) focus:(outline-none border-orange-400 ring-0) active:(border-green-400)',
    'form': 'w-full border-2 border-gray-500 p-5'
  },
  plugins: [
    require('windicss/plugin/forms'),
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