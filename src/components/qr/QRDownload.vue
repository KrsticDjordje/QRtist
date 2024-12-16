<script setup lang="ts">
import { ref } from 'vue'
import { generateQRCode, downloadQRCode } from '@/services/qrCode'
import html2canvas from 'html2canvas'

const props = defineProps<{
  url: string
  color: string
  backgroundColor: string
  logo?: string
  caption?: string
  styleClass?: string
  patternClass?: string
}>()

const isGenerating = ref(false)
const error = ref<string | null>(null)

const handleDownload = async () => {
  if (!props.url) {
    error.value = 'Please enter a URL first'
    return
  }

  try {
    isGenerating.value = true
    error.value = null

    // Прво генеришемо QR код
    const config = {
      url: props.url,
      color: props.color,
      backgroundColor: props.backgroundColor,
      logo: props.logo,
      width: 1024 // High resolution for download
    }

    const qrCode = await generateQRCode(config)

    // Креирамо привремени контејнер
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'
    container.style.zIndex = '-1000'
    container.style.padding = '32px'
    container.style.backgroundColor = props.backgroundColor

    // Додајемо стилове за QR код
    const qrContainer = document.createElement('div')
    if (props.styleClass) {
      qrContainer.className = props.styleClass
    }
    if (props.patternClass) {
      qrContainer.className += ' ' + props.patternClass
    }

    // Креирамо структуру
    const content = document.createElement('div')
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    content.style.alignItems = 'center'
    content.style.gap = '16px'

    // Додајемо QR код
    const img = document.createElement('img')
    img.src = qrCode
    img.style.maxWidth = '100%'
    content.appendChild(img)

    // Додајемо текст ако постоји
    if (props.caption) {
      const caption = document.createElement('p')
      caption.style.textAlign = 'center'
      caption.style.fontWeight = '500'
      caption.style.marginTop = '12px'
      caption.textContent = props.caption
      content.appendChild(caption)
    }

    qrContainer.appendChild(content)
    container.appendChild(qrContainer)
    document.body.appendChild(container)

    try {
      // Чекамо да се слике учитају
      await new Promise(resolve => setTimeout(resolve, 100))

      const canvas = await html2canvas(container, {
        backgroundColor: props.backgroundColor,
        scale: 2, // Повећавамо резолуцију
        logging: false,
        useCORS: true
      })

      const dataUrl = canvas.toDataURL('image/png')
      downloadQRCode(dataUrl, 'qrcode')
    } finally {
      // Чистимо DOM
      document.body.removeChild(container)
    }
  } catch (err) {
    console.error('Error generating QR code:', err)
    error.value = 'Failed to generate QR code'
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <button class="btn btn-primary w-full flex items-center justify-center gap-2" @click="handleDownload"
      :disabled="isGenerating">
      <span v-if="isGenerating">Generating...</span>
      <span v-else>
        <span class="mr-2">⬇️</span>
        Download QR Code
      </span>
    </button>

    <p v-if="error" class="text-red-500 text-sm text-center">
      {{ error }}
    </p>
  </div>
</template>