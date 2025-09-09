/// <reference types="vite/client" />
declare module 'virtual:pwa-register' {
    export function registerSW(options?: { immediate?: boolean }): (() => void) | undefined
}

declare global {
    interface Window {
        puter?: any
    }
    const puter: any
}
