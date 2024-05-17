import React from 'react';

const ArrowIcon = ({ className }: { className: string }) => {
    return (
        <svg
            className={className}
            width='78'
            height='55'
            viewBox='0 0 78 55'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g filter='url(#filter0_d_7_18)'>
                <path
                    d='M32.5 38.9583L48.75 27.5L32.5 16.0417'
                    stroke='#333333'
                    stroke-width='8'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />
            </g>
            <defs>
                <filter
                    id='filter0_d_7_18'
                    x='-4'
                    y='0'
                    width='86'
                    height='63'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='2' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0.720833 0 0 0 0 0.64875 0 0 0 0 0.64875 0 0 0 0.25 0'
                    />
                    <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_7_18' />
                    <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_7_18' result='shape' />
                </filter>
            </defs>
        </svg>
    );
};

export default ArrowIcon;
