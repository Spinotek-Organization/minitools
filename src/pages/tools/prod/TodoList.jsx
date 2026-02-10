import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ListTodo, Plus, Trash2, CheckCircle2, Circle, X } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TodoList() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('minitools-todos');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: 'Welcome to your new Todo list!', completed: false },
            { id: 2, text: 'Try checking this item off', completed: true },
        ];
    });
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed

    useEffect(() => {
        localStorage.setItem('minitools-todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(t => !t.completed));
    };

    const filteredTodos = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;

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

            <div className="max-w-2xl mx-auto">
                {/* Input Area */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-6">
                    <form onSubmit={addTodo} className="flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What needs to be done?" 
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button 
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-medium transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </form>
                </div>

                {/* Todo List */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Filters */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50 text-sm">
                        <div className="space-x-1">
                            {['all', 'active', 'completed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                                        filter === f 
                                        ? 'bg-indigo-100 text-indigo-700 font-medium' 
                                        : 'text-slate-500 hover:bg-slate-100'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <span className="text-slate-400 text-xs font-medium">
                            {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                        </span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {filteredTodos.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <p>No tasks found.</p>
                            </div>
                        ) : (
                            filteredTodos.map(todo => (
                                <div key={todo.id} className="group flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                                    <button 
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`flex-shrink-0 transition-colors ${todo.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
                                    >
                                        {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                    </button>
                                    
                                    <span className={`flex-1 ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                        {todo.text}
                                    </span>

                                    <button 
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-2"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {todos.some(t => t.completed) && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button 
                                onClick={clearCompleted}
                                className="text-sm text-slate-500 hover:text-rose-600 flex items-center justify-center gap-2 mx-auto transition-colors"
                            >
                                <Trash2 size={16} />
                                Clear Completed
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="todo-list" categoryId="productivity" />
        </ToolPageLayout>
    );
}
