import React from 'react';
import { Link } from 'react-router-dom';

const newsItems = [
    {
        id: 1,
        title: "Faustino Oro: El 'Messi' del Ajedrez",
        description: "El pequeño prodigio argentino de 10 años sigue rompiendo récords históricos y asombra a la comunidad internacional con su victoria sobre Hikaru Nakamura.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA1tynS2nR0r_BxID2YjQyXkMYYKO0gQ8GuRtmVsntKEOIwPcuyUSHIARp_ZLtxuoRfpSUtHUAQBAOsEeXgOCMb8Kks8skixeytFCYmzAmtel1Y9VzXUnQEoUgUi9YxCZVMOwye_lxrE52S4DZ0mi_sj_NvplT0JiGIdO7qHBN7wUPWQrz3txLpYHB9iYoZ8U4751yeNYkQzJH86GXvFPvRT4N-bT2S735OlfZtWszezl6aBS8YZU84XcBrUVlqMbj_qY1wT3rDh7R",
        category: "Internacional",
        date: "Hace 2 horas"
    },
    {
        id: 2,
        title: "Gukesh desafía la historia",
        description: "El joven Gran Maestro indio se prepara para el duelo por el Campeonato Mundial. ¿Podrá convertirse en el campeón más joven de todos los tiempos?",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYvkyfd-pXoWdIk8w8Rzw0X4yXiefSolHqC_6Oenx2RJROC_U-zPE1UKbwJhUx4wez6dqwJ5hfB5mUhxQ6oFFR3AH0vZxjzmJSHugCbm4ZekXH7BkgWuv6wpHvhSY3VsMdHKnzgcwM7mMRuzIa100zp-Qg-1nvticFw122hyCh1ZIKzyQ60inNMOCqqGthGJXL-j8a3kcSHRveH_Rkfn-GsPymEbJt1JOT0xhgUVd-sXVaXU9GuedEdUyxzv0Ku1peSQDz3I0K5KD",
        category: "Campeonato Mundial",
        date: "Ayer"
    },
    {
        id: 3,
        title: "Magnus Carlsen imparable en Rápidas",
        description: "El noruego demuestra una vez más su dominio absoluto en los ritmos acelerados, ganando otro torneo de élite sin perder una sola partida.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEK1c84oG101Vxf9RDaqNYO4uhftFNEtKc211p1tTxsL89uZ5cUKIOAHLsxBHetzYrUfWT5egNgfNAHVwDdNDeTQXookmRAP3bv4_fFtISKHbDs5cykiDJT0ztsZ9jQr-lc5lFMayqFPYlF97gwYQe05D9BE-IMFZizx_MFokg4GoVGHWmbi2R1DRrIm7209XxXlkfNBUjYj_qjlU0UYR88hD9KOGQyeOdzUA5j6GHaAUZDcpG01A8vTmFgiiUb20PT-QUjXDv98if",
        category: "Torneos",
        date: "Hace 3 días"
    },
    {
        id: 4,
        title: "5 Consejos para mejorar tu Apertura",
        description: "Analizamos las estrategias clave que todo principiante debe conocer para salir con ventaja desde las primeras jugadas. ¡No te pierdas esta guía!",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9dDS_3pGF_ihpiBA4gMEZn_Di4Csivi7yccejS-qiuBchXutH7A6WMATqrOomT-ZKrD9bTqpo0Fh9yPM5rLvUMEFBkFulneMpZZ-7yWJJvqNQARB4M5A_9kU1YD9RNJpyc-B5uTXO_TBSR1ljjjE1ZWj_fH6vB1OKSoD2-D8RIcgu1ON97e4yLVZvtrbC7Wlaih6hsF1xEOe0HM7v6LVL2c-ZZD061DKluAc8On2CLnUoivX41mElUVE1lYPSVaKVCCClNTzc2ont",
        category: "Educativo",
        date: "Semana pasada"
    }
];

const ChroniclesPage: React.FC = () => {
    return (
        <div className="text-text-main font-body antialiased pb-24 pt-28">
            <main className="flex-1 w-full flex flex-col items-center">

                {/* Hero Section */}
                <section className="w-full px-4 md:px-10 py-8 max-w-7xl">
                    <div className="relative w-full rounded-[2.5rem] overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-cartoon-lg group border-4 border-white" style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMubEKVNnwARolEXP9AbH3xVdkNUl51Vl0UMjLmdzJgkLyj9K-w2UMNPYP05XmwMsKX__PuhGRn72fvZHJwqdovOOKoMfgCLVSdYR86oG8rwmSZqH0ne7P_kyUyIOAfMItWU_ZeSVohxW_Qwi3UmZre_VxTxfFIedRLsEkYLjKs7_t6Tw8QiIMsvc4ikYGdCnP8R0dojGcgjiAWqmLB4M3WnkcJ87-JiOb9eTcJBrIfiQciealZ2SZsbDacoTy1T-yWzHWyxsGkrvU")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="flex flex-col gap-5 max-w-3xl relative z-10">
                            <span className="inline-block mx-auto bg-primary-island text-white font-black px-4 py-1.5 rounded-full text-sm uppercase tracking-widest shadow-lg animate-pulse-slow">
                                Últimas Novedades
                            </span>
                            <div className="text-white drop-shadow-xl">
                                <h1 className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tight mb-4">
                                    ¿Qué pasó en el <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                                        mundo del ajedrez?
                                    </span>
                                </h1>
                            </div>
                            <p className="text-white/90 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
                                Mantente al día con los torneos, las estrellas emergentes y los mejores consejos para tu juego.
                            </p>
                        </div>
                    </div>
                </section>

                {/* News Grid */}
                <section className="w-full px-4 md:px-10 max-w-7xl mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {newsItems.map((item) => (
                            <article key={item.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border-4 border-transparent hover:border-primary-island/20 h-full">
                                {/* Image Container */}
                                <div className="h-64 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${item.image}')` }}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-md text-text-dark-fun text-xs font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1 relative">
                                    <div className="mb-4 flex items-center gap-2 text-text-muted-light text-xs font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {item.date}
                                    </div>
                                    <h3 className="text-2xl font-display font-black text-text-dark-fun mb-3 leading-tight group-hover:text-primary-island transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 font-bold leading-relaxed mb-6 line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="text-primary-island font-black uppercase tracking-wide text-sm flex items-center gap-1 group/btn hover:gap-2 transition-all">
                                            Leer nota completa
                                            <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ChroniclesPage;