import { Metadata, Route } from 'next';

export default function manifest(): Metadata {
    return {
        manifest: {
            name: 'Hadeda Health ICD-10 Look-up',
            short_name: 'ICD-10',
            description: 'ICD-10 Code Look-up and Helper Tool',
            start_url: '/' as Route,
            display: 'standalone',
            background_color: '#ffffff',
            theme_color: '#2D6356',
            icons: [
                {
                    src: '/favicon.ico',
                    sizes: 'any',
                    type: 'image/x-icon',
                },
            ],
        }
    }
}
