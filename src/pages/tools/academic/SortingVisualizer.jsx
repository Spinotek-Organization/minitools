import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Play, Pause, RotateCcw, SkipBack, SkipForward, ChevronRight, Code } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// --- Algorithm Logic & Pseudocode ---

const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        complexity: 'O(n²)',
        code: [
            'do',
            '  swapped = false',
            '  for i = 0 to n-2',
            '    if arr[i] > arr[i+1]',
            '      swap(arr[i], arr[i+1])',
            '      swapped = true',
            'while swapped'
        ],
        run: (arr) => {
            const trace = [];
            const n = arr.length;
            let swapped;
            const a = [...arr];
            
            trace.push({ type: 'start', array: [...a], group: [], line: 0 });

            do {
                swapped = false;
                trace.push({ type: 'check', array: [...a], group: [], line: 1, vars: `swapped = false` });
                
                for (let i = 0; i < n - 1; i++) {
                    trace.push({ type: 'compare', array: [...a], group: [i, i+1], line: 3, vars: `i = ${i}, compare ${a[i]} > ${a[i+1]}` });
                    
                    if (a[i] > a[i+1]) {
                        trace.push({ type: 'swap', array: [...a], group: [i, i+1], line: 4, vars: `swap ${a[i]} and ${a[i+1]}` });
                        let temp = a[i];
                        a[i] = a[i+1];
                        a[i+1] = temp;
                        swapped = true;
                        trace.push({ type: 'swap_done', array: [...a], group: [i, i+1], line: 5, vars: `swapped = true` });
                    }
                }
                trace.push({ type: 'loop_end', array: [...a], group: [], line: 6 });
            } while (swapped);

            trace.push({ type: 'done', array: [...a], group: [], line: -1, vars: 'Sorted!' });
            return trace;
        }
    },
    selection: {
        name: 'Selection Sort',
        description: 'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
        complexity: 'O(n²)',
        code: [
            'for i = 0 to n-1',
            '  min = i',
            '  for j = i+1 to n',
            '    if arr[j] < arr[min]',
            '      min = j',
            '  if min != i',
            '    swap(arr[i], arr[min])'
        ],
        run: (arr) => {
            const trace = [];
            const n = arr.length;
            const a = [...arr];

            for (let i = 0; i < n; i++) {
                let min = i;
                trace.push({ type: 'start_i', array: [...a], group: [i], sorted: Array.from({length: i}, (_, k) => k), line: 0, vars: `i = ${i}` });
                trace.push({ type: 'set_min', array: [...a], group: [min], sorted: Array.from({length: i}, (_, k) => k), line: 1, vars: `min = ${min} (${a[min]})` });

                for (let j = i + 1; j < n; j++) {
                    trace.push({ type: 'compare', array: [...a], group: [j, min], sorted: Array.from({length: i}, (_, k) => k), line: 3, vars: `check ${a[j]} < ${a[min]}` });
                    if (a[j] < a[min]) {
                        min = j;
                        trace.push({ type: 'new_min', array: [...a], group: [min], sorted: Array.from({length: i}, (_, k) => k), line: 4, vars: `new min = ${min} (${a[min]})` });
                    }
                }

                if (min !== i) {
                    trace.push({ type: 'swap', array: [...a], group: [i, min], sorted: Array.from({length: i}, (_, k) => k), line: 6, vars: `swap ${a[i]} and ${a[min]}` });
                    let temp = a[i];
                    a[i] = a[min];
                    a[min] = temp;
                }
            }
            trace.push({ type: 'done', array: [...a], group: [], sorted: Array.from({length: n}, (_, k) => k), line: -1, vars: 'Sorted!' });
            return trace;
        }
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the final sorted array one item at a time.',
        complexity: 'O(n²)',
        code: [
            'for i = 1 to n',
            '  key = arr[i]',
            '  j = i - 1',
            '  while j >= 0 and arr[j] > key',
            '    arr[j + 1] = arr[j]',
            '    j = j - 1',
            '  arr[j + 1] = key'
        ],
        run: (arr) => {
            const trace = [];
            const n = arr.length;
            const a = [...arr];

            for (let i = 1; i < n; i++) {
                let key = a[i];
                let j = i - 1;
                trace.push({ type: 'pick_key', array: [...a], group: [i], line: 1, vars: `key = ${key}, i = ${i}` });

                while (j >= 0 && a[j] > key) {
                    trace.push({ type: 'compare', array: [...a], group: [j, j+1], line: 3, vars: `compare ${a[j]} > ${key}` });
                    a[j + 1] = a[j];
                    trace.push({ type: 'overwrite', array: [...a], group: [j+1], line: 4, vars: `move ${a[j]} to pos ${j+1}` });
                    j = j - 1;
                }
                a[j + 1] = key;
                trace.push({ type: 'insert', array: [...a], group: [j+1], line: 6, vars: `insert ${key} at ${j+1}` });
            }
            trace.push({ type: 'done', array: [...a], group: [], line: -1, vars: 'Sorted!' });
            return trace;
        }
    },
    merge: {
        name: 'Merge Sort',
        description: 'Divides the array into halves, sorts them and merges them back together.',
        complexity: 'O(n log n)',
        code: [
            'mergeSort(arr, left, right)',
            '  if left >= right return',
            '  mid = (left + right) / 2',
            '  mergeSort(arr, left, mid)',
            '  mergeSort(arr, mid + 1, right)',
            '  merge(arr, left, mid, right)'
        ],
        run: (arr) => {
            const trace = [];
            const a = [...arr];

            const merge = (start, mid, end) => {
                let leftObj = { idx: start, array: a.slice(start, mid + 1) };
                let rightObj = { idx: mid + 1, array: a.slice(mid + 1, end + 1) };
                
                trace.push({ type: 'merge_start', array: [...a], group: [], range: [start, end], line: 5, vars: `merging ${start}-${mid} and ${mid+1}-${end}` });

                let i = 0, j = 0, k = start;
                // Simplified visualization: Just show the result of merge step by step
                const merged = [];
                
                while (i < leftObj.array.length && j < rightObj.array.length) {
                    trace.push({ type: 'compare', array: [...a], group: [start+i, mid+1+j], range: [start, end], line: 5, vars: `compare ${leftObj.array[i]} vs ${rightObj.array[j]}` });
                    
                    if (leftObj.array[i] <= rightObj.array[j]) {
                        merged.push(leftObj.array[i++]);
                    } else {
                        merged.push(rightObj.array[j++]);
                    }
                }
                while (i < leftObj.array.length) merged.push(leftObj.array[i++]);
                while (j < rightObj.array.length) merged.push(rightObj.array[j++]);

                // Apply back
                for(let m=0; m<merged.length; m++) {
                    a[start + m] = merged[m];
                    trace.push({ type: 'overwrite', array: [...a], group: [start + m], range: [start, end], line: 5, vars: `set index ${start+m} = ${merged[m]}` });
                }
            };

            const sort = (start, end) => {
                if(start >= end) return;
                const mid = Math.floor((start + end) / 2);
                
                trace.push({ type: 'split', array: [...a], range: [start, end], line: 2, vars: `split ${start}-${end}` });
                
                sort(start, mid);
                sort(mid + 1, end);
                merge(start, mid, end);
            };

            sort(0, a.length - 1);
            trace.push({ type: 'done', array: [...a], group: [], line: -1, vars: 'Sorted!' });
            return trace;
        }
    },
    quick: {
        name: 'Quick Sort',
        description: 'Picks a pivot and partitions the array around it.',
        complexity: 'O(n log n)',
        code: [
            'quickSort(arr, low, high)',
            '  if low < high',
            '    pi = partition(arr, low, high)',
            '    quickSort(arr, low, pi - 1)',
            '    quickSort(arr, pi + 1, high)'
        ],
        run: (arr) => {
            const trace = [];
            const a = [...arr];

            const partition = (low, high) => {
                let pivot = a[high];
                let i = low - 1;
                trace.push({ type: 'pivot', array: [...a], pivot: high, range: [low, high], line: 2, vars: `partition: pivot=${pivot} (idx ${high})` });

                for(let j = low; j < high; j++) {
                    trace.push({ type: 'compare', array: [...a], pivot: high, group: [j, high], range: [low, high], line: 2, vars: `check ${a[j]} < ${pivot}?` });
                    if(a[j] < pivot) {
                        i++;
                        let temp = a[i];
                        a[i] = a[j];
                        a[j] = temp;
                        trace.push({ type: 'swap', array: [...a], pivot: high, group: [i, j], range: [low, high], line: 2, vars: `swap ${a[i]} and ${a[j]}` });
                    }
                }
                let temp = a[i + 1];
                a[i + 1] = a[high];
                a[high] = temp;
                trace.push({ type: 'pivot_place', array: [...a], group: [i+1, high], line: 2, vars: `place pivot at ${i+1}` });
                return i + 1;
            };

            const sort = (low, high) => {
                if (low < high) {
                    let pi = partition(low, high);
                    sort(low, pi - 1);
                    sort(pi + 1, high);
                }
            };

            sort(0, a.length - 1);
            trace.push({ type: 'done', array: [...a], group: [], line: -1, vars: 'Sorted!' });
            return trace;
        }
    }
};

export default function SortingVisualizer() {
    const [algorithm, setAlgorithm] = useState('bubble');
    const [arraySize, setArraySize] = useState(15);
    const [speed, setSpeed] = useState(50);
    
    // Core state
    const [trace, setTrace] = useState([]);
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(false);
    
    // Code Editor State
    const [codeLines, setCodeLines] = useState(ALGORITHMS['bubble'].code);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const timerRef = useRef(null);

    // Initial load & Algorithm Change
    useEffect(() => {
        reset();
        setCodeLines(ALGORITHMS[algorithm].code);
        setEditValue(ALGORITHMS[algorithm].code.join('\n'));
        setIsEditing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arraySize, algorithm]);

    // Playback loop
    useEffect(() => {
        if (playing) {
            const delay = Math.max(10, 500 - (speed * 4.5));
            timerRef.current = setTimeout(() => {
                if (step < trace.length - 1) {
                    setStep(s => s + 1);
                } else {
                    setPlaying(false);
                }
            }, delay);
        }
        return () => clearTimeout(timerRef.current);
    }, [playing, step, speed, trace.length]);

    const reset = () => {
        setPlaying(false);
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 50) + 5);
        const generatedTrace = ALGORITHMS[algorithm].run(newArray);
        setTrace(generatedTrace);
        setStep(0);
    };

    const handleStepChange = (e) => {
        setStep(Number(e.target.value));
        setPlaying(false);
    };

    const currentFrame = trace[step] || { array: [], line: -1, vars: 'Ready' };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Sorting Visualizer | MiniTools</title>
                <meta name="description" content="Visualise sorting algorithms step-by-step with code and variable updates." />
            </Helmet>

            <div className="flex flex-col gap-6">
                
                {/* 1. Header & Controls */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Sorting Visualizer</h1>
                            <p className="text-xs text-slate-500 font-medium">{ALGORITHMS[algorithm].name} - {ALGORITHMS[algorithm].complexity}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        {Object.keys(ALGORITHMS).map(key => (
                            <button
                                key={key}
                                onClick={() => setAlgorithm(key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                                    algorithm === key ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Main Visualization Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                    
                    {/* Visualizer Canvas */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] p-8 flex flex-col relative overflow-hidden shadow-2xl">
                        
                        {/* Bars Container */}
                        <div className="flex-1 flex items-end justify-center gap-1 md:gap-2">
                            {currentFrame.array.map((val, idx) => {
                                // Color Logic
                                let color = 'bg-slate-400';
                                if (currentFrame.type === 'done' || (currentFrame.sorted && currentFrame.sorted.includes(idx))) {
                                    color = 'bg-emerald-500';
                                } else if (currentFrame.group && currentFrame.group.includes(idx)) {
                                    if (currentFrame.type === 'compare') color = 'bg-amber-500';
                                    if (currentFrame.type === 'swap' || currentFrame.type === 'overwrite') color = 'bg-red-500';
                                    if (currentFrame.type === 'new_min') color = 'bg-sky-500';
                                } else if (currentFrame.pivot === idx) {
                                    color = 'bg-violet-500';
                                } else if (currentFrame.range && idx >= currentFrame.range[0] && idx <= currentFrame.range[1]) {
                                    color = 'bg-slate-600'; // Active range
                                }

                                return (
                                    <div key={idx} className="flex flex-col justify-end group relative w-full max-w-[40px] h-full transition-all">
                                        <div 
                                            className={`w-full rounded-t-md transition-colors duration-200 ${color}`}
                                            style={{ height: `${(val / 60) * 100}%` }}
                                        ></div>
                                        {arraySize <= 20 && (
                                            <span className="text-[10px] text-center text-slate-400 font-mono mt-1 w-full block">{val}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Status Bar Overlay */}
                        <div className="mt-6 flex items-center justify-between text-white/50 text-xs font-mono bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                            <span>Step {step + 1} / {trace.length}</span>
                            <span className="text-white">{currentFrame.vars}</span>
                        </div>
                    </div>

                    {/* Right Panel: Code & Trace */}
                    <div className="bg-slate-900 rounded-[2rem] p-6 flex flex-col shadow-xl border border-slate-800 h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                                <Code size={14} /> Pseudocode
                            </div>
                            <button 
                                onClick={() => {
                                    if (isEditing) {
                                        setCodeLines(editValue.split('\n'));
                                    } else {
                                        setEditValue(codeLines.join('\n'));
                                    }
                                    setIsEditing(!isEditing);
                                }}
                                className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                        </div>
                        
                        <div className="font-mono text-xs leading-6 overflow-y-auto custom-scrollbar flex-1 mb-4">
                            {isEditing ? (
                                <textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full h-full bg-slate-800 text-slate-300 p-2 rounded outline-none resize-none font-mono text-xs leading-6"
                                    spellCheck="false"
                                />
                            ) : (
                                codeLines.map((lineStr, i) => (
                                    <div 
                                        key={i} 
                                        className={`px-3 py-1 rounded transition-colors ${
                                            (currentFrame.line === i) 
                                                ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-500' 
                                                : 'text-slate-500'
                                        }`}
                                    >
                                        {lineStr.replace(/ /g, '\u00A0') || '\u00A0'}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bg-black/30 p-4 rounded-xl border border-slate-700/50">
                            <h4 className="text-slate-400 text-xs font-bold mb-2 uppercase">Legend</h4>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-400">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Unsorted</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Sorted</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Compare</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Swap</span>
                                {algorithm === 'quick' && <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-500"></span> Pivot</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Playback Controls */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        
                        {/* Play/Pause/Nav */}
                        <div className="flex items-center gap-2">
                             <button onClick={reset} className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                <RotateCcw size={20} />
                            </button>
                            <button 
                                onClick={() => setPlaying(!playing)}
                                className={`
                                    w-14 h-14 flex items-center justify-center rounded-2xl text-white shadow-lg transition-all active:scale-95
                                    ${playing ? 'bg-amber-500 shadow-amber-200' : 'bg-slate-800 shadow-slate-200'}
                                `}
                            >
                                {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={() => { setPlaying(false); setStep(s => Math.max(0, s-1)); }} className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                <SkipBack size={20} />
                            </button>
                            <button onClick={() => { setPlaying(false); setStep(s => Math.min(trace.length-1, s+1)); }} className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                <SkipForward size={20} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex-1 w-full px-4">
                            <input 
                                type="range" 
                                min="0" 
                                max={Math.max(0, trace.length - 1)} 
                                value={step} 
                                onChange={handleStepChange}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800 hover:accent-amber-500 transition-colors"
                            />
                            <div className="flex justify-between mt-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                                <span>Start</span>
                                <span>Timeline</span>
                                <span>End</span>
                            </div>
                        </div>

                         {/* Config */}
                         <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px] border-l border-slate-100 pl-6 border-dashed">
                             <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Speed</label>
                                <input type="range" min="1" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800" />
                             </div>
                             <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Items: {arraySize}</label>
                                <input type="range" min="5" max="50" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800" />
                             </div>
                         </div>
                    </div>
                </div>

            </div>
            
            <RelatedTools currentToolId="sorting-visualizer" categoryId="academic" />
        </ToolPageLayout>
    );
}
