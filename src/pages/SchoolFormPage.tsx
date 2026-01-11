import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

const SchoolFormPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        school_name: '',
        contact_name: '',
        email: '',
        phone: '',
        role: 'Director',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role: string) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('school_inquiries')
                .insert([formData]);

            if (error) throw error;

            Swal.fire({
                title: '¡Solicitud Recibida!',
                text: 'Gracias por querer llevar Katupyry a tu escuela. Nos pondremos en contacto contigo a la brevedad.',
                icon: 'success',
                confirmButtonText: 'Genial',
                confirmButtonColor: '#F97316' // Orange
            });

            // Reset form
            setFormData({
                school_name: '',
                contact_name: '',
                email: '',
                phone: '',
                role: 'Director',
                message: ''
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
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Nombre de la Escuela</label>
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
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Tu Nombre Completo</label>
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
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Correo Institucional</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">mail</span>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="nombre@escuela.edu"
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Teléfono de Contacto</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-island transition-colors">call</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+54 11 ..."
                                        className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1">Tu Rol en la Institución</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Director', 'Docente', 'Coordinador', 'Otro'].map((roleItem, idx) => (
                                    <label key={roleItem} className="cursor-pointer relative">
                                        <input
                                            type="radio"
                                            name="role"
                                            className="peer sr-only"
                                            checked={formData.role === roleItem}
                                            onChange={() => handleRoleChange(roleItem)}
                                        />
                                        <div className="rounded-2xl border-2 border-gray-200 bg-background-light py-3 px-2 text-center font-bold text-gray-500 peer-checked:border-secondary-adventure peer-checked:bg-secondary-adventure/10 peer-checked:text-orange-900 transition-all hover:bg-gray-100 flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-secondary-adventure peer-checked:bg-secondary-adventure flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                            </div>
                                            {roleItem}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-text-dark-fun font-black text-sm uppercase tracking-wider ml-1 group-focus-within:text-primary-island transition-colors">Mensaje o Consulta (Opcional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3 px-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all placeholder:text-gray-400 resize-none"
                                placeholder="Cuéntanos cuántos alumnos tienen, qué necesidades buscan cubrir..."
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-secondary-adventure to-orange-500 text-white font-black text-xl py-4 rounded-2xl shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] transition-all border-b-4 border-orange-600 active:translate-y-[4px] active:shadow-none uppercase tracking-wide flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                {loading ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">send</span>
                                        Enviar Solicitud
                                    </>
                                )}
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