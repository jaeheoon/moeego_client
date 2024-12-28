import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "http://110.165.18.247", // 호스트를 localhost로 설정
    port: 80, // 포트 설정

    proxy: {
      "/api": {
        // target: "https://server.moeego.site", // Spring Boot 서버 주소
        target: "http://211.188.56.143:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // "/api" 제거
      },
    },
  },
  optimizeDeps: {
    include: ["jwt-decode"], // jwt-decode 모듈을 번들링
  },
});
