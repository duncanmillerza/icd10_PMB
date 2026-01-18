import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#2D6356',
                }}
            >
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 999 999"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M873 366.183C854.864 291.315 788.969 189.88 639.648 166.937C531.436 -9.367 355.515 147.012 452.846 244.22C502.66 289.256 530.589 314.506 580.404 359.542C698.079 477.069 654.539 617.598 518.136 689.574M452.846 912V716.376C476.438 709.084 498.272 700.056 518.136 689.574M518.136 689.574V912M127 661.431C548.363 -6.34816 873 753.206 127 662.035M518.136 156.068V156.672"
                        stroke="white"
                        strokeWidth="30"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
