import { defineConfig } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	tree: {
		groups: [
			{
				id: 'getting-started',
				title: '' // No toggle
			},
			{
				title: 'Components',
				include: () => true
			}
		]
	},
	vite: {
		resolve: {
			alias: {
				$lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
				$app: fileURLToPath(new URL('./histoire/app', import.meta.url)) // location of mocked $app modules
			}
		}
	},
	plugins: [HstSvelte()]
});
