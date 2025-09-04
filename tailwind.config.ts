import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"index.html",
		"./src/**/*.{ts,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// GitHub-specific colors
				github: {
					canvas: {
						default: 'hsl(var(--github-canvas-default))',
						subtle: 'hsl(var(--github-canvas-subtle))'
					},
					border: {
						default: 'hsl(var(--github-border-default))',
						muted: 'hsl(var(--github-border-muted))'
					},
					accent: 'hsl(var(--github-accent-emphasis))',
					success: 'hsl(var(--github-success-emphasis))',
					attention: 'hsl(var(--github-attention-emphasis))',
					severe: 'hsl(var(--github-severe-emphasis))'
				},
				file: {
					directory: 'hsl(var(--file-directory))',
					text: 'hsl(var(--file-text))',
					code: 'hsl(var(--file-code))',
					markdown: 'hsl(var(--file-markdown))'
				},
				syntax: {
					bg: 'hsl(var(--syntax-bg))',
					border: 'hsl(var(--syntax-border))'
				}
			},
			fontFamily: {
				mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'monospace'],
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
