import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			// includeAssets: ['mafia.svg', 'audio/end.ogg', 'audio/mafia1.mp3'],
			manifest: {
				name: 'MNR box',
				short_name: 'MNRbox',
				description: 'useful utility',
				theme_color: '#65a30d',
				start_url: "https://box.mnrtech.ir",
				scope: "https://box.mnrtech.ir",
				display: "fullscreen",
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
	}
})
