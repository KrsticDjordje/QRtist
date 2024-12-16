export interface QRCodeConfig {
  url: string
  color: string
  backgroundColor: string
  logo?: string
  logoSize?: number
}

export interface DestinationField {
  id: string
  label: string
  type: string
  placeholder: string
  required?: boolean
}

export interface Destination {
  id: string
  name: string
  icon: string
  fields: DestinationField[]
}