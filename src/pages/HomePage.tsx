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

                        {/* Dark Gradient Overlay for better text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>

                        <div className="relative z-10 w-full flex justify-center items-center py-4 md:py-8">
                            <div className="relative w-full max-w-6xl group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                                <img
                                    src="/tarjeta principal.svg"
                                    alt="Academia Katupyry"
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                />

                                {/* Absolute Button positioned to the left of the character */}
                                <div className="absolute top-[60%] left-[8%] sm:left-[12%] md:left-[15%] transform -translate-y-1/2 z-20 scale-90 sm:scale-100 md:scale-110 origin-left">
                                    <Button to="/learn" variant="primary" icon="rocket_launch">
                                        Comenzar Misión
                                    </Button>
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