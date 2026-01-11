import React from 'react';
import PageTitle from '../components/ui/PageTitle';

const products = [
    {
        id: 1,
        name: "Set de Ajedrez Torneo",
        price: "150.000 Gs",
        category: "Equipamiento",
        image: "/Proximamente.svg",
        tag: "Más Vendido"
    },
    {
        id: 2,
        name: "Ajedrez para Colorear",
        price: "35.000 Gs",
        category: "Libros Niños",
        image: "/Proximamente.svg",
        tag: "Infantil"
    },
    {
        id: 3,
        name: "Libro Nivel Inicial",
        price: "45.000 Gs",
        category: "Educativo",
        image: "/Proximamente.svg",
    },
    {
        id: 4,
        name: "Libro Primer Ciclo",
        price: "50.000 Gs",
        category: "Educativo",
        image: "/Proximamente.svg",
    },
    {
        id: 5,
        name: "Libro Segundo Ciclo",
        price: "55.000 Gs",
        category: "Educativo",
        image: "/Proximamente.svg",
    },
    {
        id: 6,
        name: "Libro Tercer Ciclo",
        price: "60.000 Gs",
        category: "Educativo",
        image: "/Proximamente.svg",
    },
    {
        id: 7,
        name: "Estrategia Avanzada",
        price: "75.000 Gs",
        category: "Educativo",
        image: "/Proximamente.svg",
        tag: "Experto"
    },
    {
        id: 8,
        name: "Uniforme Oficial",
        price: "85.000 Gs",
        category: "Indumentaria",
        image: "/Proximamente.svg",
        tag: "Oficial"
    },
    {
        id: 9,
        name: "Gorra Táctica",
        price: "40.000 Gs",
        category: "Accesorios",
        image: "/Proximamente.svg",
    },
    {
        id: 10,
        name: "Botella Hidratación",
        price: "30.000 Gs",
        category: "Accesorios",
        image: "/Proximamente.svg",
    }
];

const MarketPage: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 pb-24 pt-28">

            <section className="relative w-full overflow-hidden pb-12 pt-8 sm:pt-12 px-4">
                <div className="mx-auto max-w-[1280px]">
                    <PageTitle
                        title="Tienda"
                        highlight="Katupyry"
                        description="¡Equípate para la gran aventura del saber!"
                    />
                </div>
            </section>

            <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                <h2 className="text-3xl font-display font-black text-wood-dark flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary-adventure text-4xl filled">auto_awesome</span>
                    Tesoros Disponibles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative flex flex-col rounded-3xl bg-white p-3 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border-4 border-wood-light/30">

                            {/* Product Image */}
                            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-island-bg border-2 border-wood-light/20">
                                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${product.image}')` }}></div>

                                {product.tag && (
                                    <div className="absolute top-2 left-2 bg-secondary-adventure text-text-dark-fun text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm">
                                        {product.tag}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col gap-2 p-2 flex-1">
                                <span className="text-xs font-bold text-primary-island uppercase tracking-wider">{product.category}</span>
                                <h3 className="text-lg font-display font-black text-text-dark-fun leading-tight mb-auto">
                                    {product.name}
                                </h3>

                                <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-gray-100 pt-3">
                                    <span className="text-xl font-black text-text-dark-fun">{product.price}</span>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-island text-white shadow-btn-primary hover:bg-primary-dark transition-colors active:translate-y-1 active:shadow-none">
                                        <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketPage;