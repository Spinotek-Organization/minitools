import React from 'react';

export default function Logo({ size = 40, className = '' }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
        >
            <rect x="4" y="4" width="14" height="14" rx="3" fill="#2563EB" />
            <rect x="22" y="4" width="14" height="14" rx="3" fill="#3B82F6" />
            <rect x="4" y="22" width="14" height="14" rx="3" fill="#60A5FA" />
            <rect x="22" y="22" width="14" height="14" rx="3" fill="#93C5FD" />
        </svg>
    );
}
