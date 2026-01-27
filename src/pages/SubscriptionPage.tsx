import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();

    const plans = [
        {
            id: 'peon',
            name: 'Peón',
            role: 'Principiante',
            price: '90.000 Gs.',
            features: [
                'Acceso a Fundamentos',
                'Reglas básicas de Ajedrez',
                'Ejercicios prácticos de nivel 1',
                'Comunidad de alumnos'
            ],
            icon: 'chess_pawn', // Material Symbol
            color: 'from-slate-400 to-slate-600',
            buttonVariant: 'secondary'
        },
        {
            id: 'torre',
            name: 'Torre',
            role: 'Competitivo',
            price: '150.000 Gs.',
            features: [
                'Todo lo de Peón',
                'Estrategias de apertura',
                'Acceso a Torneos Mensuales',
                'Análisis de partidas básicas',
                'Certificado de nivel'
            ],
            icon: 'chess_rook', // Material Symbol
            color: 'from-blue-500 to-indigo-600',
            highlight: true,
            buttonVariant: 'primary'
        },
        {
            id: 'rey',
            name: 'Rey',
            role: 'Alto Rendimiento',
            price: '250.000 Gs.',
            features: [
                'Todo lo de Torre',
                'Coaching personalizado (1h/mes)',
                'Análisis profundo de partidas',
                'Material exclusivo de GMs',
                'Soporte prioritario'
            ],
            icon: 'chess_king', // Material Symbol
            color: 'from-amber-400 to-orange-600',
            buttonVariant: 'secondary'
        }
    ];

    const handleSubscribe = (planName: string, price: string) => {
        // MVP: Redirect to WhatsApp
        const phoneNumber = '595981123456'; // Replace with actual number if available, otherwise placeholder
        const message = `Hola! Me interesa suscribirme al plan ${planName} de la Academia Katupyry por ${price}. ¿Me podrían pasar los datos para el pago?`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 px-4 mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined absolute top-10 left-10 text-9xl">chess</span>
                    <span className="material-symbols-outlined absolute bottom-10 right-10 text-9xl">strategy</span>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Eleva tu Nivel de Ajedrez
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Únete a la academia y desbloquea todo tu potencial con nuestros planes de formación estructurados.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`
                relative bg-white rounded-3xl overflow-hidden transition-all duration-300
                ${plan.highlight
                                    ? 'shadow-2xl scale-105 border-2 border-indigo-500 z-10'
                                    : 'shadow-xl hover:scale-105 border border-slate-100'
                                }
              `}
                        >
                            {plan.highlight && (
                                <div className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2">
                                    Recomendado
                                </div>
                            )}

                            <div className={`p-8 bg-gradient-to-br ${plan.color} text-white text-center`}>
                                <span className="material-symbols-outlined text-6xl mb-4 drop-shadow-md">
                                    {plan.icon}
                                </span>
                                <h3 className="text-2xl font-black uppercase tracking-wider">{plan.name}</h3>
                                <p className="text-white/90 font-medium">{plan.role}</p>
                            </div>

                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <span className="text-4xl font-black text-slate-800">{plan.price}</span>
                                    <span className="text-slate-500 text-sm block mt-1">/ mes</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                                            <span className="material-symbols-outlined text-green-500 text-xl font-bold">check</span>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.name, plan.price)}
                                    className={`
                    w-full py-4 rounded-xl font-black tracking-wide transition-all duration-300 shadow-lg
                    ${plan.buttonVariant === 'primary'
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                                        }
                  `}
                                >
                                    ELEGIR PLAN
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ / Trust Info */}
            <div className="max-w-4xl mx-auto mt-20 px-4 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">Preguntas Frecuentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2">¿Cómo funcionan los pagos?</h4>
                        <p className="text-slate-600 text-sm">Por el momento aceptamos transferencias bancarias y giros. Al seleccionar un plan, te contactaremos por WhatsApp para coordinar.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2">¿Puedo cancelar cuando quiera?</h4>
                        <p className="text-slate-600 text-sm">Sí, la suscripción es mensual y puedes cancelarla o pausarla en cualquier momento sin penalizaciones.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
