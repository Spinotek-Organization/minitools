import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function ToolPageLayout({ children }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 md:pt-8 md:pb-12">
            <Breadcrumbs />
            {children}
        </div>
    );
}
