import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, History, ChevronDown, Trash2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ScientificCalc() {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(true);
    const [angleMode, setAngleMode] = useState('deg'); // 'deg' or 'rad'
    const [isSecond, setIsSecond] = useState(false); // Shift key
    const [memory, setMemory] = useState(0);
    const displayRef = useRef(null);

    // Auto-scroll display
    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [display]);



    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    };

    const safeEvaluate = (expression) => {
        try {
            let expr = expression;
            
            // Handle Factorial: 5! -> factorial(5)
            // Naive regex for simple numbers: (\d+)!
            // Better to handle complex cases strictly or just simple numbers for now.
            // Let's replace 'number!' with 'factorial(number)'
            expr = expr.replace(/(\d+)!/g, 'factorial($1)');
            // Also handle )! for (2+3)!
            expr = expr.replace(/\)!/g, ', "factorial")'); // This strategy is hard with regex. 
            // Alternative: Define a factorial function in scope and hope user typed correctly? 
            // Standard calc usually does factorial on immediate number.
            // Let's just stick to post-processing the specific `!` symbol if possible later vs specific numbers.
            // Actually, in JS `5!` is syntax error. We must transform it.
            
            // Math constants
            expr = expr.replace(/π/g, 'Math.PI');
            expr = expr.replace(/e/g, 'Math.E');
            
            // Operators
            expr = expr.replace(/×/g, '*');
            expr = expr.replace(/÷/g, '/');
            expr = expr.replace(/\^/g, '**');
            expr = expr.replace(/mod/g, '%');

            // Root
            expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)'); // Basic sqrt(x)
            expr = expr.replace(/√(\d+)/g, 'Math.sqrt($1)'); // sqrt5

            // Functions scope
            const scope = {
                sin: (x) => angleMode === 'deg' ? Math.sin(x * Math.PI / 180) : Math.sin(x),
                cos: (x) => angleMode === 'deg' ? Math.cos(x * Math.PI / 180) : Math.cos(x),
                tan: (x) => angleMode === 'deg' ? Math.tan(x * Math.PI / 180) : Math.tan(x),
                asin: (x) => angleMode === 'deg' ? Math.asin(x) * 180 / Math.PI : Math.asin(x),
                acos: (x) => angleMode === 'deg' ? Math.acos(x) * 180 / Math.PI : Math.acos(x),
                atan: (x) => angleMode === 'deg' ? Math.atan(x) * 180 / Math.PI : Math.atan(x),
                sinh: Math.sinh,
                cosh: Math.cosh,
                tanh: Math.tanh,
                ln: Math.log,
                log: Math.log10,
                sqrt: Math.sqrt,
                abs: Math.abs,
                factorial: factorial,
                fact: factorial
            };

            // Replace function calls in string to use scope? 
            // Or use "with(scope) { eval(...) }" - deprecated but simplest for this "calculator" use case where inputs are numbers.
            // But strict mode forbids 'with'.
            // Instead, we can prefix known functions with 'scope.'
            const funcs = Object.keys(scope);
            funcs.forEach(f => {
                // negative lookbehind in JS regex is available in modern envs, but let's be safe.
                // Replace "sin(" with "scope.sin("
                const regex = new RegExp(`\\b${f}\\(`, 'g');
                expr = expr.replace(regex, `scope.${f}(`);
            });

            // Handle independent factorial function calls that might have been replaced earlier
            // If we did replace (\d+)! -> factorial($1), it becomes factorial(5). We need scope.factorial(5).
            expr = expr.replace(/\bfactorial\(/g, 'scope.factorial(');


            // Function constructor evaluation
            const evalFunc = new Function('scope', `return ${expr}`);
            const res = evalFunc(scope);

            if (!Number.isFinite(res) || Number.isNaN(res)) return "Error";
            
            // Precision handling
            // Round to 10 decimal places to avoid 0.0000000004
            return parseFloat(res.toFixed(10)).toString();

        } catch (e) {
            console.error(e);
            return "Error";
        }
    };

    const handleInput = useCallback((val) => {
        if (val === 'AC') {
            setDisplay('');
            setResult('');
        } else if (val === 'DEL') {
            setDisplay(prev => prev.toString().slice(0, -1));
        } else if (val === '=') {
            if (!display) return;
            const res = safeEvaluate(display);
            setResult(res);
            if (res !== "Error") {
                setHistory(prev => [{ expr: display, res }, ...prev].slice(0, 15));
            }
        } else if (val === 'Ans') {
            // Use previous result
            if (history.length > 0) {
                setDisplay(prev => prev + history[0].res);
            }
        } else if (val === 'Rand') {
            setDisplay(prev => prev + Math.random().toFixed(4));
        } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'sqrt', 'fact'].includes(val)) {
            setDisplay(prev => prev + val + '(');
        } else if (val === 'x²') {
            setDisplay(prev => prev + '^2');
        } else if (val === 'x³') {
            setDisplay(prev => prev + '^3');
        } else if (val === 'xʸ') {
            setDisplay(prev => prev + '^');
        } else if (val === '10ˣ') {
            setDisplay(prev => prev + '10^');
        } else if (val === 'eˣ') {
            setDisplay(prev => prev + 'e^');
        } else if (val === '1/x') {
            setDisplay(prev => prev + '1/('); // User needs to close
        } else if (val === 'MC') {
            setMemory(0);
        } else if (val === 'MR') {
            setDisplay(prev => prev + memory);
        } else if (val === 'M+') {
            const res = safeEvaluate(display || result); // Add current display or last result
            if (res !== "Error") setMemory(m => m + parseFloat(res));
        } else if (val === 'M-') {
            const res = safeEvaluate(display || result);
            if (res !== "Error") setMemory(m => m - parseFloat(res));
        }else if (val === 'π') {
             setDisplay(prev => prev + 'π');
        } else if (val === 'e') {
             setDisplay(prev => prev + 'e');
        } else if (val === 'n!') {
             setDisplay(prev => prev + '!');
        } else {
             // General append
             setDisplay(prev => prev + val);
        }
    }, [display, result, history, memory, angleMode]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            if (/\d/.test(key)) handleInput(key);
            if (['+', '-', '*', '/', '(', ')', '.', '^', '%', '!'].includes(key)) handleInput(key);
            if (key === 'Enter') handleInput('=');
            if (key === 'Backspace') handleInput('DEL');
            if (key === 'Escape') handleInput('AC');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleInput]);

    // Button Configuration
    // Rows of 6 or 5? Mobile needs responsive.
    const sciButtons = [
        { label: '2nd', action: () => setIsSecond(!isSecond), active: isSecond, bg: 'bg-violet-600 text-white' },
        { label: angleMode === 'deg' ? 'DEG' : 'RAD', action: () => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg'), bg: 'bg-slate-200 text-slate-900 font-bold' },
        { label: 'sin', alt: 'asin', type: 'func' },
        { label: 'cos', alt: 'acos', type: 'func' },
        { label: 'tan', alt: 'atan', type: 'func' },
        
        { label: 'xʸ', alt: '√', val: '^' }, // visual label, actual append
        { label: 'log', alt: '10ˣ', type: 'func' },
        { label: 'ln', alt: 'eˣ', type: 'func' },
        { label: '(', val: '(' },
        { label: ')', val: ')' },
        
        { label: 'x²', alt: 'x³', val: 'x²' },
        { label: '1/x', alt: 'fact', val: '1/x' },
        { label: 'n!', val: '!' },
        { label: 'π', val: 'π' },
        { label: 'e', val: 'e' },
    ];

    const basicButtons = [
        { label: 'AC', action: 'AC', bg: 'bg-red-500 text-white hover:bg-red-600' },
        { label: 'DEL', action: 'DEL', bg: 'bg-slate-300 hover:bg-slate-400' },
        { label: '%', val: '%' },
        { label: '÷', val: '÷', bg: 'bg-amber-500 text-white hover:bg-amber-600' },

        { label: '7', val: '7' }, { label: '8', val: '8' }, { label: '9', val: '9' },
        { label: '×', val: '×', bg: 'bg-amber-500 text-white hover:bg-amber-600' },

        { label: '4', val: '4' }, { label: '5', val: '5' }, { label: '6', val: '6' },
        { label: '-', val: '-', bg: 'bg-amber-500 text-white hover:bg-amber-600' },

        { label: '1', val: '1' }, { label: '2', val: '2' }, { label: '3', val: '3' },
        { label: '+', val: '+', bg: 'bg-amber-500 text-white hover:bg-amber-600' },

        { label: '0', val: '0', span: 2 }, { label: '.', val: '.' },
        { label: '=', action: '=', bg: 'bg-sky-600 text-white hover:bg-sky-700' },
    ];

    const memButtons = [
        { label: 'MC', val: 'MC' },
        { label: 'MR', val: 'MR' },
        { label: 'M+', val: 'M+' },
        { label: 'M-', val: 'M-' },
        { label: 'Ans', val: 'Ans' },
        { label: 'Rand', val: 'Rand' },
    ];

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Scientific Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Professional grade scientific calculator with trigonometry, algebra, and memory functions." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calculator size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Scientific Calculator</h1>
                        <p className="text-slate-500 text-sm">Professional grade calculator with trigonometry and history.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Calculator Body */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-900 p-6 rounded-[2rem] shadow-2xl border border-slate-800 ring-4 ring-slate-100 dark:ring-slate-800">
                        
                        {/* Display Screen */}
                        <div className="bg-[#b4c4a6] rounded-xl p-4 mb-6 shadow-inner relative border-4 border-slate-700 h-32 flex flex-col justify-between font-mono text-slate-900">
                            <div className="flex justify-between items-start text-xs font-bold opacity-60">
                                <span>{angleMode.toUpperCase()}</span>
                                <span className={memory !== 0 ? 'visible' : 'invisible'}>M</span>
                            </div>
                            <div className="text-right text-sm opacity-70 h-5 overflow-hidden text-ellipsis whitespace-nowrap">
                                {result && `= ${result}`}
                            </div>
                            <input
                                ref={displayRef}
                                type="text"
                                className="w-full bg-transparent border-none text-3xl font-bold text-right p-0 focus:ring-0 overflow-x-auto font-mono tracking-widest placeholder-slate-700/30"
                                value={display}
                                onChange={(e) => setDisplay(e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        {/* Controls Container */}
                        <div className="space-y-3">
                            
                            {/* Memory & Top Row */}
                            <div className="grid grid-cols-6 gap-2 mb-2">
                                {memButtons.map((btn, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleInput(btn.val)}
                                        className="py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                {/* Scientific Pad (Left/Top on mobile) */}
                                <div className={`md:col-span-2 grid grid-cols-5 md:grid-cols-2 gap-2 ${!showAdvanced ? 'hidden md:grid' : ''}`}>
                                    {sciButtons.map((btn, i) => {
                                        const label = isSecond && btn.alt ? btn.alt : btn.label;
                                        return (
                                            <button
                                                key={i}
                                                onClick={btn.action ? btn.action : () => handleInput(label)}
                                                className={`
                                                    h-10 md:h-12 rounded-lg text-sm font-bold flex items-center justify-center transition-all active:scale-95
                                                    ${btn.bg ? btn.bg : 'bg-slate-700 text-white hover:bg-slate-600'}
                                                    ${btn.active ? 'ring-2 ring-white/50' : ''}
                                                `}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Basic Pad (Right) */}
                                <div className="md:col-span-3 grid grid-cols-4 gap-3">
                                    {basicButtons.map((btn, i) => (
                                        <button
                                            key={i}
                                            onClick={() => btn.action ? handleInput(btn.action) : handleInput(btn.val)}
                                            className={`
                                                h-14 rounded-2xl text-xl font-bold flex items-center justify-center transition-all shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]
                                                ${btn.bg ? btn.bg : 'bg-slate-100 text-slate-900 hover:bg-white'}
                                                ${btn.span ? `col-span-${btn.span}` : ''}
                                            `}
                                            style={btn.span ? { gridColumn: `span ${btn.span}` } : {}}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Toggle */}
                            <button 
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="w-full py-2 text-slate-400 text-xs font-bold md:hidden flex items-center justify-center gap-1"
                            >
                                <ChevronDown size={14} className={showAdvanced ? 'rotate-180' : ''} />
                                {showAdvanced ? 'Hide Scientific' : 'Show Scientific'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm h-[560px] flex flex-col">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <History size={18} />
                                Calculation Tape
                            </h3>
                            <button onClick={() => setHistory([])} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <div className="text-center py-10 opacity-40">
                                    <Calculator size={48} className="mx-auto mb-2" />
                                    <p className="text-sm">History is empty</p>
                                </div>
                            ) : (
                                history.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="group p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 cursor-pointer transition-all"
                                        onClick={() => setDisplay(item.res)}
                                    >
                                        <div className="text-right text-xs text-slate-400 font-mono mb-1">{item.expr}</div>
                                        <div className="text-right text-xl font-bold text-slate-800 font-mono text-ellipsis overflow-hidden">
                                            = {item.res}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
            
            <RelatedTools currentToolId="sci-calc" categoryId="academic" />
        </ToolPageLayout>
    );    
}