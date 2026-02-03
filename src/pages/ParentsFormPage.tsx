import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

const ParentsFormPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        parent_name: '', // Encargado (contact_name)
        phone: '', // Whatsapp (phone)
        child_name: '', // Nombre del hijo (school_name)
        child_age: '', // Edad (en mensaje)
        location: '', // Ubicación (en mensaje)
        referrer: '' // Referido (en mensaje)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mapping fields to existing 'school_inquiries' table to avoid schema changes
            // school_name -> child_name
            // contact_name -> parent_name

            const messagePayload = `
                ES UN PADRE/MADRE INTERESADO (Ajedrez para mi hijo/a)
                Edad del niño/a: ${formData.child_age}
                Ubicación: ${formData.location}
                Referido por: ${formData.referrer}
            `;

            const { error } = await supabase
                .from('school_inquiries')
                .insert([{
                    school_name: formData.child_name,
                    contact_name: formData.parent_name,
                    phone: formData.phone,
                    email: 'whatsapp-parent-contact@katupyry.com',
                    message: messagePayload
                }]);

            if (error) throw error;

            Swal.fire({
                title: '¡Solicitud Recibida!',
                text: 'Gracias por tu interés. Nos pondremos en contacto contigo muy pronto para coordinar.',
                icon: 'success',
                confirmButtonText: 'Genial',
                confirmButtonColor: '#F97316'
            });

            // Reset form
            setFormData({
                parent_name: '',
                phone: '',
                child_name: '',
                child_age: '',
                location: '',
                referrer: ''
            });

        } catch (error: any) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-body pt-32 pb-24 relative overflow-x-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>

            <main className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-[2.5rem] shadow-cartoon-lg border-4 border-white overflow-hidden animate-float" style={{ animationDuration: '8s' }}>
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 p-8 md:p-10 text-center relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                        <div className="absolute top-10 right-10 text-white/10">
                            <span className="material-symbols-outlined text-8xl transform rotate-12">family_star</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-4 relative z-10 drop-shadow-md">
                            ¡Inscribe a tu pequeño Gran Maestro!
                        </h1>
                        <p className="text-white/90 text-lg font-bold max-w-2xl mx-auto relative z-10 leading-relaxed">
                            Completa el formulario y da el primer paso para su aventura en el ajedrez.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-6 md:space-y-8 bg-white relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-orange-500 transition-colors">Tu Nombre (Padre/Madre)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">person</span>
                                    <input
                                        required
                                        type="text"
                                        name="parent_name"
                                        value={formData.parent_name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre completo"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-green-500 transition-colors">WhatsApp / Teléfono</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-green-600 transition-colors">call</span>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+595 9..."
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-orange-500 transition-colors">Nombre del Niño/a</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">face</span>
                                    <input
                                        required
                                        type="text"
                                        name="child_name"
                                        value={formData.child_name}
                                        onChange={handleChange}
                                        placeholder="Nombre de tu hijo/a"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-orange-500 transition-colors">Edad del Niño/a</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">cake</span>
                                    <input
                                        required
                                        type="text"
                                        name="child_age"
                                        value={formData.child_age}
                                        onChange={handleChange}
                                        placeholder="Ej. 8 años"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-orange-500 transition-colors">Ciudad / Barrio</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">location_on</span>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Ej. Asunción, Barrio Jara"
                                    className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-orange-500 transition-colors">¿Cómo nos conociste?</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">campaign</span>
                                <input
                                    type="text"
                                    name="referrer"
                                    value={formData.referrer}
                                    onChange={handleChange}
                                    placeholder="Facebook, Instagram, Amigo..."
                                    className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl py-4 rounded-2xl shadow-[0_4px_0_rgb(194,65,12)] hover:shadow-[0_2px_0_rgb(194,65,12)] hover:translate-y-[2px] transition-all border-b-4 border-orange-700 active:translate-y-[4px] active:shadow-none uppercase tracking-wide flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                {loading ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">rocket_launch</span>
                                        Solicitar Inscripción
                                    </>
                                )}
                            </button>
                            <p className="text-center text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">
                                ¡Plazas limitadas!
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ParentsFormPage;
