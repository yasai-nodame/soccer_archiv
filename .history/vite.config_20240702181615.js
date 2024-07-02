import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import env from 'vite-plugin-env-compatible'; //process.envを使えるように npm i vite-plugin-env-compatible でインストール

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env"})], //envの設定で process.envを扱えるようにする。
})
