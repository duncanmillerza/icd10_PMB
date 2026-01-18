import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Hadeda Health ICD-10 Look-up',
        short_name: 'ICD-10',
        description: 'ICD-10 Code Look-up and Helper Tool',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2D6356',
        icons: [
            {
                src: '/Mobile Icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
