import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
    return (
        <div className="font-body relative overflow-x-hidden">

            <main className="w-full pt-32 pb-24">
                <section className="island-section max-w-7xl mx-auto px-4 relative mb-24">
                    {/* Main Hero Card - "The Portal" Design */}
                    <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white/10 p-8 md:p-16 bg-cover bg-center group" style={{ backgroundImage: 'url("/fondogalaxiachess.svg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        {/* Dark Gradient Overlay - Inverted (From Right) */}
                        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-0"></div>

                        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10">

                            {/* Text Content - "Boom Brutal" Style */}
                            <div className="flex-1 text-center lg:text-left z-20 max-w-2xl">

                                {/* Badge - Moved up (3x more) */}
                                <div className="inline-flex -mt-20 mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <span className="text-yellow-400 font-black tracking-widest uppercase text-xs md:text-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">bolt</span>
                                        La aventura comienza aquí
                                    </span>
                                </div>

                                {/* Spacer to maintain layout distribution */}
                                <div className="h-48 md:h-64 w-full"></div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                    <Button to="/learn" variant="primary" icon="rocket_launch">
                                        Comenzar Misión
                                    </Button>
                                </div>
                            </div>

                            {/* Mascot / Visual - Cleaner, floaty */}
                            <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
                                <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] animate-float transition-transform duration-700 hover:scale-105">
                                    {/* Subtle Glow behind mascot, not messy blobs */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/30 rounded-full blur-[80px]"></div>

                                    <img
                                        alt="Rooky the Mascot"
                                        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                        src="/PersonajeSVG.svg"
                                    />
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

                {/* Footer Section - Image Based */}
                <footer className="w-full mt-32 mb-8 relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl mx-auto max-w-[1920px]">
                    {/* Gradient Overlay for smooth transition */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white via-white/50 to-transparent z-10 pointer-events-none"></div>

                    <img
                        src="/piedewebkatupyry.svg"
                        alt="Academia Katupyry Footer"
                        className="w-full h-auto object-cover relative z-0 scale-105"
                    />
                </footer>
            </main>
        </div>
    );
};

export default HomePage;