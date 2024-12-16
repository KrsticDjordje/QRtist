import type { Destination } from '@/types/qr'

export const destinations: Destination[] = [
  {
    id: 'website',
    name: 'Website',
    icon: '🌐',
    fields: [
      {
        id: 'url',
        label: 'Website URL',
        type: 'url',
        placeholder: 'https://example.com',
        required: true
      }
    ]
  },
  {
    id: 'google',
    name: 'Google Doc',
    icon: '📄',
    fields: [
      {
        id: 'docId',
        label: 'Document ID',
        type: 'text',
        placeholder: 'Enter Google Doc ID',
        required: true
      },
      {
        id: 'docName',
        label: 'Document Name',
        type: 'text',
        placeholder: 'Enter document name'
      }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    fields: [
      {
        id: 'videoId',
        label: 'Video ID',
        type: 'text',
        placeholder: 'Enter YouTube video ID',
        required: true
      },
      {
        id: 'startTime',
        label: 'Start Time (seconds)',
        type: 'number',
        placeholder: '0'
      }
    ]
  },
  // ... other destinations remain the same
]

export const patterns = [
  { id: 'squares', name: 'Squares' },
  { id: 'dots', name: 'Dots', class: 'qr-pattern-dots' },
  { id: 'rounded', name: 'Rounded', class: 'qr-pattern-rounded' }
]

export const styles = [
  { id: 'none', name: 'None' },
  { id: 'border', name: 'Border', class: 'qr-style-border' },
  { id: 'shadow', name: 'Shadow', class: 'qr-style-shadow' },
  { id: 'dashed', name: 'Dashed', class: 'qr-style-dashed' }
]

export const colors = [
  '#000000', '#666666', '#FF0000', '#FF69B4', '#FFC0CB',
  '#800080', '#0000FF', '#1E90FF', '#00CED1', '#008000',
  '#FFA500', '#8B4513'
]

export const backgroundColors = [
  '#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF',
  '#FEE2E2', '#DBEAFE', '#ECFDF5', '#FEF3C7', '#F3E8FF'
]