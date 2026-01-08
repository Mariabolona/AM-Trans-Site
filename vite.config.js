import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about-amtrans.html'),
        services: path.resolve(__dirname, 'our-services.html'),
        drivers: path.resolve(__dirname, 'driver-application.html'),
        resources: path.resolve(__dirname, 'resources-gallery.html'),
        quote: path.resolve(__dirname, 'rate-quote.html'),
        contact: path.resolve(__dirname, 'contact-us.html'),
      }
    }
  }
})
