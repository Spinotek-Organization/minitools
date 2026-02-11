import React from 'react';
import Breadcrumbs from './Breadcrumbs';

import { TOOLS } from '../../data/toolsList';
import ToolPlaceholder from './ToolPlaceholder';

export default function ToolPageLayout({ children, toolId }) {
    const tool = toolId ? TOOLS.find(t => t.id === toolId) : null;

    if (tool && tool.isReady === false) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 md:pt-8 md:pb-12">
                <Breadcrumbs />
                <ToolPlaceholder />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 md:pt-8 md:pb-12">
            <Breadcrumbs />
            {children}
        </div>
    );
}
