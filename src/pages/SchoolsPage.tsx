import React from 'react';
import { Link } from 'react-router-dom';

const SchoolsPage: React.FC = () => {
    return (
        <div className="text-dark-text font-body pb-0 pt-28">

            {/* Hero Section */}
            <div className="flex justify-center py-5 px-4 md:px-10 mb-12">
                <div className="flex flex-col gap-8 py-10 md:flex-row items-center max-w-[1100px]">
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-primary text-primary w-fit shadow-sm transform -rotate-1">
                            <span className="material-symbols-outlined text-sm filled">school</span>
                            <span className="text-xs font-bold uppercase tracking-wide font-display">Para educadores y escuelas</span>
                        </div>
                        <h1 className="text-5xl font-display font-black leading-[1.1] tracking-tight text-slate-800 drop-shadow-sm">
                            Lleva la <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                                aventura
                            </span> <br />
                            del ajedrez a tu escuela
                        </h1>
                        <p className="text-lg text-gray-600 font-bold max-w-md leading-relaxed">
                            Transformamos el aula en un tablero donde cada movimiento enseña a pensar, decidir y respetar.
                        </p>
                        <Link to="/school-form" className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-8 bg-primary text-white text-lg font-display font-bold leading-normal tracking-wide shadow-btn hover:translate-y-0.5 hover:shadow-btn-hover transition-all active:translate-y-1 active:shadow-none">
                            <span className="truncate">Quiero Katupyry en mi escuela</span>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-card border-4 border-white dark:border-[#2a3441] flex-1 bg-gray-100 dark:bg-gray-800 relative group transform rotate-1 hover:rotate-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVIy_sKsA_iF8ly-Cy3mDgyEpfQ4hxPvmH7oD9bajfY1Rn2U6UsLXA8h2L6muxyW8GgPafcr2wUTa8IkTMoJAFTee7Fqhwv8Md3tCggMC0EiYg6lU6kieSIZVAS4-vLlapEz6ilq2tcgxYKY_IJj73u3Cu01EXnfoyMWVIHlvXA9mGC3jLDYIlOq6B1iQBHm36-jwnGA2Oi2YKGh2ULENFCefbWWFQuFwPRxNv4TkiCgup6M3lIvZXof7Eb_gwhdveCIdfzDowM6cd")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                </div>
            </div>

            {/* Benefits Section - Grid Layout */}
            <div className="bg-white relative py-20 px-4 md:px-10 border-t-4 border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-black uppercase tracking-widest text-sm mb-2 block">Por qué elegirnos</span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-text-dark-fun">
                            Más que un juego, <br />una herramienta pedagógica
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Benefit 1 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-blue-100 text-blue-600">
                                <span className="material-symbols-outlined text-3xl filled">psychology</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Desarrollo Cognitivo</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Mejora la memoria, la concentración y el pensamiento lógico-matemático de forma lúdica y natural.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-green-100 text-green-600">
                                <span className="material-symbols-outlined text-3xl filled">diversity_3</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Habilidades Sociales</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Fomenta el respeto por el oponente, la paciencia y la aceptación de las reglas y consecuencias.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-amber-100 text-amber-600">
                                <span className="material-symbols-outlined text-3xl filled">balance</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Toma de Decisiones</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Entrena a los estudiantes para analizar situaciones bajo presión y tomar decisiones estratégicas.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-purple-100 text-purple-600">
                                <span className="material-symbols-outlined text-3xl filled">manage_search</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Pensamiento Crítico</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Enseña a evaluar objetivamente cada situación antes de actuar, analizando pros y contras.
                            </p>
                        </div>

                        {/* Benefit 5 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-red-100 text-red-500">
                                <span className="material-symbols-outlined text-3xl filled">restart_alt</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Resiliencia</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Ayuda a entender que perder es parte del aprendizaje, convirtiendo los errores en lecciones valiosas.
                            </p>
                        </div>

                        {/* Benefit 6 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-indigo-100 text-indigo-600">
                                <span className="material-symbols-outlined text-3xl filled">visibility</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Visualización</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Ejercita la capacidad de "ver" jugadas en el futuro, fomentando la imaginación espacial.
                            </p>
                        </div>

                        {/* Benefit 7 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-teal-100 text-teal-600">
                                <span className="material-symbols-outlined text-3xl filled">hourglass_empty</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Paciencia</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Entrena la capacidad de esperar el momento oportuno, reduciendo la impulsividad.
                            </p>
                        </div>

                        {/* Benefit 8 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-orange-100 text-orange-600">
                                <span className="material-symbols-outlined text-3xl filled">flag</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Estrategia</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Fomenta la creación de planes a largo plazo, enseñando que los logros requieren pasos coordinados.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default SchoolsPage;