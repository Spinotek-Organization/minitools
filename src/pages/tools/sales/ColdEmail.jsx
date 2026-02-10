import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Search, Copy, Check, Filter, X } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const TEMPLATES = [
    {
        id: 1,
        title: 'The "Quick Question" Intro',
        category: 'Intro',
        subject: 'Quick question about [Company]',
        body: `Hi [First Name],

I was looking at [Company] and was impressed by [Achievement/Observation].

I'm writing because we help companies like yours [Benefit/Result] by [Method].

I'd love to share how we could help [Company] achieve similar results. Do you have 10 minutes next week for a brief chat?

Best,
[Your Name]`
    },
    {
        id: 2,
        title: 'Solving a Specific Pain Point',
        category: 'Intro',
        subject: 'Idea for [Pain Point]',
        body: `Hi [First Name],

I noticed that [Company] might be facing challenges with [Pain Point]. I've seen many companies in [Industry] struggle with this, often leading to [Negative Consequence].

We've developed a solution that [Solution Description], which has helped our clients reduce [Pain Point] by [Percentage]%.

Are you open to a quick conversation to see if this could work for you?

Cheers,
[Your Name]`
    },
    {
        id: 3,
        title: 'Generic Follow-up',
        category: 'Follow-up',
        subject: 'Following up on my last email',
        body: `Hi [First Name],

I wanted to quickly follow up on my previous email. I know things get busy, so I'll keep this brief.

I'm still very interested in discussing how we can help [Company] with [Benefit].

Do you have any time later this week or early next week to connect?

Best regards,
[Your Name]`
    },
    {
        id: 4,
        title: 'The "Any Thoughts?" Follow-up',
        category: 'Follow-up',
        subject: 'Any thoughts?',
        body: `Hi [First Name],

I'm writing to ask if you've had a chance to think about my previous note.

If you're not the right person to speak with, could you point me in the right direction?

Thanks,
[Your Name]`
    },
    {
        id: 5,
        title: 'Re-engagement / Break-up',
        category: 'Re-engagement',
        subject: 'Should I stay or should I go?',
        body: `Hi [First Name],

I haven't heard back from you, so I assume this isn't a priority right now or you've found another solution.

I'll stop following up for now to avoid cluttering your inbox.

If you ever need help with [Benefit] in the future, feel free to reach out.

Best wishes,
[Your Name]`
    },
     {
        id: 6,
        title: 'Referral Request',
        category: 'Intro',
        subject: 'Who handles [Department] at [Company]?',
        body: `Hi [First Name],

I'm looked to get in touch with the person responsible for [Department/Function] at [Company].

Could you please point me in the right direction?

Thanks in advance,
[Your Name]`
    },
     {
        id: 7,
        title: 'Congratulations on News',
        category: 'Intro',
        subject: 'Congrats on [News/Event]',
        body: `Hi [First Name],

I saw the news about [News/Event] - congratulations! It's great to see [Company] doing so well.

I was thinking that with this growth, you might be looking for ways to [Benefit related to your product].

We've helped similar companies scale by [Value Proposition].

Would you be open to a quick chat?

Best,
[Your Name]`
    },
    {
        id: 8,
        title: 'Resource/Value Add',
        category: 'Intro',
        subject: 'A resource for [Company]',
        body: `Hi [First Name],

I found this article/resource about [Topic] and thought it might be relevant to what you're doing at [Company].

[Link to Resource]

We also specialize in this area and have some other insights that might be useful.

Let me know if you'd like to hear more.

Best,
[Your Name]`
    },
];

const CATEGORIES = ['All', 'Intro', 'Follow-up', 'Re-engagement'];

export default function ColdEmail() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [copiedSubject, setCopiedSubject] = useState(false);
    const [copiedBody, setCopiedBody] = useState(false);

    const filteredTemplates = TEMPLATES.filter(template => {
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              template.body.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'subject') {
            setCopiedSubject(true);
            setTimeout(() => setCopiedSubject(false), 2000);
        } else {
            setCopiedBody(true);
            setTimeout(() => setCopiedBody(false), 2000);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Cold Email Templates | MiniTools by Spinotek</title>
                <meta name="description" content="High-converting templates for your outreach." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Cold Email Templates</h1>
                        <p className="text-slate-500 text-sm">High-converting templates for your outreach.</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredTemplates.map(template => (
                    <div 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                                {template.category}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {template.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-3">
                            {template.body}
                        </p>
                    </div>
                ))}

                {filteredTemplates.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-400">
                        <p>No templates found.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg mb-2 inline-block">
                                        {selectedTemplate.category}
                                    </span>
                                    <h2 className="text-2xl font-black text-slate-900">
                                        {selectedTemplate.title}
                                    </h2>
                                </div>
                                <button 
                                    onClick={() => setSelectedTemplate(null)}
                                    className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-slate-700">Subject Line</label>
                                        <button 
                                            onClick={() => handleCopy(selectedTemplate.subject, 'subject')}
                                            className="text-indigo-600 text-xs font-bold hover:underline"
                                        >
                                            {copiedSubject ? 'Copied!' : 'Copy Subject'}
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800">
                                        {selectedTemplate.subject}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-slate-700">Email Body</label>
                                        <button 
                                            onClick={() => handleCopy(selectedTemplate.body, 'body')}
                                            className="text-indigo-600 text-xs font-bold hover:underline"
                                        >
                                            {copiedBody ? 'Copied!' : 'Copy Body'}
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 whitespace-pre-wrap font-sans">
                                        {selectedTemplate.body}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <RelatedTools currentToolId="cold-email" categoryId="sales" />
        </ToolPageLayout>
    );
}
