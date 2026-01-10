import React from 'react';
import { Link } from 'react-router-dom';

const tournaments = [
    {
        id: 1,
        title: "Gran Torneo de Rápidas",
        type: "Rapid 10+5",
        price: "70.000 Gs",
        date: "Sáb, 16:00 hs",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIy_sKsA_iF8ly-Cy3mDgyEpfQ4hxPvmH7oD9bajfY1Rn2U6UsLXA8h2L6muxyW8GgPafcr2wUTa8IkTMoJAFTee7Fqhwv8Md3tCggMC0EiYg6lU6kieSIZVAS4-vLlapEz6ilq2tcgxYKY_IJj73u3Cu01EXnfoyMWVIHlvXA9mGC3jLDYIlOq6B1iQBHm36-jwnGA2Oi2YKGh2ULENFCefbWWFQuFwPRxNv4TkiCgup6M3lIvZXof7Eb_gwhdveCIdfzDowM6cd", // Volcano/Fire theme
        gradient: "from-orange-600 to-red-600",
        icon: "local_fire_department",
        status: "open"
    },
    {
        id: 2,
        title: "Blitz de la Jungla",
        type: "Blitz 3+2",
        price: "50.000 Gs",
        date: "Dom, 10:00 hs",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA1tynS2nR0r_BxID2YjQyXkMYYKO0gQ8GuRtmVsntKEOIwPcuyUSHIARp_ZLtxuoRfpSUtHUAQBAOsEeXgOCMb8Kks8skixeytFCYmzAmtel1Y9VzXUnQEoUgUi9YxCZVMOwye_lxrE52S4DZ0mi_sj_NvplT0JiGIdO7qHBN7wUPWQrz3txLpYHB9iYoZ8U4751yeNYkQzJH86GXvFPvRT4N-bT2S735OlfZtWszezl6aBS8YZU84XcBrUVlqMbj_qY1wT3rDh7R", // Jungle theme
        gradient: "from-green-600 to-emerald-700",
        icon: "forest",
        status: "open"
    },
    {
        id: 3,
        title: "Maestros del Océano",
        type: "Clásico 60+30",
        price: "100.000 Gs",
        date: "Próx. Sábado",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYvkyfd-pXoWdIk8w8Rzw0X4yXiefSolHqC_6Oenx2RJROC_U-zPE1UKbwJhUx4wez6dqwJ5hfB5mUhxQ6oFFR3AH0vZxjzmJSHugCbm4ZekXH7BkgWuv6wpHvhSY3VsMdHKnzgcwM7mMRuzIa100zp-Qg-1nvticFw122hyCh1ZIKzyQ60inNMOCqqGthGJXL-j8a3kcSHRveH_Rkfn-GsPymEbJt1JOT0xhgUVd-sXVaXU9GuedEdUyxzv0Ku1peSQDz3I0K5KD", // Water theme
        gradient: "from-blue-500 to-cyan-600",
        icon: "waves",
        status: "open"
    },
    {
        id: 4,
        title: "Copa Real",
        type: "Rapid 15+10",
        price: "120.000 Gs",
        date: "25 de Noviembre",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEK1c84oG101Vxf9RDaqNYO4uhftFNEtKc211p1tTxsL89uZ5cUKIOAHLsxBHetzYrUfWT5egNgfNAHVwDdNDeTQXookmRAP3bv4_fFtISKHbDs5cykiDJT0ztsZ9jQr-lc5lFMayqFPYlF97gwYQe05D9BE-IMFZizx_MFokg4GoVGHWmbi2R1DRrIm7209XxXlkfNBUjYj_qjlU0UYR88hD9KOGQyeOdzUA5j6GHaAUZDcpG01A8vTmFgiiUb20PT-QUjXDv98if", // Gold/Castle theme
        gradient: "from-yellow-500 to-amber-600",
        icon: "emoji_events",
        status: "open"
    }
];

const ArenaPage: React.FC = () => {
    return (
        <div className="bg-island-bg text-island-text min-h-screen pb-24 font-sans pt-28" style={{backgroundImage: 'radial-gradient(#F5E6D3 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
            
            <main className="flex flex-col">
                <section className="relative px-4 sm:px-10 lg:px-40 py-8 lg:py-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-cover bg-center shadow-card group border-4 border-white" style={{backgroundImage: 'linear-gradient(rgba(74, 59, 50, 0.4) 0%, rgba(74, 59, 50, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9dDS_3pGF_ihpiBA4gMEZn_Di4Csivi7yccejS-qiuBchXutH7A6WMATqrOomT-ZKrD9bTqpo0Fh9yPM5rLvUMEFBkFulneMpZZ-7yWJJvqNQARB4M5A_9kU1YD9RNJpyc-B5uTXO_TBSR1ljjjE1ZWj_fH6vB1OKSoD2-D8RIcgu1ON97e4yLVZvtrbC7Wlaih6hsF1xEOe0HM7v6LVL2c-ZZD061DKluAc8On2CLnUoivX41mElUVE1lYPSVaKVCCClNTzc2ont")'}}>
                                <div className="relative z-10 flex min-h-[250px] md:min-h-[300px] flex-col items-center justify-center gap-5 p-8 text-center">
                                <span className="material-symbols-outlined text-yellow-300 text-6xl drop-shadow-md animate-bounce-slow">emoji_events</span>
                                <h1 className="text-white text-5xl sm:text-6xl font-black leading-tight tracking-tight drop-shadow-lg font-display">
                                    Arena de Torneos
                                </h1>
                                <p className="text-white/90 text-lg font-bold bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                                    Demuestra tu valor, gana experiencia y premios
                                </p>
                                </div>
                        </div>
                    </div>
                </section>

                <section className="flex-1 px-4 sm:px-10 lg:px-40">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-3xl font-black font-display text-text-dark-fun mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-island">swords</span>
                            Torneos Disponibles
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {tournaments.map((tournament) => (
                                <div key={tournament.id} className="bg-white rounded-[2rem] shadow-card border-4 border-white overflow-hidden hover:translate-y-[-4px] hover:shadow-card-hover transition-all duration-300 flex flex-col group relative">
                                    
                                    {/* Image Header */}
                                    <div className="h-40 md:h-48 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: `url('${tournament.image}')`}}></div>
                                        <div className={`absolute inset-0 bg-gradient-to-t ${tournament.gradient} opacity-80 mix-blend-multiply`}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        
                                        <div className="absolute bottom-4 left-6 text-white z-10">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="material-symbols-outlined text-lg">{tournament.icon}</span>
                                                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{tournament.type}</span>
                                            </div>
                                            <h3 className="font-black text-2xl md:text-3xl leading-none drop-shadow-md font-display">{tournament.title}</h3>
                                        </div>

                                        <div className="absolute top-4 right-4 bg-white text-text-dark-fun font-black px-3 py-1 rounded-xl text-sm shadow-md flex items-center gap-1 z-10">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Abierto
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 flex-1 flex flex-col bg-white relative">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</span>
                                                <span className="font-bold text-text-dark-fun flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-lg text-primary-island">calendar_today</span>
                                                    {tournament.date}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inscripción</span>
                                                <div className="font-black text-xl text-secondary-adventure drop-shadow-sm stroke-black">
                                                    {tournament.price}
                                                </div>
                                            </div>
                                        </div>

                                        <button className="mt-auto w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-4 rounded-xl transition-all shadow-btn hover:shadow-btn-hover border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 text-lg uppercase tracking-wide group-hover:bg-primary-island group-hover:text-white group-hover:border-primary-dark">
                                            <span className="material-symbols-outlined filled group-hover:animate-wiggle">handshake</span>
                                            Participar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ArenaPage;