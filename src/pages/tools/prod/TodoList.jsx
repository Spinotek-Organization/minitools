import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ListTodo } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TodoList() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Minimalist To-Do List | MiniTools by Spinotek</title>
                <meta name="description" content="Keep your tasks simple and organized for the day." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ListTodo size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Minimalist To-Do List</h1>
                        <p className="text-slate-500 text-sm">Keep your tasks simple and organized for the day.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="todo-list" categoryId="productivity" />
        </ToolPageLayout>
    );
}
