import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Plus, Trash2, Copy, Sun, Moon } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const COMMON_TIMEZONES = [
    { label: 'London (GMT)', value: 'Europe/London' },
    { label: 'New York (EST)', value: 'America/New_York' },
    { label: 'Los Angeles (PST)', value: 'America/Los_Angeles' },
    { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
    { label: 'Sydney (AEDT)', value: 'Australia/Sydney' },
    { label: 'Dubai (GST)', value: 'Asia/Dubai' },
    { label: 'Paris (CET)', value: 'Europe/Paris' },
    { label: 'Singapore (SGT)', value: 'Asia/Singapore' },
    { label: 'Hong Kong (HKT)', value: 'Asia/Hong_Kong' },
    { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
    { label: 'Berlin (CET)', value: 'Europe/Berlin' },
    { label: 'Chicago (CST)', value: 'America/Chicago' },
    { label: 'Toronto (EST)', value: 'America/Toronto' },
    { label: 'Sao Paulo (BRT)', value: 'America/Sao_Paulo' },
    { label: 'Jakarta (WIB)', value: 'Asia/Jakarta' },
    { label: 'Bangkok (ICT)', value: 'Asia/Bangkok' },
    { label: 'Seoul (KST)', value: 'Asia/Seoul' },
    { label: 'Shanghai (CST)', value: 'Asia/Shanghai' },
    { label: 'Moscow (MSK)', value: 'Europe/Moscow' },
];

export default function TimezoneConverter() {
    const [baseDate, setBaseDate] = useState(new Date());
    const [locations, setLocations] = useState([]);
    const [sliderValue, setSliderValue] = useState(0); // Minutes from start of day
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Initialize with user's local timezone
        try {
            const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setLocations([{ 
                id: 'local', 
                timezone: userTz, 
                label: 'My Local Time' 
            }]);
            
            // Set slider to current time
            const now = new Date();
            const minutes = now.getHours() * 60 + now.getMinutes();
            setSliderValue(minutes);
        } catch (e) {
            console.error(e);
            setLocations([{ id: 'local', timezone: 'UTC', label: 'UTC' }]);
        }
    }, []);

    const handleAddLocation = (e) => {
        const tzValue = e.target.value;
        if (!tzValue) return;
        
        const tzInfo = COMMON_TIMEZONES.find(t => t.value === tzValue);
        if (locations.some(l => l.timezone === tzValue)) return; // Prevent duplicates

        setLocations([...locations, {
            id: Date.now().toString(),
            timezone: tzValue,
            label: tzInfo ? tzInfo.label : tzValue
        }]);
    };

    const removeLocation = (id) => {
        setLocations(locations.filter(l => l.id !== id));
    };

    const handleSliderChange = (e) => {
        const val = parseInt(e.target.value);
        setSliderValue(val);
        
        // Update baseDate to match slider
        const newDate = new Date(baseDate);
        newDate.setHours(Math.floor(val / 60));
        newDate.setMinutes(val % 60);
        setBaseDate(newDate);
    };

    const getTimeInZone = (timezone) => {
        // Calculate date based on slider value (which assumes local day)
        // Actually, we want to shift the baseDate.
        // Let's assume baseDate is the "anchor" day.
        
        const date = new Date(baseDate); 
        // We ensure baseDate reflects the slider's time in LOCAL context
        date.setHours(Math.floor(sliderValue / 60));
        date.setMinutes(sliderValue % 60);

        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timezone,
            hour12: true
        });
    };

    const getDayInZone = (timezone) => {
        const date = new Date(baseDate);
        date.setHours(Math.floor(sliderValue / 60));
        date.setMinutes(sliderValue % 60);

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: timezone
        });
    };

    const isBusinessHours = (timezone) => {
        const date = new Date(baseDate);
        date.setHours(Math.floor(sliderValue / 60));
        date.setMinutes(sliderValue % 60);
        
        // Get hour in target timezone as generic integer
        const hourStr = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: false,
            timeZone: timezone
        });
        const hour = parseInt(hourStr);
        
        return hour >= 9 && hour < 17;
    };

    const handleCopy = () => {
        const lines = locations.map(loc => {
            return `${loc.label}: ${getTimeInZone(loc.timezone)} (${getDayInZone(loc.timezone)})`;
        });
        navigator.clipboard.writeText(lines.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTimeSlider = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Time Zone Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Coordinate meetings across different time zones." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Time Zone Converter</h1>
                        <p className="text-slate-500 text-sm">Coordinate meetings across different time zones.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                
                {/* Controls */}
                <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-sm font-bold text-slate-700">Time Slider</label>
                        <span className="text-2xl font-black text-orange-600 font-mono">
                            {formatTimeSlider(sliderValue)}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1439" // 24 * 60 - 1
                        step="15"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>11:59 PM</span>
                    </div>
                </div>

                {/* Locations List */}
                <div className="space-y-4 mb-8">
                    {locations.map((loc) => {
                        const isBiz = isBusinessHours(loc.timezone);
                        return (
                            <div 
                                key={loc.id} 
                                className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl border transition-all ${
                                    isBiz 
                                        ? 'bg-emerald-50 border-emerald-100' 
                                        : 'bg-white border-slate-200'
                                }`}
                            >
                                <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isBiz ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        {isBiz ? <Sun size={20} /> : <Moon size={20} />}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-900">{loc.label}</div>
                                        <div className="text-xs text-slate-500">{loc.timezone}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                        <div className={`text-xl font-bold font-mono ${isBiz ? 'text-emerald-700' : 'text-slate-700'}`}>
                                            {getTimeInZone(loc.timezone)}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">
                                            {getDayInZone(loc.timezone)}
                                        </div>
                                    </div>
                                    
                                    {loc.id !== 'local' && (
                                        <button 
                                            onClick={() => removeLocation(loc.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
                    <div className="relative group w-full md:w-auto">
                        <select
                            onChange={handleAddLocation}
                            className="w-full md:w-64 appearance-none pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                            value=""
                        >
                            <option value="" disabled>Add a city...</option>
                            {COMMON_TIMEZONES.map(tz => (
                                <option key={tz.value} value={tz.value}>
                                    {tz.label}
                                </option>
                            ))}
                        </select>
                        <Plus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                            copied
                                ? 'bg-green-600 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied Meeting Time!' : 'Copy Meeting Time'}
                    </button>
                </div>
            </div>

            <RelatedTools currentToolId="tz-converter" categoryId="sales" />
        </ToolPageLayout>
    );
}
