import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://mukjaview.kro.kr/api', // 사용할 요청 도메인을 설정한다.
        changeOrigin: true, // HTTP 요청 헤더의 Host 값을 서버의 호스트와 일치하도록 변경한다. 이를 통해 클라이언트의 요청을 target에 설정된 도메인에서 온 것 처럼 변경할 수 있다.
      },
    },
  },
})
