<script setup lang="ts">
import { ref, computed } from 'vue'
import QRCodeVue from 'qrcode.vue'
import DestinationButton from './qr/DestinationButton.vue'
import ColorPicker from './qr/ColorPicker.vue'
import QRDownload from './qr/QRDownload.vue'
import LogoUploader from './qr/LogoUploader.vue'
import DynamicFields from './qr/DynamicFields.vue'
import QRCaption from './qr/QRCaption.vue'
import { destinations, patterns, styles, colors, backgroundColors } from '@/constants/qr'
import { buildDestinationUrl } from '@/services/qrCode'
import FullscreenButton from './qr/FullscreenButton.vue'

const selectedDestination = ref('website')
const selectedPattern = ref('squares')
const selectedColor = ref('#000000')
const selectedBgColor = ref('#FFFFFF')
const logoDataUrl = ref('')
const fields = ref<Record<string, string>>({
  url: '',
  docId: '',
  videoId: '',
  startTime: ''
})
const selectedStyle = ref('none')
const caption = ref('')
const isFullscreen = ref(false)

const currentDestination = computed(() =>
  destinations.find(d => d.id === selectedDestination.value)
)

const destinationUrl = computed(() => {
  console.log('Current fields:', fields.value)
  return buildDestinationUrl(selectedDestination.value, fields.value)
})

const handleDestinationChange = (destId: string) => {
  selectedDestination.value = destId
  fields.value = {}
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 pb-20">
    <!-- Fullscreen container -->
    <div :class="[
      'transition-all duration-500 ease-in-out transform',
      isFullscreen ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : 'relative'
    ]">
      <!-- Card -->
      <div :class="[
        'card relative transition-all duration-500',
        isFullscreen ? 'min-h-full rounded-none' : 'p-4 sm:p-8'
      ]">
        <!-- Fullscreen button -->
        <FullscreenButton :is-fullscreen="isFullscreen" @toggle="toggleFullscreen" />

        <!-- Close button for fullscreen -->
        <div v-if="isFullscreen"
          class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-100">
          <h2 class="text-xl font-bold">QR Code Generator</h2>
          <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            @click="toggleFullscreen">
            <span class="sr-only">Close fullscreen</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div :class="[
          'grid gap-8 transition-all duration-500',
          isFullscreen ? 'container mx-auto px-4 py-8 grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-3 gap-12'
        ]">
          <!-- Лева колона -->
          <div class="space-y-8">
            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-lg font-semibold font-display">Destination</h3>
                <p class="text-sm text-gray-500">Choose where your QR code will lead to</p>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                <DestinationButton v-for="dest in destinations" :key="dest.id" v-bind="dest"
                  :is-selected="selectedDestination === dest.id" @select="handleDestinationChange(dest.id)" />
              </div>
            </div>

            <LogoUploader v-model="logoDataUrl" />
          </div>

          <!-- Средња колона -->
          <div class="space-y-6">
            <DynamicFields v-if="currentDestination" v-model="fields" :fields="currentDestination.fields" />

            <div class="space-y-4">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-700">Live Preview</h4>
                <div class="border border-gray-100 rounded-xl p-4 sm:p-8 flex flex-col items-center gap-6"
                  :style="{ backgroundColor: selectedBgColor }">
                  <div :class="[
                    'transition-all duration-300',
                    patterns.find(p => p.id === selectedPattern)?.class,
                    styles.find(s => s.id === selectedStyle)?.class
                  ]">
                    <QRCodeVue :value="destinationUrl" :size="200" :color="selectedColor" :background="selectedBgColor"
                      class="transition-all duration-300" />
                  </div>

                  <p v-if="caption" class="text-center font-medium mt-2">{{ caption }}</p>

                  <QRDownload :url="destinationUrl" :color="selectedColor" :background-color="selectedBgColor"
                    :logo="logoDataUrl" :caption="caption"
                    :style-class="styles.find(s => s.id === selectedStyle)?.class"
                    :pattern-class="patterns.find(p => p.id === selectedPattern)?.class" />
                </div>
              </div>
            </div>
          </div>

          <!-- Десна колона -->
          <div class="space-y-8">
            <!-- Pattern секција -->
            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-lg font-semibold font-display">Pattern</h3>
                <p class="text-sm text-gray-500">Select a style for your QR code</p>
              </div>
              <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4">
                <button v-for="pattern in patterns" :key="pattern.id" :class="[
                  'p-4 rounded-xl border transition-all duration-200',
                  selectedPattern === pattern.id
                    ? 'border-primary bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                ]" @click="selectedPattern = pattern.id">
                  <div class="w-full aspect-square bg-gray-100 rounded-lg mb-2"></div>
                  <div class="text-sm text-center">{{ pattern.name }}</div>
                </button>
              </div>
            </div>

            <!-- Color Picker секције -->
            <ColorPicker :colors="colors" :selected-color="selectedColor" label="QR Code Color"
              description="Choose a color for your QR code" @select="selectedColor = $event" />

            <ColorPicker :colors="backgroundColors" :selected-color="selectedBgColor" label="Background Color"
              description="Choose a background color" @select="selectedBgColor = $event" />

            <!-- Style секција -->
            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-lg font-semibold font-display">Style</h3>
                <p class="text-sm text-gray-500">Choose a style for your QR code</p>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                <button v-for="style in styles" :key="style.id" :class="[
                  'p-4 rounded-xl border transition-all duration-200',
                  selectedStyle === style.id
                    ? 'border-primary bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                ]" @click="selectedStyle = style.id">
                  <div class="text-sm text-center">{{ style.name }}</div>
                </button>
              </div>
            </div>

            <QRCaption v-model="caption" />
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" @click="toggleFullscreen">
    </div>
  </div>
</template>

<style scoped>
.card {
  transform-origin: center;
}

/* Додајте ове класе ако желите додатне анимације */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>