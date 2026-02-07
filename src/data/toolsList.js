export const TOOLS = [
    // CATEGORY: DEV KIT
    {
        id: 'json-fmt',
        title: 'JSON Formatter/Validator',
        cat: 'dev',
        path: '/tools/dev/json-formatter',
        desc: 'Format and validate JSON code for better readability.',
        icon: 'FileJson',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
    },
    {
        id: 'base64-enc',
        title: 'Base64 Encoder/Decoder',
        cat: 'dev',
        path: '/tools/dev/base64-encoder',
        desc: 'Encode or decode strings to/from Base64 format.',
        icon: 'Binary',
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50'
    },
    {
        id: 'regex-tester',
        title: 'Regex Tester',
        cat: 'dev',
        path: '/tools/dev/regex-tester',
        desc: 'Test and debug your regular expressions in real-time.',
        icon: 'SearchCode',
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50'
    },
    {
        id: 'html-enc',
        title: 'HTML Entity Encoder',
        cat: 'dev',
        path: '/tools/dev/html-encoder',
        desc: 'Convert characters to HTML entities and vice-versa.',
        icon: 'Code2',
        color: 'text-teal-500',
        bgColor: 'bg-teal-50'
    },
    {
        id: 'url-enc',
        title: 'URL Encoder/Decoder',
        cat: 'dev',
        path: '/tools/dev/url-encoder',
        desc: 'Properly encode or decode URLs for web compatibility.',
        icon: 'Globe',
        color: 'text-sky-500',
        bgColor: 'bg-sky-50'
    },
    {
        id: 'jwt-debug',
        title: 'JWT Debugger',
        cat: 'dev',
        path: '/tools/dev/jwt-debugger',
        desc: 'Decode and inspect JSON Web Tokens safely.',
        icon: 'ShieldCheck',
        color: 'text-violet-500',
        bgColor: 'bg-violet-50'
    },
    {
        id: 'sql-fmt',
        title: 'SQL Formatter',
        cat: 'dev',
        path: '/tools/dev/sql-formatter',
        desc: 'Beautify and format your SQL queries instantly.',
        icon: 'Database',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50'
    },
    {
        id: 'uuid-gen',
        title: 'UUID/ULID Generator',
        cat: 'dev',
        path: '/tools/dev/uuid-generator',
        desc: 'Generate unique identifiers for your applications.',
        icon: 'Fingerprint',
        color: 'text-fuchsia-500',
        bgColor: 'bg-fuchsia-50'
    },
    {
        id: 'hash-gen',
        title: 'MD5/SHA256 Hasher',
        cat: 'dev',
        path: '/tools/dev/hash-generator',
        desc: 'Generate secure cryptographic hashes for your data.',
        icon: 'Hash',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
    },
    {
        id: 'cron-guru',
        title: 'Crontab Guru',
        cat: 'dev',
        path: '/tools/dev/cron-editor',
        desc: 'Visualize and edit cron schedule expressions easily.',
        icon: 'Clock',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50'
    },
    {
        id: 'diff-checker',
        title: 'Diff Checker',
        cat: 'dev',
        path: '/tools/dev/diff-checker',
        desc: 'Compare and find differences between two text sets.',
        icon: 'Combine',
        color: 'text-rose-500',
        bgColor: 'bg-rose-50'
    },
    {
        id: 'js-minifier',
        title: 'Javascript Minifier',
        cat: 'dev',
        path: '/tools/dev/js-minifier',
        desc: 'Compress and optimize your Javascript code.',
        icon: 'Minimize2',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
    },

    // CATEGORY: MARKETING & SEO
    {
        id: 'utm-builder',
        title: 'UTM Link Builder',
        cat: 'marketing',
        path: '/tools/marketing/utm-builder',
        desc: 'Easily generate UTM tracking links for your campaigns.',
        icon: 'Link',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
    },
    {
        id: 'serp-preview',
        title: 'Google SERP Preview',
        cat: 'marketing',
        path: '/tools/marketing/serp-preview',
        desc: 'Visualize how your website appears on Google search results.',
        icon: 'Search',
        color: 'text-red-500',
        bgColor: 'bg-red-50'
    },
    {
        id: 'meta-gen',
        title: 'Meta Tag Generator',
        cat: 'marketing',
        path: '/tools/marketing/meta-generator',
        desc: 'Create SEO-optimized meta tags for your website.',
        icon: 'Tags',
        color: 'text-amber-500',
        bgColor: 'bg-amber-50'
    },
    {
        id: 'robots-gen',
        title: 'Robots.txt Generator',
        cat: 'marketing',
        path: '/tools/marketing/robots-generator',
        desc: 'Create properly formatted robots.txt files for SEO.',
        icon: 'Bot',
        color: 'text-slate-600',
        bgColor: 'bg-slate-100'
    },
    {
        id: 'og-preview',
        title: 'Open Graph Preview',
        cat: 'marketing',
        path: '/tools/marketing/og-preview',
        desc: 'Preview how your links will look on social media.',
        icon: 'Share2',
        color: 'text-pink-500',
        bgColor: 'bg-pink-50'
    },
    {
        id: 'slug-gen',
        title: 'Slug Generator',
        cat: 'marketing',
        path: '/tools/marketing/slug-generator',
        desc: 'Convert any text into a URL-friendly slug.',
        icon: 'Zap',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50'
    },

    // CATEGORY: BUSINESS & FINANCE
    {
        id: 'invoice-gen',
        title: 'Invoice Generator',
        cat: 'biz',
        path: '/tools/biz/invoice-generator',
        desc: 'Create simple, professional PDF invoices in seconds.',
        icon: 'Receipt',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
    },
    {
        id: 'tax-calc',
        title: 'Tax Calculator',
        cat: 'biz',
        path: '/tools/biz/tax-calculator',
        desc: 'Quickly calculate PPN, PPh, and other business taxes.',
        icon: 'Calculator',
        color: 'text-lime-600',
        bgColor: 'bg-lime-50'
    },
    {
        id: 'profit-calc',
        title: 'Profit Margin Calculator',
        cat: 'biz',
        path: '/tools/biz/profit-margin',
        desc: 'Calculate your margins and markup accurately.',
        icon: 'TrendingUp',
        color: 'text-teal-600',
        bgColor: 'bg-teal-50'
    },
    {
        id: 'currency-conv',
        title: 'Currency Converter',
        cat: 'biz',
        path: '/tools/biz/currency-converter',
        desc: 'Real-time exchange rates for global business.',
        icon: 'Coins',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
    },

    // CATEGORY: DESIGN & VISUAL
    {
        id: 'palette-gen',
        title: 'Color Palette Generator',
        cat: 'design',
        path: '/tools/design/palette-generator',
        desc: 'Create beautiful, harmonious color schemes.',
        icon: 'Palette',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
    },
    {
        id: 'contrast-check',
        title: 'Contrast Checker',
        cat: 'design',
        path: '/tools/design/contrast-checker',
        desc: 'Check WCAG accessibility contrast ratios.',
        icon: 'Eye',
        color: 'text-rose-500',
        bgColor: 'bg-rose-50'
    },
    {
        id: 'gradient-maker',
        title: 'CSS Gradient Maker',
        cat: 'design',
        path: '/tools/design/gradient-maker',
        desc: 'Design and generate CSS linear and radial gradients.',
        icon: 'Layers',
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-50'
    },
    {
        id: 'shadow-maker',
        title: 'CSS Shadow Maker',
        cat: 'design',
        path: '/tools/design/shadow-maker',
        desc: 'Visual editor for complex CSS box-shadows.',
        icon: 'Box',
        color: 'text-slate-500',
        bgColor: 'bg-slate-100'
    }
];
