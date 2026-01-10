import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
    return (
        <div className="font-body bg-background-sky relative min-h-screen overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(#6dd5ed 1px, transparent 1px)', backgroundSize: '40px 40px' }}>

            <main className="w-full pt-32 pb-24">
                <section className="island-section max-w-7xl mx-auto px-4 relative mb-24">
                    {/* Main Hero Card */}
                    <div className="relative overflow-hidden rounded-[3rem] shadow-floating border-[6px] border-white/20 p-8 md:p-12 lg:p-16 bg-cover bg-center" style={{ backgroundImage: 'url("/galaxiainicio.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                        {/* Dynamic Background Elements (The "Life") */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                        {/* Floating Blobs */}
                        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-fuchsia-500 rounded-full blur-[100px] opacity-40 animate-pulse-slow"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-blue-500 rounded-full blur-[80px] opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                        {/* Magic Sparkles (Decorative) */}
                        <div className="absolute top-10 left-10 text-yellow-300 animate-bounce-slow opacity-80" style={{ animationDuration: '3s' }}>
                            <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                        </div>
                        <div className="absolute bottom-20 right-1/2 text-cyan-300 animate-bounce-slow opacity-60" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                            <span className="material-symbols-outlined text-2xl">star</span>
                        </div>
                        <div className="absolute top-1/3 right-10 text-pink-300 animate-pulse opacity-70">
                            <span className="material-symbols-outlined text-3xl">flare</span>
                        </div>

                        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 relative z-10">

                            {/* Text Content */}
                            <div className="flex-1 text-center lg:text-left z-20">
                                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
                                    <span className="text-yellow-300 font-black tracking-wider uppercase text-xs md:text-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm filled">bolt</span>
                                        ¡La aventura comienza aquí!
                                    </span>
                                </div>

                                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight mb-6 leading-[1.1] drop-shadow-xl text-white">
                                    Academia <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 relative inline-block transform hover:scale-105 transition-transform duration-300 filter drop-shadow-sm cursor-default">
                                        Katupyry
                                    </span>
                                </h1>

                                <p className="text-xl md:text-2xl text-indigo-100 mb-10 font-bold max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                                    Transforma tu mente. <span className="text-white underline decoration-wavy decoration-yellow-400 decoration-2">Juega</span>, aprende y conquista el tablero.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                    <Button to="/map" variant="primary" icon="map">
                                        Aprender ya
                                    </Button>

                                    <Button to="/arena" variant="glass" icon="swords">
                                        Ir a Torneos
                                    </Button>
                                </div>
                            </div>

                            {/* Mascot / Visual */}
                            <div className="flex-1 relative w-full flex justify-center lg:justify-end">
                                <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] animate-float">
                                    {/* Glowing Effect behind Mascot */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-400/40 to-purple-500/0 rounded-full blur-3xl animate-pulse-slow"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/20 rounded-full blur-2xl"></div>

                                    <img
                                        alt="Rooky the Mascot"
                                        className="relative z-10 w-full h-full object-contain transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl filter saturate-[1.1]"
                                        src="/torre_personaje.png"
                                    />

                                    {/* Speech Bubble (Optional fun detail) */}
                                    <div className="absolute -top-4 -right-4 bg-white text-text-dark-fun text-sm font-black px-4 py-2 rounded-2xl rounded-bl-none shadow-cartoon transform rotate-6 animate-bounce" style={{ animationDuration: '3s' }}>
                                        ¡Vamos!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        title="Misión"
                        description="Formar personas a través del ajedrez, ofreciendo una enseñanza divertida, cercana y profesional que desarrolle el pensamiento estratégico, la concentración y la creatividad en niños, jóvenes e instituciones, convirtiendo el ajedrez en un verdadero gimnasio mental para la vida."
                        icon="rocket_launch"
                        colorClass="bg-accent-path"
                        rotateClass="rotate-3"
                    />

                    <Card
                        title="Visión"
                        description="Ser la academia de ajedrez educativa referente en Paraguay y Latinoamérica, reconocida por transformar el aprendezaje del ajedrez en una experiencia moderna, inclusiva y formativa que inspire a nuevas generaciones a pensar mejor, decidir mejor y crecer a través del juego."
                        icon="visibility"
                        colorClass="bg-secondary-adventure"
                        rotateClass="-rotate-2"
                    />

                    <Card
                        title="Valor Educativo"
                        description="El ajedrez educa la mente en el rigor del pensamiento y el carácter en la disciplina emocional, preparando al estudiante no solo para la escuela, sino para la vida."
                        icon="school"
                        colorClass="bg-accent-ocean"
                        rotateClass="rotate-6"
                    />
                </section>
            </main>
        </div>
    );
};

export default HomePage;