import React from 'react';

/**
 * Standard Card component for Spinotek Tools
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.dark] - Dark variant (for outputs)
 * @param {boolean} [props.glass] - Glassmorphism effect
 * @param {boolean} [props.hover] - Hover scaling effect
 * @param {boolean} [props.noPadding] - Remove default padding
 */
export default function Card({
    children,
    className = '',
    dark = false,
    glass = false,
    hover = false,
    noPadding = false
}) {
    const baseStyles = "group rounded-[2rem] border transition-all duration-300 overflow-hidden";

    const variants = {
        light: "bg-white border-slate-100 shadow-sm",
        dark: "bg-slate-900 border-slate-800 shadow-2xl shadow-slate-900/20",
        glass: "bg-white/70 backdrop-blur-md border-white/20 shadow-xl",
    };

    const hoverStyles = hover ? "hover:border-blue-200 hover:bg-blue-50/30 transform hover:-translate-y-1" : "";

    const currentVariant = dark ? variants.dark : (glass ? variants.glass : variants.light);
    const padding = noPadding ? "" : "p-6 md:p-8";

    return (
        <div className={`${baseStyles} ${currentVariant} ${hoverStyles} ${className}`}>
            <div className={padding}>
                {children}
            </div>
        </div>
    );
}

/**
 * Card Header sub-component
 */
export function CardHeader({ title, subtitle, icon: Icon, extra }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Icon size={20} />
                    </div>
                )}
                <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">{title}</h3>
                    {subtitle && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{subtitle}</p>}
                </div>
            </div>
            {extra}
        </div>
    );
}
