import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart, BarChart, AreaChart, ScatterChart, Line, Bar, Area, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon, Save, Plus, Trash2, Settings, BarChart as BarChartIcon, ScatterChart as ScatterChartIcon, AreaChart as AreaChartIcon } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const CHART_TYPES = [
    { id: 'line', name: 'Line Chart', icon: LineChartIcon },
    { id: 'bar', name: 'Bar Chart', icon: BarChartIcon },
    { id: 'area', name: 'Area Chart', icon: AreaChartIcon },
    { id: 'scatter', name: 'Scatter Plot', icon: ScatterChartIcon },
];

export default function GraphPlotter() {
    const [data, setData] = useState([
        { x: 'A', y: 10 },
        { x: 'B', y: 25 },
        { x: 'C', y: 15 },
        { x: 'D', y: 30 },
        { x: 'E', y: 20 },
    ]);

    const [chartType, setChartType] = useState('bar');
    const [options, setOptions] = useState({
        color: '#8884d8',
        showGrid: true,
        xLabel: 'Category',
        yLabel: 'Value',
        showLegend: true
    });

    const chartRef = useRef(null);

    // --- Data Handling ---
    const updateData = (index, field, value) => {
        const newData = [...data];
        if (field === 'y') {
             const num = parseFloat(value);
             newData[index][field] = isNaN(num) ? value : num;
        } else {
            newData[index][field] = value;
        }
        setData(newData);
    };

    const addRow = () => {
        setData([...data, { x: `Item ${data.length + 1}`, y: 0 }]);
    };

    const removeRow = (index) => {
        if (data.length > 1) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    const downloadChart = () => {
        try {
            // Find the SVG element in the current DOM
            // Since Recharts renders SVG, we assume it's inside our container.
            // We can search by class or tag.
            // A more robust way is to use a ref on the container div, but Recharts ref points to the chart instance.
            // The ResponsiveContainer renders a div.
            
            // Let's try to find the SVG by query selector within the document for simplicity, 
            // or better, wrap the Chart in a div with an ID.
            const chartContainer = document.getElementById('recharts-container');
            if (!chartContainer) return;
            
            const svg = chartContainer.querySelector('svg');
            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            const svgSize = svg.getBoundingClientRect();
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;

            img.onload = () => {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                
                const pngFile = canvas.toDataURL("image/png");
                
                const downloadLink = document.createElement('a');
                downloadLink.download = `chart-${new Date().getTime()}.png`;
                downloadLink.href = `${pngFile}`;
                downloadLink.click();
            };

            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            img.src = url;

        } catch (e) {
            console.error("Download failed:", e);
            alert("Could not download chart. Support may vary by browser.");
        }
    };

    const renderChart = () => {
        const commonProps = {
            data: data,
            margin: { top: 20, right: 30, left: 20, bottom: 20 }
        };

        const renderAxis = (
            <>
                {options.showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                    dataKey="x" 
                    label={{ value: options.xLabel, position: 'insideBottomRight', offset: -5 }} 
                    type={chartType === 'scatter' ? 'number' : 'category'} 
                    allowDuplicatedCategory={false}
                />
                <YAxis 
                    dataKey="y" 
                    label={{ value: options.yLabel, angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                {options.showLegend && <Legend />}
            </>
        );

        switch (chartType) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        {renderAxis}
                        <Line type="monotone" dataKey="y" stroke={options.color} activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        {renderAxis}
                        <Bar dataKey="y" fill={options.color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                );
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        {renderAxis}
                        <Area type="monotone" dataKey="y" stroke={options.color} fill={options.color} fillOpacity={0.6} />
                    </AreaChart>
                );
            case 'scatter':
                const numericData = data.map(d => ({
                    ...d,
                    x: parseFloat(d.x) || 0,
                    y: parseFloat(d.y) || 0
                }));
                return (
                    <ScatterChart {...commonProps} data={numericData}>
                        {renderAxis}
                        <Scatter name="Data" dataKey="y" fill={options.color} />
                    </ScatterChart>
                );
            default:
                return null;
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Simple Graph Plotter | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize your data with simple bar, line, area, or scatter graphs." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LineChartIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Simple Graph Plotter</h1>
                        <p className="text-slate-500 text-sm">Create and download customized graphs instantly.</p>
                    </div>
                </div>
                
                <button 
                    onClick={downloadChart}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                >
                    <Save size={18} />
                    Download PNG
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Controls - Left Column */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Data Input */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Plus size={18} className="text-violet-600" />
                                Data Points
                            </h3>
                            <button onClick={addRow} className="p-2 hover:bg-slate-50 rounded-lg text-violet-600 font-medium text-sm transition-colors">
                                + Add Row
                            </button>
                        </div>
                        
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-6 gap-2 text-xs font-bold text-slate-400 uppercase mb-1">
                                <div className="col-span-3">X Value</div>
                                <div className="col-span-2">Y Value</div>
                                <div className="col-span-1"></div>
                            </div>
                            {data.map((row, index) => (
                                <div key={index} className="grid grid-cols-6 gap-2 items-center">
                                    <input 
                                        type="text" 
                                        className="col-span-3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        value={row.x}
                                        onChange={(e) => updateData(index, 'x', e.target.value)}
                                        placeholder="Label"
                                    />
                                    <input 
                                        type="number" 
                                        className="col-span-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        value={row.y}
                                        onChange={(e) => updateData(index, 'y', e.target.value)}
                                        placeholder="Value"
                                    />
                                    <button 
                                        onClick={() => removeRow(index)}
                                        className="col-span-1 flex items-center justify-center p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        disabled={data.length <= 1}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chart Settings */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                            <Settings size={18} className="text-violet-600" />
                            Configuration
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Chart Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {CHART_TYPES.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setChartType(type.id)}
                                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition-all
                                                ${chartType === type.id 
                                                    ? 'bg-violet-50 border-violet-200 text-violet-700 shadow-sm' 
                                                    : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            <type.icon size={16} />
                                            {type.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Axes Labels</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="text" 
                                        value={options.xLabel}
                                        onChange={(e) => setOptions({...options, xLabel: e.target.value})}
                                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="X Label"
                                    />
                                    <input 
                                        type="text" 
                                        value={options.yLabel}
                                        onChange={(e) => setOptions({...options, yLabel: e.target.value})}
                                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="Y Label"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Color Theme</label>
                                    <input 
                                        type="color" 
                                        value={options.color} 
                                        onChange={(e) => setOptions({...options, color: e.target.value})}
                                        className="w-full h-10 rounded-lg cursor-pointer border border-slate-200 p-1 bg-white"
                                    />
                                </div>
                                <div className="flex-1 flex items-end h-full pb-3">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input 
                                            type="checkbox" 
                                            checked={options.showGrid}
                                            onChange={(e) => setOptions({...options, showGrid: e.target.checked})}
                                            className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-slate-600">Show Grid</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Area - Right Column */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-[500px] flex flex-col" id="recharts-container">
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                {renderChart()}
                            </ResponsiveContainer>
                        </div>
                        {chartType === 'scatter' && (
                             <p className="text-xs text-center text-slate-400 mt-4">
                                Note: For Scatter plots, X values must be numeric. Non-numeric values will default to 0.
                             </p>
                        )}
                    </div>
                </div>

            </div>

            <RelatedTools currentToolId="graph-plotter" categoryId="academic" />
        </ToolPageLayout>
    );
}
