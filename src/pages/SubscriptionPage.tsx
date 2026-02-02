import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

    const plans = [
        {
            id: 'peon',
            name: 'Peón',
            role: 'Principiante',
            price: billingCycle === 'monthly' ? '90.000' : '250.000',
            period: billingCycle === 'monthly' ? '/ mes' : '/ trimestre',
            features: [
                'Acceso a Fundamentos',
                'Reglas básicas y movimientos',
                '10 Ejercicios diarios',
                'Comunidad de alumnos'
            ],
            icon: 'chess_pawn',
            color: 'bg-slate-500',
            lightColor: 'bg-slate-100',
            borderColor: 'border-slate-200',
            btnColor: 'bg-slate-500',
            btnShadow: 'border-slate-700',
            textColor: 'text-slate-500'
        },
        {
            id: 'torre',
            name: 'Torre',
            role: 'Competitivo',
            price: billingCycle === 'monthly' ? '150.000' : '400.000',
            period: billingCycle === 'monthly' ? '/ mes' : '/ trimestre',
            features: [
                'Todo lo de Peón',
                'Estrategias de apertura',
                'Torneos Mensuales',
                'Puzzles Ilimitados',
                'Certificado de nivel'
            ],
            icon: 'chess_rook',
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            btnColor: 'bg-blue-500',
            btnShadow: 'border-blue-700',
            textColor: 'text-blue-500',
            highlight: true
        },
        {
            id: 'rey',
            name: 'Rey',
            role: 'Elite',
            price: billingCycle === 'monthly' ? '250.000' : '700.000',
            period: billingCycle === 'monthly' ? '/ mes' : '/ trimestre',
            features: [
                'Todo lo de Torre',
                'Análisis profundo de partidas',
                'Base de datos de GMs',
                'Soporte Prioritario',
                'Video-lecciones exclusivas'
            ],
            icon: 'chess_king',
            color: 'bg-amber-500',
            lightColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            btnColor: 'bg-amber-500',
            btnShadow: 'border-amber-700',
            textColor: 'text-amber-500'
        },
        {
            id: 'gran_maestro',
            name: 'Gran Maestro',
            role: 'Profesional',
            price: billingCycle === 'monthly' ? '500.000' : '1.400.000',
            period: billingCycle === 'monthly' ? '/ mes' : '/ trimestre',
            features: [
                'Plan de Entrenamiento Personal',
                'Clases Online en Vivo (4/mes)',
                'Mentoría con Instructores',
                'Revisión de partidas en tiempo real',
                'Acceso total a la academia'
            ],
            icon: 'social_leaderboard', // Crown/Trophy
            color: 'bg-purple-600',
            lightColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            btnColor: 'bg-purple-600',
            btnShadow: 'border-purple-800',
            textColor: 'text-purple-600',
            special: true
        }
    ];

    const handleSubscribe = (planName: string, price: string) => {
        const phoneNumber = '595973875198';
        const message = `Hola! Quiero convertirme en *${planName}* (${price}). ¿Cómo realizo el pago?`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-10 px-4">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-block p-3 rounded-2xl bg-yellow-100 text-yellow-600 mb-4 transform -rotate-3 shadow-sm">
                    <span className="material-symbols-outlined text-3xl font-black">diamond</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                    Invierte en tu Talento
                </h1>
                <p className="text-xl text-slate-400 font-bold">
                    Elige el plan perfecto para tu camino hacia la maestría.
                </p>

                {/* Billing Toggle (Visual only for now) */}
                <div className="flex items-center justify-center gap-4 mt-8 bg-white inline-flex p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-xl font-black text-sm transition-all ${billingCycle === 'monthly' ? 'bg-blue-100 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        MENSUAL
                    </button>
                    <button
                        onClick={() => setBillingCycle('quarterly')}
                        className={`px-6 py-2 rounded-xl font-black text-sm transition-all ${billingCycle === 'quarterly' ? 'bg-blue-100 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        TRIMESTRAL <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded ml-1">-10%</span>
                    </button>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`
                            relative flex flex-col bg-white rounded-[2rem] border-2 transition-all duration-300
                            ${plan.special
                                ? 'border-purple-500 shadow-xl scale-[1.02] z-10'
                                : `border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-lg`
                            }
                        `}
                    >
                        {/* Header Part */}
                        <div className={`p-6 rounded-t-[2rem] ${plan.lightColor}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-14 h-14 rounded-2xl ${plan.color} flex items-center justify-center shadow-lg text-white`}>
                                    <span className="material-symbols-outlined text-3xl">{plan.icon}</span>
                                </div>
                                {plan.special && (
                                    <span className="bg-purple-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-lg tracking-wider">
                                        Recomendado
                                    </span>
                                )}
                            </div>
                            <h3 className={`text-2xl font-black ${plan.textColor} uppercase tracking-wide`}>{plan.name}</h3>
                            <p className="text-slate-500 font-bold text-sm opacity-80">{plan.role}</p>
                        </div>

                        {/* Price Part */}
                        <div className="px-6 py-4 border-b-2 border-slate-100 border-dashed">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-slate-800">{plan.price}</span>
                                <span className="text-xs font-bold text-slate-400">Gs.</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{plan.period}</span>
                        </div>

                        {/* Features Part */}
                        <div className="p-6 flex-1">
                            <ul className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className={`material-symbols-outlined text-xl font-bold ${plan.textColor} shrink-0`}>check_circle</span>
                                        <span className="text-sm font-bold text-slate-600 leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Part */}
                        <div className="p-6 pt-0 mt-auto">
                            <button
                                onClick={() => handleSubscribe(plan.name, plan.price)}
                                className={`
                                    w-full py-4 rounded-xl font-black text-white text-sm uppercase tracking-wider
                                    border-b-4 active:border-b-0 active:translate-y-[4px] transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    ${plan.btnColor} ${plan.btnShadow}
                                    hover:brightness-110 shadow-md
                                `}
                            >
                                ELEGIR {plan.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for partner logos or icons */}
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-4xl">verified_user</span>
                    <span className="font-black text-slate-800">Pagos Seguros</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-4xl">workspace_premium</span>
                    <span className="font-black text-slate-800">Calidad Grantizada</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-4xl">support_agent</span>
                    <span className="font-black text-slate-800">Soporte 24/7</span>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-20">
                <h2 className="text-2xl font-black text-slate-800 text-center mb-8">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    <FaqItem
                        question="¿Cómo accedo a las clases online?"
                        answer="Al suscribirte al plan Gran Maestro, recibirás un enlace de Zoom/Meet exclusivo y acceso al calendario de clases semanales."
                    />
                    <FaqItem
                        question="¿Puedo cambiar de plan después?"
                        answer="¡Claro! Puedes mejorar tu plan en cualquier momento pagando solo la diferencia del mes en curso."
                    />
                    <FaqItem
                        question="¿Qué métodos de pago aceptan?"
                        answer="Actualmente aceptamos transferencias bancarias (SIPAP), Giros Tigo y Billetera Personal."
                    />
                </div>
            </div>

        </div>
    );
};

// Simple FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="p-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors">
                <h4 className="font-bold text-slate-700">{question}</h4>
                <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
            {isOpen && (
                <div className="p-4 pt-0 text-slate-500 text-sm font-medium leading-relaxed border-t border-slate-100 bg-slate-50">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default SubscriptionPage;
