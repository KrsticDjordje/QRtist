import QRCode from 'qrcode'
import type { QRCodeConfig } from '@/types/qr'

export const generateQRCode = async (config: QRCodeConfig): Promise<string> => {
  try {
    const opts = {
      color: {
        dark: config.color,
        light: config.backgroundColor
      },
      width: config.width || 400,
      margin: 1,
      errorCorrectionLevel: 'H'
    }

    const qrDataUrl = await QRCode.toDataURL(config.url, opts)

    if (config.logo) {
      return await addLogoToQR(qrDataUrl, config.logo, config.logoSize || 60)
    }

    return qrDataUrl
  } catch (err) {
    console.error('Error generating QR code:', err)
    throw err
  }
}

const addLogoToQR = (qrDataUrl: string, logoDataUrl: string, logoSize: number): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    const qrImage = new Image()

    qrImage.onload = () => {
      canvas.width = qrImage.width
      canvas.height = qrImage.height
      ctx.drawImage(qrImage, 0, 0)

      const logo = new Image()
      logo.onload = () => {
        const logoX = (canvas.width - logoSize) / 2
        const logoY = (canvas.height - logoSize) / 2

        // Add white background for logo
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4)

        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
        resolve(canvas.toDataURL('image/png'))
      }
      logo.src = logoDataUrl
    }
    qrImage.src = qrDataUrl
  })
}

export const downloadQRCode = (dataUrl: string, filename: string = 'qrcode') => {
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const buildDestinationUrl = (destinationType: string, fields: Record<string, string>): string => {
  switch (destinationType) {
    case 'google':
      return fields.docId ? `https://docs.google.com/document/d/${fields.docId}` : ''
    case 'youtube':
      return fields.videoId
        ? `https://youtube.com/watch?v=${fields.videoId}${fields.startTime ? `&t=${fields.startTime}` : ''}`
        : ''
    case 'website':
      return fields.url || ''
    default:
      return fields.url || ''
  }
}