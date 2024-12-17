<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const amount = ref('5')
const customAmount = ref(false)
const selectedMethod = ref('')

const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'paypal', name: 'PayPal', icon: '🌐' }
]

const paymentDetails = {
    bank: {
        recipient: 'Đorđe Krstić',
        bank: 'Raiffeisen Banka',
        accountNumber: '265-0000007149733-30',
        swift: 'RZBSRSBG',
        purpose: 'Donation for QRtist'
    },
    paypal: {
        email: 'djordje.krstic97@gmail.com',
        link: `https://paypal.me/djordje.krstic97`
    }
}

const predefinedAmounts = ['5', '10', '25', '50']

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="emit('close')">
        <!-- Замућена позадина -->
        <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"></div>

        <!-- Модал -->
        <div class="flex min-h-full items-center justify-center p-4">
            <div class="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" @click.stop>
                <!-- Заглавље -->
                <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold font-display mb-2">Support QRtist</h3>
                    <p class="text-gray-600">Your support helps us keep QRtist free and accessible for everyone</p>
                </div>

                <!-- Износи -->
                <!-- <div class="space-y-6 mb-8">
                    <div class="grid grid-cols-4 gap-4">
                        <button v-for="value in predefinedAmounts" :key="value"
                            @click="amount = value; customAmount = false" :class="[
                                'py-3 px-4 rounded-xl border text-lg font-medium transition-all duration-200',
                                amount === value && !customAmount
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-gray-300'
                            ]">
                            ${{ value }}
                        </button>
                    </div>

                    <div class="relative">
                        <input type="number" v-model="amount" @focus="customAmount = true"
                            class="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none text-lg"
                            placeholder="Custom amount" min="1" step="1" />
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></span>
                    </div>
                </div> -->

                <!-- Методе плаћања -->
                <div class="space-y-4 mb-8">
                    <h4 class="font-medium text-gray-900">Payment Method</h4>
                    <div class="grid gap-4">
                        <button v-for="method in paymentMethods" :key="method.id" :class="[
                            'flex items-center gap-4 p-4 border rounded-xl transition-all duration-200',
                            selectedMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                        ]" @click="selectedMethod = method.id">
                            <span class="text-2xl">{{ method.icon }}</span>
                            <span class="font-medium">{{ method.name }}</span>
                        </button>
                    </div>
                </div>

                <!-- Подаци о плаћању -->
                <div v-if="selectedMethod" class="mb-8">
                    <div class="bg-blue-50/50 rounded-xl p-4 space-y-4">
                        <!-- Bank Transfer -->
                        <template v-if="selectedMethod === 'bank'">
                            <div v-for="(value, key) in paymentDetails.bank" :key="key"
                                class="flex justify-between items-center gap-4">
                                <div>
                                    <div class="text-sm text-gray-500 capitalize">{{ key }}</div>
                                    <div class="font-medium">{{ value }}</div>
                                </div>
                                <button class="p-2 hover:bg-white rounded-lg transition-colors"
                                    @click="copyToClipboard(value)" title="Copy to clipboard">
                                    📋
                                </button>
                            </div>
                        </template>

                        <!-- PayPal -->
                        <template v-else-if="selectedMethod === 'paypal'">
                            <div class="text-center space-y-6">
                                <div>
                                    <div class="text-sm text-gray-500 mb-1">PayPal Email</div>
                                    <div class="font-medium flex items-center justify-center gap-2">
                                        {{ paymentDetails.paypal.email }}
                                        <button class="p-2 hover:bg-white rounded-lg transition-colors"
                                            @click="copyToClipboard(paymentDetails.paypal.email)">
                                            📋
                                        </button>
                                    </div>
                                </div>
                                <a :href="`https://www.paypal.com/paypalme/${paymentDetails.paypal.email}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="btn btn-primary inline-flex items-center gap-2">
                                    <span>Open PayPal</span>
                                    <span>↗</span>
                                </a>
                                <div class="text-sm text-gray-500">
                                    You will be redirected to PayPal to complete your donation
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Мотивациона порука -->
                <div v-else class="bg-blue-50/50 rounded-xl p-4 mb-8">
                    <div class="flex gap-4">
                        <span class="text-2xl">💡</span>
                        <div>
                            <h4 class="font-medium text-gray-900 mb-1">What's Next?</h4>
                            <p class="text-gray-600 text-sm">
                                We're working on exciting new features like AI-powered QR code analytics, advanced
                                customization options,
                                and integration with popular platforms. Your support helps make it happen!
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Дугмад -->
                <div class="flex gap-4">
                    <button class="btn btn-outline flex-1" @click="emit('close')">Cancel</button>
                    <button class="btn btn-primary flex-1" :disabled="!selectedMethod">
                        {{ selectedMethod === 'bank' ? 'Got it' : 'Support Now' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>