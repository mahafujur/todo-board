import React from 'react';

const SvgAvatar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    const size = 100;
    const radius = size / 2;

    return (
        <svg
            {...props}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" stroke="none">
                <circle cx="32" cy="32" r="32" fill="#87CEEB"/>
                <circle cx="32" cy="24" r="14" fill="#FFE0BD"/>
                <path d="M18,42 C18,35 46,35 46,42" fill="#FFE0BD"/>
                <path d="M24,23 Q32,5 40,23" stroke="#000" strokeWidth="2" fill="none"/>
                <circle cx="26" cy="26" r="2" fill="#000"/>
                <circle cx="38" cy="26" r="2" fill="#000"/>
                <path d="M26,30 Q32,36 38,30" stroke="#000" strokeWidth="2" fill="none"/>
            </g>
        </svg>
    );
}

export default SvgAvatar;
