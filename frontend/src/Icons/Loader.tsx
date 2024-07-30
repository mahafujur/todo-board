import React from 'react';

const SvgLoader = ({...props}) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.293L8.414 9.88zM20 12h-4v3.291l3.586 1.414L20 12zm-7.586 1.414L12 16.708v3.292a8 8 0 004.472-3.121l-3.586-1.414zM4 20v-3.291L7.586 18.7 4 20z"
            ></path>
        </svg>
    );
};

export default SvgLoader;
