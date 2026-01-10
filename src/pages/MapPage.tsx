import React from 'react';
import { Link } from 'react-router-dom';

const MapPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark min-h-screen bg-fixed" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
            
            <div className="w-full max-w-[1200px] px-4 md:px-10 lg:px-40 py-8 mx-auto pb-24 pt-32">
                <div className="flex flex-col md:flex-row gap-8 mb-16 items-center bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-comic border-2 border-slate-100 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 size-40 bg-accent/10 rounded-full blur-3xl"></div>
                    <div className="flex flex-col flex-1 w-full text-center md:text-left z-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-primary-dark dark:text-white drop-shadow-sm">¡Bienvenido, Capitán Alex!</h1>
                        <p className="text-text-muted-light dark:text-text-muted-dark mb-6 flex items-center justify-center md:justify-start gap-2 font-bold">
                            Rango: Caballero Comandante
                        </p>
                        <div className="w-full max-w-lg bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider text-slate-500 dark:text-slate-300">
                                <span>Progreso del Nivel</span>
                                <span>65%</span>
                            </div>
                            <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border-2 border-white dark:border-slate-600 shadow-inner">
                                <div className="h-full bg-gradient-to-r from-adventure-green to-primary rounded-full relative" style={{width: "65%"}}></div>
                            </div>
                        </div>
                    </div>
                    <Link to="/board" className="hidden lg:flex shrink-0 h-16 px-8 bg-primary hover:bg-primary-dark transition-all text-white text-lg font-black rounded-2xl items-center gap-3 shadow-comic-primary hover:translate-y-1 hover:shadow-none active:translate-y-1 z-10">
                        <span className="material-symbols-outlined text-[32px]">play_circle</span>
                        Continuar<br/>Aventura
                    </Link>
                </div>

                <div className="relative flex flex-col px-4 pb-12 pl-6 md:pl-10">
                    <div className="absolute left-[44px] md:left-[60px] top-6 bottom-0 w-1.5 map-path-dashed z-0"></div>
                    
                    {/* Zone 1 - Linked to Coordinate Training */}
                    <Link to="/learn/coordinates" className="relative z-10 flex gap-6 mb-16 group cursor-pointer opacity-90 hover:opacity-100 transition-all hover:scale-[1.01]">
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="size-16 md:size-20 rounded-2xl bg-adventure-green text-white flex items-center justify-center border-4 border-white dark:border-background-dark shadow-comic transform rotate-3 group-hover:rotate-6 transition-transform">
                                <span className="material-symbols-outlined text-[36px]">check_circle</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border-b-4 border-r-4 border-slate-100 dark:border-slate-800 group-hover:border-adventure-green/50 transition-colors relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-adventure-green text-white text-[10px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-wider">Entrenar Ahora</div>
                            <h4 className="text-xl font-bold text-text-main-light dark:text-text-main-dark group-hover:text-adventure-green transition-colors">Zona 1: Playa de los Fundamentos</h4>
                            <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Domina las coordenadas y el tablero.</p>
                        </div>
                    </Link>

                    {/* Zone 2 (Current) */}
                    <div className="relative z-10 flex gap-6 mb-16">
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
                                <div className="size-20 md:size-24 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 text-primary flex items-center justify-center border-4 border-primary shadow-comic-primary float-animate">
                                    <span className="material-symbols-outlined text-[40px] drop-shadow-sm">swords</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-surface-light dark:bg-surface-dark p-0 rounded-3xl shadow-comic border-2 border-primary overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
                            <div className="h-40 w-full bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiyg8Sr5P0rUsi5vnmRu7kzyMDBocjBhWBkAwEBCo-udZohZS_zSP5CcuDVzzePBWo9Ls2060gguKAdAvTxBXYv57rxyjVpGjvqpWSwsZZND63BWerRNKuhm_oHPBJ8F4MFfsrehIHW4V8hTgjELmaR6qu-6KKTMhk21N6XFaailO9WZAWBEFaN64vEMDTB1pLwmFHUbayJsyN-6cNY8uDG_EhACFZB8PZ3auycqHMfnAtmNfLk8VAQe9_DsKXDrn5Q9XsW6ZpvM0R")'}}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-5 text-white">
                                    <div className="inline-block bg-accent text-amber-950 text-xs font-black px-2 py-0.5 rounded mb-1 shadow-sm">MISIÓN ACTUAL</div>
                                    <h4 className="text-2xl font-black drop-shadow-md">Zona 2: Selva Táctica</h4>
                                </div>
                            </div>
                            <div className="p-6 relative bg-surface-light dark:bg-surface-dark">
                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Recompensa</span>
                                        <span className="text-primary font-black text-lg flex items-center gap-1"><span className="material-symbols-outlined text-base">bolt</span>+250 XP</span>
                                    </div>
                                    <Link to="/board" className="bg-primary hover:bg-primary-dark text-white font-black py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-comic-primary active:shadow-none active:translate-y-1">
                                        ¡Jugar Ahora!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;