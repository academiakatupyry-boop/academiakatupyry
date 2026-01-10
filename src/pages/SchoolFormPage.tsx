import React from 'react';

const SchoolFormPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto pronto.");
    };

    return (
        <div className="min-h-screen bg-background-sky font-body pt-32 pb-24 relative overflow-x-hidden">
             {/* Background Pattern */}
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(#6dd5ed 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>

            <main className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-[2.5rem] shadow-cartoon-lg border-4 border-white overflow-hidden animate-float" style={{ animationDuration: '8s' }}>
                    <div className="bg-primary-island p-8 md:p-10 text-center relative overflow-hidden">
                         {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-adventure/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                        <div className="absolute top-10 right-10 text-white/10">
                            <span className="material-symbols-outlined text-8xl transform rotate-12">school</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-4 relative z-10 drop-shadow-md">
                            ¡Lleva Katupyry a tu Escuela!
                        </h1>
                        <p className="text-white/90 text-lg font-bold max-w-2xl mx-auto relative z-10 leading-relaxed">
                            Completa el formulario y ayuda a tus estudiantes a descubrir el mágico mundo del ajedrez gamificado.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-6 md:space-y-8 bg-white relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Nombre de la Escuela</label>
                                <div className="relative">
                                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">school</span>
                                    <input required type="text" placeholder="Ej. Escuela Primaria Nº 5" className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                             <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Tu Nombre Completo</label>
                                <div className="relative">
                                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">person</span>
                                    <input required type="text" placeholder="Ej. Prof. María González" className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Correo Institucional</label>
                                <div className="relative">
                                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">mail</span>
                                    <input required type="email" placeholder="nombre@escuela.edu" className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                             <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Teléfono de Contacto</label>
                                <div className="relative">
                                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">call</span>
                                    <input type="tel" placeholder="+54 11 ..." className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>
                        
                         <div className="space-y-3">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1">Tu Rol en la Institución</label>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Director', 'Docente', 'Coordinador', 'Otro'].map((role, idx) => (
                                    <label key={role} className="cursor-pointer relative">
                                        <input type="radio" name="role" className="peer sr-only" defaultChecked={idx === 0} />
                                        <div className="rounded-2xl border-2 border-gray-200 bg-background-light py-3 px-2 text-center font-bold text-gray-500 peer-checked:border-secondary-adventure peer-checked:bg-secondary-adventure/10 peer-checked:text-orange-900 transition-all hover:bg-gray-100 flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-secondary-adventure peer-checked:bg-secondary-adventure flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                            </div>
                                            {role}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Mensaje o Consulta (Opcional)</label>
                            <textarea rows={4} className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3 px-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400 resize-none" placeholder="Cuéntanos cuántos alumnos tienen, qué necesidades buscan cubrir..."></textarea>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="w-full bg-gradient-to-r from-secondary-adventure to-orange-500 text-white font-black text-xl py-4 rounded-2xl shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] transition-all border-b-4 border-orange-600 active:translate-y-[4px] active:shadow-none uppercase tracking-wide flex items-center justify-center gap-3 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">send</span>
                                Enviar Solicitud
                            </button>
                            <p className="text-center text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">
                                Nos pondremos en contacto en menos de 24hs
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SchoolFormPage;