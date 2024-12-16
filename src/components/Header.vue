<script setup lang="ts">
import { ref } from 'vue'
import Logo from './common/Logo.vue'
import NavLink from './common/NavLink.vue'

const navLinks = [
  { href: '#', text: 'Product' },
  { href: '#', text: 'Pricing' },
  { href: '#', text: 'Enterprise' },
  { href: '#', text: 'Solution' },
  { href: '#', text: 'Help' }
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}
</script>

<template>
  <div>
    <!-- Замућена позадина -->
    <div :class="[
      'fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
      isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]" @click="toggleMenu"></div>

    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="relative bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div class="container mx-auto px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <Logo />

            <!-- Мобилни мени дугме -->
            <button class="lg:hidden relative z-50 w-10 h-10 focus:outline-none" @click="toggleMenu"
              :aria-expanded="isMenuOpen">
              <span class="sr-only">Toggle menu</span>
              <div class="relative w-6 h-5 mx-auto transform transition-all">
                <span :class="[
                  'absolute block h-0.5 w-6 transform transition-all duration-300 rounded-full bg-gray-800',
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-2'
                ]"></span>
                <span :class="[
                  'absolute block h-0.5 w-6 bg-gray-800 rounded-full transition-all duration-300',
                  isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                ]"></span>
                <span :class="[
                  'absolute block h-0.5 w-6 transform transition-all duration-300 rounded-full bg-gray-800',
                  isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-2'
                ]"></span>
              </div>
            </button>

            <!-- Десктоп навигација -->
            <div class="hidden lg:flex items-center gap-8">
              <NavLink v-for="link in navLinks" :key="link.text" :href="link.href" :text="link.text" />
            </div>

            <div class="hidden lg:flex items-center gap-4">
              <button class="btn btn-outline">Sign In</button>
              <button class="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Мобилни мени -->
      <div :class="[
        'fixed inset-0 bg-white transition-transform duration-500 ease-in-out lg:hidden',
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      ]">
        <!-- X дугме за затварање -->
        <button
          class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center focus:outline-none transform transition-transform hover:rotate-90"
          @click="toggleMenu">
          <span class="sr-only">Close menu</span>
          <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="container mx-auto px-4 h-screen pt-24">
          <div class="flex flex-col items-center justify-start h-full">
            <TransitionGroup enter-active-class="transition duration-300" enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200"
              leave-from-class="opacity-100" leave-to-class="opacity-0 -translate-y-4">
              <div v-if="isMenuOpen" v-for="(link, index) in navLinks" :key="link.text"
                :style="{ transitionDelay: `${index * 100}ms` }" class="w-full py-4 text-center">
                <NavLink :href="link.href" :text="link.text" class="text-2xl font-medium hover:text-primary" />
              </div>

              <div v-if="isMenuOpen" key="buttons" class="flex gap-4 w-full max-w-xs mx-auto mt-8"
                :style="{ transitionDelay: `${navLinks.length * 100}ms` }">
                <button class="btn btn-outline flex-1">Sign In</button>
                <button class="btn btn-primary flex-1">Sign Up</button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.nav-link {
  @apply relative overflow-hidden;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 origin-right;
}

.nav-link:hover::after {
  @apply scale-x-100 origin-left;
}

/* Додатне анимације за мобилни мени */
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>