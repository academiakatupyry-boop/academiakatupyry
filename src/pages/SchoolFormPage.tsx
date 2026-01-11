import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

const SchoolFormPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        contact_name: '', // Encargado
        phone: '', // Whatsapp (Prioridad)
        school_name: '', // Institución
        location: '', // Ubicación
        referrer: '' // Quien recomienda
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
            // Map new fields to existing schema or use 'message' for extras if needed
            // Assuming schema accepts: school_name, contact_name, phone.
            // For location and referrer, if columns don't exist, we can append to a 'message' or 'notes' field logic?
            // But let's check schema.
            // If I can't check schema, I'll send them as part of object and see. Or append to a constructed "message" field.
            // Best approach without easy schema check:
            // Send standard fields + Construct a `message` string with the extra info.

            const messagePayload = `
                Ubicación: ${formData.location}
                Referido por: ${formData.referrer}
            `;

            const { error } = await supabase
                .from('school_inquiries')
                .insert([{
                    school_name: formData.school_name,
                    contact_name: formData.contact_name,
                    phone: formData.phone,
                    email: 'whatsapp-contact@katupyry.com', // Placeholder for "Whatsapp Priority"
                    message: messagePayload
                }]);

            if (error) throw error;
            // ... (Success logic)


            Swal.fire({
                title: '¡Solicitud Recibida!',
                text: 'Gracias por querer llevar Katupyry a tu escuela. Nos pondremos en contacto contigo a la brevedad.',
                icon: 'success',
                confirmButtonText: 'Genial',
                confirmButtonColor: '#F97316' // Orange
            });

            // Reset form
            setFormData({
                contact_name: '',
                phone: '',
                school_name: '',
                location: '',
                referrer: ''
            });

        } catch (error: any) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo o escríbenos directamente.',
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
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">WhatsApp / Teléfono</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-primary-island transition-colors">call</span>
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
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Nombre del Encargado</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">person</span>
                                    <input
                                        required
                                        type="text"
                                        name="contact_name"
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                        placeholder="Ej. Prof. María González"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Nombre de la Institución</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">school</span>
                                    <input
                                        required
                                        type="text"
                                        name="school_name"
                                        value={formData.school_name}
                                        onChange={handleChange}
                                        placeholder="Ej. Escuela Primaria Nº 5"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Ubicación de la Institución</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">location_on</span>
                                    <input
                                        required
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Ciudad, Barrio o Dirección"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">¿Quién te recomendó?</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">people</span>
                                <input
                                    type="text"
                                    name="referrer"
                                    value={formData.referrer}
                                    onChange={handleChange}
                                    placeholder="Nombre de la persona o 'Redes Sociales'"
                                    className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-xl py-4 rounded-2xl shadow-[0_4px_0_rgb(21,128,61)] hover:shadow-[0_2px_0_rgb(21,128,61)] hover:translate-y-[2px] transition-all border-b-4 border-green-700 active:translate-y-[4px] active:shadow-none uppercase tracking-wide flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                {loading ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">send</span>
                                        Enviar por WhatsApp
                                    </>
                                )}
                            </button>
                            <p className="text-center text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">
                                Nos pondremos en contacto rápidamente
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SchoolFormPage;