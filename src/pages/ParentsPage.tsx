import React from 'react';
import { Link } from 'react-router-dom';

const ParentsPage: React.FC = () => {
    return (
        <div className="text-dark-text font-body pb-0 pt-28">

            {/* Hero Section */}
            <div className="flex justify-center py-5 px-4 md:px-10 mb-12">
                <div className="flex flex-col gap-8 py-10 md:flex-row items-center max-w-[1100px]">
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-primary text-primary w-fit shadow-sm transform -rotate-1">
                            <span className="material-symbols-outlined text-sm filled">family_star</span>
                            <span className="text-xs font-bold uppercase tracking-wide font-display">Para padres y madres</span>
                        </div>
                        <h1 className="text-5xl font-display font-black leading-[1.1] tracking-tight text-slate-800 drop-shadow-sm">
                            Regala a tu hijo/a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                                el superpoder
                            </span> <br />
                            del ajedrez
                        </h1>
                        <p className="text-lg text-gray-600 font-bold max-w-md leading-relaxed">
                            Potencia su inteligencia, concentración y creatividad de la forma más divertida posible.
                        </p>
                        <Link to="/parents-form" className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-8 bg-primary text-white text-lg font-display font-bold leading-normal tracking-wide shadow-btn hover:translate-y-0.5 hover:shadow-btn-hover transition-all active:translate-y-1 active:shadow-none">
                            <span className="truncate">Quiero inscribir a mi hijo/a</span>
                        </Link>
                    </div>
                    {/* Hero Image */}
                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-card border-4 border-white dark:border-[#2a3441] flex-1 bg-gray-100 dark:bg-gray-800 relative group transform rotate-1 hover:rotate-0 transition-all duration-500" style={{ backgroundImage: 'url("/parents_hero.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                </div>
            </div>

            {/* Benefits Section - Grid Layout */}
            <div className="bg-white relative py-20 px-4 md:px-10 border-t-4 border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-black uppercase tracking-widest text-sm mb-2 block">Beneficios para tu hijo/a</span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-text-dark-fun">
                            Prepáralo para el futuro <br />mientras se divierte
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Benefit 1 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-blue-100 text-blue-600">
                                <span className="material-symbols-outlined text-3xl filled">school</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Mejores Notas</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Estudios demuestran que el ajedrez mejora el rendimiento en matemáticas y lectura.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-green-100 text-green-600">
                                <span className="material-symbols-outlined text-3xl filled">psychology</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Concentración</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Aprenderá a enfocarse en una tarea por periodos prolongados sin distracciones.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-amber-100 text-amber-600">
                                <span className="material-symbols-outlined text-3xl filled">emoji_events</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Confianza</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Ganar partidas y resolver problemas aumenta su autoestima y seguridad en sí mismo.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-purple-100 text-purple-600">
                                <span className="material-symbols-outlined text-3xl filled">lightbulb</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Creatividad</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Estimula la búsqueda de soluciones originales ante situaciones nuevas y desafiantes.
                            </p>
                        </div>

                        {/* Benefit 5 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-cyan-100 text-cyan-600">
                                <span className="material-symbols-outlined text-3xl filled">extension</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Lógica</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Desarrolla el pensamiento estructurado y la comprensión de causa y efecto.
                            </p>
                        </div>

                        {/* Benefit 6 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-pink-100 text-pink-600">
                                <span className="material-symbols-outlined text-3xl filled">memory</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Memoria</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Mejora significativamente la retención de patrones visuales y secuencias.
                            </p>
                        </div>

                        {/* Benefit 7 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-teal-100 text-teal-600">
                                <span className="material-symbols-outlined text-3xl filled">hourglass_bottom</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Paciencia</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Enseña el valor de esperar el momento adecuado antes de actuar.
                            </p>
                        </div>

                        {/* Benefit 8 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-orange-100 text-orange-600">
                                <span className="material-symbols-outlined text-3xl filled">balance</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Decisiones</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Entrena la evaluación de riesgos y recompensas bajo presión de tiempo.
                            </p>
                        </div>

                        {/* Benefit 9 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-red-100 text-red-600">
                                <span className="material-symbols-outlined text-3xl filled">security</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Resiliencia</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Aprenden a manejar la derrota y a ver los errores como oportunidades.
                            </p>
                        </div>

                        {/* Benefit 10 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-indigo-100 text-indigo-600">
                                <span className="material-symbols-outlined text-3xl filled">map</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Planificación</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Fomenta el establecimiento de objetivos y estrategias a largo plazo.
                            </p>
                        </div>

                        {/* Benefit 11 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-yellow-100 text-yellow-600">
                                <span className="material-symbols-outlined text-3xl filled">handshake</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Deportividad</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Inculca el respeto por el oponente y la aceptación de las reglas.
                            </p>
                        </div>

                        {/* Benefit 12 */}
                        <div className="flex flex-col items-start p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="p-3 mb-4 rounded-2xl bg-slate-100 text-slate-600">
                                <span className="material-symbols-outlined text-3xl filled">fitness_center</span>
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-800 mb-2">Disciplina</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                La práctica constante es el único camino hacia la verdadera maestría.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ParentsPage;
