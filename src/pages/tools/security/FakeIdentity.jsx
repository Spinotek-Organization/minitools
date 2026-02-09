import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserCircle, RefreshCw, Copy, MapPin, Mail, Phone, CreditCard, Calendar, Briefcase, Globe, Check } from 'lucide-react';
import { faker } from '@faker-js/faker';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function FakeIdentity() {
    const [identity, setIdentity] = useState(null);
    const [gender, setGender] = useState('random');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const generateIdentity = () => {
        // Debug log
        console.log('Generating identity...', { gender });
        
        setLoading(true);
        // Minimal timeout just to show feedback that something happened
        setTimeout(() => {
            try {
                const sexType = gender === 'random' ? undefined : gender;
                const sex = faker.person.sexType(sexType);
                const firstName = faker.person.firstName(sex);
                const lastName = faker.person.lastName(sex);
                const fullName = `${firstName} ${lastName}`;
                const email = faker.internet.email({ firstName, lastName });
                
                const newIdentity = {
                    firstName,
                    lastName,
                    fullName,
                    gender: sex,
                    avatar: faker.image.avatar(),
                    jobTitle: faker.person.jobTitle(),
                    phone: faker.phone.number(),
                    email: email,
                    username: faker.internet.username({ firstName, lastName }),
                    password: faker.internet.password(),
                    birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString(),
                    address: {
                        street: faker.location.streetAddress(),
                        city: faker.location.city(),
                        state: faker.location.state(),
                        zipCode: faker.location.zipCode(),
                        country: faker.location.country()
                    },
                    finance: {
                        creditCardNumber: faker.finance.creditCardNumber('####-####-####-####'),
                        cvv: faker.finance.creditCardCVV(),
                        expiry: `${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}/${String(faker.number.int({ min: 24, max: 30 })).slice(-2)}`
                    },
                    uuid: faker.string.uuid()
                };

                setIdentity(newIdentity);
            } catch (error) {
                console.error('Error generating identity:', error);
            } finally {
                setLoading(false);
                setCopied(false);
            }
        }, 50); // Reduced to 50ms for snappy feel
    };

    useEffect(() => {
        generateIdentity();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(identity, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const InfoRow = ({ icon: Icon, label, value, mono = false }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3 text-slate-500 mb-1 sm:mb-0">
                <Icon size={16} />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <div className={`font-bold text-slate-800 text-right ${mono ? 'font-mono' : ''}`}>
                {value}
            </div>
        </div>
    );

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Fake Identity Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate random profiles for software testing and privacy protection." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <UserCircle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Fake Identity Generator</h1>
                        <p className="text-slate-500 text-sm">Generate random profiles for software testing and privacy.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-slate-700 font-bold mb-4">Configuration</label>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Gender</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['random', 'male', 'female'].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => setGender(g)}
                                            className={`py-2 px-3 rounded-xl text-sm font-bold capitalize transition-all border-2 ${
                                                gender === g 
                                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                                                    : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                            }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateIdentity}
                                disabled={loading}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                            >
                                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                                {loading ? 'Generating...' : 'Generate New Identity'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 text-indigo-900 text-sm">
                        <h4 className="font-bold mb-2">Usage Note</h4>
                        <p className="opacity-80 leading-relaxed">
                            These identities are completely fictional and generated algorithmically. Do not use for illegal activities.
                        </p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="lg:col-span-2">
                    {!identity ? (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center animate-pulse">
                            <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6"></div>
                            <div className="h-8 bg-slate-100 rounded w-1/2 mx-auto mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-100 rounded w-full"></div>
                                <div className="h-4 bg-slate-100 rounded w-full"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm relative group">
                            
                            {/* JSON Copy Button */}
                            <button
                                onClick={handleCopyJson}
                                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all z-10"
                                title="Copy as JSON"
                            >
                                {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                            </button>

                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <img 
                                        src={identity.avatar} 
                                        alt="Avatar" 
                                        className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
                                    />
                                    <div className="text-center sm:text-left">
                                        <h2 className="text-3xl font-black mb-1">{identity.fullName}</h2>
                                        <div className="text-indigo-200 font-medium flex items-center justify-center sm:justify-start gap-2">
                                            <Briefcase size={16} />
                                            {identity.jobTitle}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 space-y-8">
                                
                                {/* Personal Info */}
                                <section>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Personal Details</h3>
                                    <div className="space-y-1">
                                        <InfoRow icon={Calendar} label="Date of Birth" value={identity.birthDate} />
                                        <InfoRow icon={UserCircle} label="Gender" value={<span className="capitalize">{identity.gender}</span>} />
                                        <InfoRow icon={Mail} label="Email Address" value={identity.email} />
                                        <InfoRow icon={Phone} label="Phone Number" value={identity.phone} />
                                    </div>
                                </section>

                                {/* Location */}
                                <section>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Location</h3>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <MapPin className="text-slate-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <div className="font-bold text-slate-800">{identity.address.street}</div>
                                            <div className="text-slate-600">{identity.address.city}, {identity.address.state} {identity.address.zipCode}</div>
                                            <div className="text-slate-500 text-sm mt-1">{identity.address.country}</div>
                                        </div>
                                    </div>
                                </section>

                                {/* Digital Footprint */}
                                <section>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Online Profile</h3>
                                    <div className="space-y-1">
                                         <InfoRow icon={Globe} label="Username" value={identity.username} mono />
                                         <InfoRow icon={UserCircle} label="UUID" value={<span className="text-xs">{identity.uuid}</span>} mono />
                                    </div>
                                </section>

                            </div>
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="fake-identity" categoryId="security" />
        </ToolPageLayout>
    );
}
