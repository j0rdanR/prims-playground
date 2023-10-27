import { PackageData, defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as fs from 'node:fs';
import { join } from 'node:path';

const json = fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
const pkg = JSON.parse(json);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    APP_VERSION: JSON.stringify(pkg.version || '0.0.0'),
  }
})
