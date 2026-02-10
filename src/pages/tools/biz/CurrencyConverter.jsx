import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Coins, ArrowRightLeft, RefreshCw, TrendingUp } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const COMMON_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
    { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('IDR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allRates, setAllRates] = useState({});

    useEffect(() => {
        fetchRates(fromCurrency);
    }, [fromCurrency]);

    const fetchRates = async (base) => {
        setLoading(true);
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
            const data = await response.json();
            
            if (data.result === 'success') {
                setAllRates(data.rates);
                setLastUpdated(new Date(data.time_last_update_utc).toLocaleDateString());
                setExchangeRate(data.rates[toCurrency]);
            }
        } catch (error) {
            console.error("Failed to fetch rates", error);
        } finally {
            setLoading(false);
        }
    };

    // Update rate when 'toCurrency' changes, using cached rates if available
    useEffect(() => {
        if (allRates[toCurrency]) {
            setExchangeRate(allRates[toCurrency]);
        }
    }, [toCurrency, allRates]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        // The useEffect for fromCurrency will trigger a re-fetch, which is accurate but maybe slightly slow.
        // Optimization: We could calculate the inverse rate immediately from existing data if we wanted, 
        // but fetching fresh data for the new base is safer for accuracy.
    };

    const formatCurrency = (val, currency) => {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: currency,
            maximumFractionDigits: 2
        }).format(val);
    };

    const convertedAmount = amount * (exchangeRate || 0);

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Currency Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Real-time exchange rates for global business." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Coins size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Currency Converter</h1>
                        <p className="text-slate-500 text-sm">Real-time exchange rates for global business.</p>
                    </div>
                </div>
                {lastUpdated && (
                    <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <RefreshCw size={12} />
                        Rates updated: {lastUpdated}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Converter Card */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative overflow-visible z-10">
                    <div className="flex flex-col gap-6">
                        {/* From Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Amount</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-2xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                                />
                                <div className="relative w-32 md:w-40">
                                    <select
                                        value={fromCurrency}
                                        onChange={(e) => setFromCurrency(e.target.value)}
                                        className="w-full h-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                                    >
                                        {COMMON_CURRENCIES.map(curr => (
                                            <option key={curr.code} value={curr.code}>{curr.code} {curr.flag}</option>
                                        ))}
                                         {/* Add more common ones if needed, or a 'Show All' logic later */}
                                         <option disabled>──────────</option>
                                         {Object.keys(allRates).sort().map(code => (
                                            <option key={code} value={code}>{code}</option>
                                         ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="relative h-2 flex items-center justify-center">
                            <div className="absolute bg-white p-2 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 hover:text-yellow-600 transition-all z-10" onClick={swapCurrencies}>
                                <ArrowRightLeft size={20} className={loading ? 'animate-pulse' : ''} />
                            </div>
                            <div className="w-full border-t border-slate-100"></div>
                        </div>

                        {/* To Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Converted To</label>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-yellow-50 border border-yellow-100 rounded-2xl px-6 py-4 flex items-center overflow-x-auto">
                                   <span className="text-3xl font-black text-slate-900 whitespace-nowrap">
                                        {loading ? <span className="text-sm text-slate-400 font-normal">Updating...</span> : formatCurrency(convertedAmount, toCurrency)}
                                   </span>
                                </div>
                                <div className="relative w-32 md:w-40">
                                    <select
                                        value={toCurrency}
                                        onChange={(e) => setToCurrency(e.target.value)}
                                        className="w-full h-full appearance-none bg-white border border-slate-200 rounded-2xl px-4 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                                    >
                                        {COMMON_CURRENCIES.map(curr => (
                                            <option key={curr.code} value={curr.code}>{curr.code} {curr.flag}</option>
                                        ))}
                                         <option disabled>──────────</option>
                                         {Object.keys(allRates).sort().map(code => (
                                            <option key={code} value={code}>{code}</option>
                                         ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Current Rate</div>
                            <div className="text-lg font-medium text-slate-700">
                                1 {fromCurrency} = <span className="text-slate-900 font-bold">{exchangeRate ? exchangeRate.toFixed(4) : '...'}</span> {toCurrency}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info / Tips */}
                <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-3xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-700">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">Did you know?</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Exchange rates fluctuate constantly due to global market supply and demand. This tool uses open data updated daily to give you accurate mid-market rates.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Popular Conversions</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500">1 USD to IDR</span>
                                <span className="font-bold text-slate-700">
                                    {allRates['IDR'] ? `Rp ${new Intl.NumberFormat('id-ID').format(allRates['IDR'])}` : '...'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500">1 EUR to USD</span>
                                <span className="font-bold text-slate-700">
                                    {allRates['EUR'] ? `$${(1 / allRates['EUR']).toFixed(2)}` : '...'}  {/* Base is USD, so EUR rate is 1 USD = X EUR. 1 EUR = 1/X USD */}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">1 SGD to IDR</span>
                                <span className="font-bold text-slate-700">
                                    {allRates['SGD'] && allRates['IDR'] 
                                        ? `Rp ${new Intl.NumberFormat('id-ID').format(allRates['IDR'] / allRates['SGD'])}` 
                                        : '...'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="currency-conv" categoryId="biz" />
        </ToolPageLayout>
    );
}
