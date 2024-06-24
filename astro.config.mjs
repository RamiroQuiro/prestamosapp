import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  server:{
    port:4321,
    host:true,
  },
  integrations: [react(), tailwind(), db()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});