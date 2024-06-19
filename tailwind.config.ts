import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',

            custom: '1440px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },

                // class for language toggle
                langtoggle: {
                    DEFAULT: 'var(--btn-lang)',
                    foreground: 'var(--btn-lang-foreground)',
                },

                default: {
                    DEFAULT: 'var(--text)', // root: #222222 dark: #ffffff
                    foreground: 'var(--text-foreground)', // root:  #ffffff dark:#222222
                },
                reverse: {
                    DEFAULT: 'var(--text-reverse)', // root:  #ffffff dark:#222222
                    foreground: 'var(--text-reverse-forground)', // root: #222222 dark: #ffffff
                },
                //
                content: {
                    DEFAULT: 'var(--bg-content)', // root: #f3f3f3 dark: #1d2839
                    foreground: 'var(--bg-content-forground)', // root:#1d2839 dark: #f3f3f3
                },
                card: {
                    DEFAULT: 'var(--card)', // root: #d9d9d9 dark: #222222
                    foreground: 'var(--card-foreground)', // root: #222222  dark:#d9d9d9
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        function ({ addUtilities }: { addUtilities: (utilities: object) => void }) {
            const newUtilities = {
                '.hide-scrollbar': {
                    /* Hide scrollbar for IE, Edge and Firefox */
                    '-ms-overflow-style': 'none' /* IE and Edge */,
                    'scrollbar-width': 'none' /* Firefox */,

                    /* Hide scrollbar for Chrome, Safari and Opera */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            };
            addUtilities(newUtilities);
        },
    ],
} satisfies Config;

export default config;
