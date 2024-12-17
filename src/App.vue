<script setup lang="ts">
import Header from './components/Header.vue'
import QRGenerator from './components/QRGenerator.vue'
import Logo from './components/common/Logo.vue'
import DonateModal from './components/common/DonateModal.vue'
import { ref } from 'vue'

const features = [
  {
    icon: '🎯',
    title: 'Dynamic QR Codes',
    description: 'Create QR codes that can be updated anytime without reprinting. Perfect for menus, promotions, and events.'
  },
  {
    icon: '🎨',
    title: 'Custom Design',
    description: 'Personalize your QR codes with custom colors, patterns, and logos to match your brand identity.'
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Track scans, locations, and user behavior to optimize your QR code performance.'
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime ensure your QR codes work when you need them.'
  }
]

const useCases = [
  {
    icon: '🍽️',
    title: 'Restaurants',
    description: 'Digital menus that can be updated instantly',
    examples: ['Menu QR Codes', 'Table Ordering', 'Reviews & Feedback']
  },
  {
    icon: '🏪',
    title: 'Retail',
    description: 'Connect physical products to digital experiences',
    examples: ['Product Information', 'Loyalty Programs', 'Digital Receipts']
  },
  {
    icon: '🎟️',
    title: 'Events',
    description: 'Streamline check-ins and provide updates',
    examples: ['Tickets', 'Schedule Updates', 'Live Polling']
  }
]

const isDonateModalOpen = ref(false)
</script>

<template>
  <Header />

  <!-- Декоративни облици -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <!-- Леви облици -->
    <div
      class="absolute -left-64 top-32 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[128px] opacity-50 lg:opacity-100" />
    <div
      class="absolute -left-32 top-96 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[96px] opacity-50 lg:opacity-100" />

    <!-- Десни облици -->
    <div
      class="absolute -right-64 top-64 w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-[128px] opacity-50 lg:opacity-100" />
    <div
      class="absolute -right-32 top-32 w-[450px] h-[450px] bg-blue-300/20 rounded-full blur-[96px] opacity-50 lg:opacity-100" />
  </div>

  <main class="relative">
    <!-- Hero секција -->
    <section class="pt-32 pb-20">
      <div class="text-center max-w-4xl mx-auto px-4">
        <h1 class="text-4xl sm:text-6xl font-bold mb-6 font-display leading-tight">
          Generate and Publish
          <span class="relative">
            <span class="text-primary">Dynamic</span>
            <span class="absolute bottom-1 left-0 w-full h-3 bg-blue-200/30 -z-10"></span>
          </span>
          QR Codes.
        </h1>
        <p class="text-gray-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          Create, customize, and manage QR codes completely free. Our open platform allows anyone to generate dynamic QR
          codes without limitations. No credit card required.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary">
            Get Started
            <span class="ml-2">→</span>
          </button>
          <button class="btn btn-outline">
            <span class="mr-2">▶</span>
            Watch demo
          </button>
        </div>
      </div>
    </section>

    <!-- QR Generator секција -->
    <section class="py-20">
      <QRGenerator />
    </section>

    <!-- Features секција -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold font-display mb-4">
            Everything you need to create
            <span class="text-primary">powerful</span> QR codes
          </h2>
          <p class="text-gray-600">
            Our platform provides all the tools and features you need to create, manage, and track your QR codes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title"
            class="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-lg">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases секција -->
    <section class="py-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold font-display mb-4">
            Perfect for every
            <span class="text-primary">industry</span>
          </h2>
          <p class="text-gray-600">
            See how different industries are using QR codes to improve their business.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="useCase in useCases" :key="useCase.title"
            class="p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-lg">
            <div class="text-4xl mb-4">{{ useCase.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ useCase.title }}</h3>
            <p class="text-gray-600 mb-4">{{ useCase.description }}</p>
            <ul class="space-y-2">
              <li v-for="example in useCase.examples" :key="example" class="flex items-center text-gray-600">
                <span class="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                {{ example }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works секција -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold font-display mb-4">
            How it
            <span class="text-primary">works</span>
          </h2>
          <p class="text-gray-600">
            Create and manage your QR codes in three simple steps.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">1</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Create</h3>
            <p class="text-gray-600">Choose your QR code type and customize its appearance</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">2</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Deploy</h3>
            <p class="text-gray-600">Download or share your QR code anywhere you need it</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">3</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Track</h3>
            <p class="text-gray-600">Monitor performance and update content anytime</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing секција -->
    <section class="py-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold font-display mb-4">
            Free for
            <span class="text-primary">everyone</span>
          </h2>
          <p class="text-gray-600">
            Our core features are completely free. Support me through donations or unlock additional features with a
            premium account.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Free Plan -->
          <div class="p-8 rounded-2xl bg-white border-2 border-primary shadow-lg relative overflow-hidden">
            <div class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <h3 class="text-2xl font-bold mb-2">Free Forever</h3>
            <p class="text-gray-600 mb-6">Everything you need to create amazing QR codes</p>
            <div class="text-3xl font-bold text-primary mb-6">$0</div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Unlimited QR code generation</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>All basic customization options</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Basic analytics</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Community support</span>
              </li>
            </ul>
            <button class="btn btn-primary w-full">Get Started</button>
          </div>

          <!-- Donation/Premium -->
          <div
            class="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <h3 class="text-2xl font-bold mb-2">Support Me</h3>
            <p class="text-gray-600 mb-6">Help us keep the service free for everyone</p>

            <div class="text-3xl font-bold mb-8">
              <span class="text-primary">♥️</span>
              <span class="text-gray-400 text-base">Pay what you want</span>
            </div>

            <!-- Нови садржај -->
            <div class="space-y-6">
              <div class="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
                <span class="text-2xl">🚀</span>
                <div>
                  <h4 class="font-medium mb-1">Future Development</h4>
                  <p class="text-sm text-gray-600">Your support helps us develop new features and keep improving QRtist
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-green-50/50 rounded-xl">
                <span class="text-2xl">🌍</span>
                <div>
                  <h4 class="font-medium mb-1">Open Source</h4>
                  <p class="text-sm text-gray-600">I believe in making technology accessible to everyone</p>
                </div>
              </div>

              <button class="btn btn-outline w-full hover:bg-primary hover:text-white hover:border-primary"
                @click="isDonateModalOpen = true">
                Support the Project
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-12 text-gray-600">
          <p class="max-w-2xl mx-auto">
            I believe in making QR code technology accessible to everyone. Your donations help us maintain and improve
            the platform while keeping it free for those who need it.
          </p>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Logo и опис -->
        <div class="col-span-1 md:col-span-2">
          <Logo class="[&_span]:text-white" />
          <p class="text-gray-400 mt-4 max-w-md">
            QRtist is an open-source QR code generator that makes dynamic QR codes accessible to everyone.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                </path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">GitHub</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Линкови -->
        <div>
          <h3 class="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Product</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Use Cases</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Support</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Community</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Доњи део футера -->
      <div class="pt-8 border-t border-gray-800">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} QRtist. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Додајте модал на крај template секције: -->
  <DonateModal :is-open="isDonateModalOpen" @close="isDonateModalOpen = false" />
</template>

<style scoped>
.blur-shape {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}
</style>