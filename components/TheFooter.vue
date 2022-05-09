<template>
  <footer
    class="hidden lg:(flex flex-row flex-wrap items-center space-x-24 px-6 h-10 bg-blue-gray-100 text-gray-700 text-sm)"
  >
    <div class="flex items-center space-x-2">
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>

      <a
        href="tel:+380300300300"
        class="font-medium tracking-widest"
      >
        +380 300 300 300
      </a>
    </div>

    <h2 class="font-medium tracking-widest">{{ $t('workingTime') }}</h2>

    <div class="!ml-auto tracking-widest cursor-pointer select-none inline-flex w-max px-3">
      <span
        class="lang"
        :class="{ 'font-medium': $i18n.locale === 'uk' }"
        @click="$i18n.setLocale('uk')"
      >
        мова
      </span>

      <span class="mx-2">|</span>

      <span
        class="lang"
        :class="{ 'font-medium': $i18n.locale === 'ru' }"
        @click="$i18n.setLocale('ru')"
      >
        язык
      </span>
    </div>
  </footer>
</template>
