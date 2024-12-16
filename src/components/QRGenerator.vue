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
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 pb-20">
    <div class="card p-4 sm:p-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
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
                  :logo="logoDataUrl" :caption="caption" :style-class="styles.find(s => s.id === selectedStyle)?.class"
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
</template>