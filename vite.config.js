import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 호스트를 localhost로 설정
    port: 5173, // 포트 설정
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // "/api" 제거
      },
    },
  },
  optimizeDeps: {
    include: ["jwt-decode"], // jwt-decode 모듈을 번들링
  },
});
