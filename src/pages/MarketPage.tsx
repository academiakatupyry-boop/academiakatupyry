import React from 'react';
import PageTitle from '../components/ui/PageTitle';

const products = [
    {
        id: 1,
        name: "Set de Ajedrez Torneo",
        price: "150.000 Gs",
        category: "Equipamiento",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEK1c84oG101Vxf9RDaqNYO4uhftFNEtKc211p1tTxsL89uZ5cUKIOAHLsxBHetzYrUfWT5egNgfNAHVwDdNDeTQXookmRAP3bv4_fFtISKHbDs5cykiDJT0ztsZ9jQr-lc5lFMayqFPYlF97gwYQe05D9BE-IMFZizx_MFokg4GoVGHWmbi2R1DRrIm7209XxXlkfNBUjYj_qjlU0UYR88hD9KOGQyeOdzUA5j6GHaAUZDcpG01A8vTmFgiiUb20PT-QUjXDv98if", // Board
        tag: "Más Vendido"
    },
    {
        id: 2,
        name: "Ajedrez para Colorear",
        price: "35.000 Gs",
        category: "Libros Niños",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiyg8Sr5P0rUsi5vnmRu7kzyMDBocjBhWBkAwEBCo-udZohZS_zSP5CcuDVzzePBWo9Ls2060gguKAdAvTxBXYv57rxyjVpGjvqpWSwsZZND63BWerRNKuhm_oHPBJ8F4MFfsrehIHW4V8hTgjELmaR6qu-6KKTMhk21N6XFaailO9WZAWBEFaN64vEMDTB1pLwmFHUbayJsyN-6cNY8uDG_EhACFZB8PZ3auycqHMfnAtmNfLk8VAQe9_DsKXDrn5Q9XsW6ZpvM0R", // Fun/Art
        tag: "Infantil"
    },
    {
        id: 3,
        name: "Libro Nivel Inicial",
        price: "45.000 Gs",
        category: "Educativo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMubEKVNnwARolEXP9AbH3xVdkNUl51Vl0UMjLmdzJgkLyj9K-w2UMNPYP05XmwMsKX__PuhGRn72fvZHJwqdovOOKoMfgCLVSdYR86oG8rwmSZqH0ne7P_kyUyIOAfMItWU_ZeSVohxW_Qwi3UmZre_VxTxfFIedRLsEkYLjKs7_t6Tw8QiIMsvc4ikYGdCnP8R0dojGcgjiAWqmLB4M3WnkcJ87-JiOb9eTcJBrIfiQciealZ2SZsbDacoTy1T-yWzHWyxsGkrvU", // Book
    },
    {
        id: 4,
        name: "Libro Primer Ciclo",
        price: "50.000 Gs",
        category: "Educativo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9dDS_3pGF_ihpiBA4gMEZn_Di4Csivi7yccejS-qiuBchXutH7A6WMATqrOomT-ZKrD9bTqpo0Fh9yPM5rLvUMEFBkFulneMpZZ-7yWJJvqNQARB4M5A_9kU1YD9RNJpyc-B5uTXO_TBSR1ljjjE1ZWj_fH6vB1OKSoD2-D8RIcgu1ON97e4yLVZvtrbC7Wlaih6hsF1xEOe0HM7v6LVL2c-ZZD061DKluAc8On2CLnUoivX41mElUVE1lYPSVaKVCCClNTzc2ont", // Book
    },
    {
        id: 5,
        name: "Libro Segundo Ciclo",
        price: "55.000 Gs",
        category: "Educativo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYvkyfd-pXoWdIk8w8Rzw0X4yXiefSolHqC_6Oenx2RJROC_U-zPE1UKbwJhUx4wez6dqwJ5hfB5mUhxQ6oFFR3AH0vZxjzmJSHugCbm4ZekXH7BkgWuv6wpHvhSY3VsMdHKnzgcwM7mMRuzIa100zp-Qg-1nvticFw122hyCh1ZIKzyQ60inNMOCqqGthGJXL-j8a3kcSHRveH_Rkfn-GsPymEbJt1JOT0xhgUVd-sXVaXU9GuedEdUyxzv0Ku1peSQDz3I0K5KD", // Book
    },
    {
        id: 6,
        name: "Libro Tercer Ciclo",
        price: "60.000 Gs",
        category: "Educativo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA1tynS2nR0r_BxID2YjQyXkMYYKO0gQ8GuRtmVsntKEOIwPcuyUSHIARp_ZLtxuoRfpSUtHUAQBAOsEeXgOCMb8Kks8skixeytFCYmzAmtel1Y9VzXUnQEoUgUi9YxCZVMOwye_lxrE52S4DZ0mi_sj_NvplT0JiGIdO7qHBN7wUPWQrz3txLpYHB9iYoZ8U4751yeNYkQzJH86GXvFPvRT4N-bT2S735OlfZtWszezl6aBS8YZU84XcBrUVlqMbj_qY1wT3rDh7R", // Book
    },
    {
        id: 7,
        name: "Estrategia Avanzada",
        price: "75.000 Gs",
        category: "Educativo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIy_sKsA_iF8ly-Cy3mDgyEpfQ4hxPvmH7oD9bajfY1Rn2U6UsLXA8h2L6muxyW8GgPafcr2wUTa8IkTMoJAFTee7Fqhwv8Md3tCggMC0EiYg6lU6kieSIZVAS4-vLlapEz6ilq2tcgxYKY_IJj73u3Cu01EXnfoyMWVIHlvXA9mGC3jLDYIlOq6B1iQBHm36-jwnGA2Oi2YKGh2ULENFCefbWWFQuFwPRxNv4TkiCgup6M3lIvZXof7Eb_gwhdveCIdfzDowM6cd", // Advanced Book
        tag: "Experto"
    },
    {
        id: 8,
        name: "Uniforme Oficial",
        price: "85.000 Gs",
        category: "Indumentaria",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZlljNbNP8Bzn5DboUN_gei1_9xkBu6Quvu400Zb9Qj92KVBkwp5CeFBjldRz-FIWgDFmVJ176jGPIOahucbrfLVhIiN1g4T3QjYnMCAWsc7R75cUDTxzjGMI-oKEBZG4hP0BeQxtC1h6sfilAN9i0M5VZ54pfmSFCKRnZCxV51usN2nw-NGTeC10mluy7MH89T1wxxQ4CsE2cm3RhBYooELt3vYGFUiIWi13VBFlL-Oba3hIw08easTyrAeHV8zfLWLSnI2HKgEO0", // T-shirt
        tag: "Oficial"
    },
    {
        id: 9,
        name: "Gorra Táctica",
        price: "40.000 Gs",
        category: "Accesorios",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0MiTsGHK5BqTe_fWEIZ9GsSdLV0LSsHhQ1p3BdgOUqifK1NYBRhfC_duoTCVttO2oiSmZSJLsDa2efQCUSgH_Q8IjzVBdBnfnluc9HQMKpK4q2Jsl257J-c0hRTTN1lEnKfR1h0DHhaeTnPOeD-NLBC4qI1wCgZ3G0gB-GzbzL86WH-GuUM7NKWXM_cuYLxUxj41LOlhyn9yYlfUd0gmOs2M_jh3QjRxSQspGUxFi4EVXQGNpxl5HngK7ni1dF6yThsf_6Md9-Wmt", // Cap (using mascot/generic feel)
    },
    {
        id: 10,
        name: "Botella Hidratación",
        price: "30.000 Gs",
        category: "Accesorios",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEK1c84oG101Vxf9RDaqNYO4uhftFNEtKc211p1tTxsL89uZ5cUKIOAHLsxBHetzYrUfWT5egNgfNAHVwDdNDeTQXookmRAP3bv4_fFtISKHbDs5cykiDJT0ztsZ9jQr-lc5lFMayqFPYlF97gwYQe05D9BE-IMFZizx_MFokg4GoVGHWmbi2R1DRrIm7209XxXlkfNBUjYj_qjlU0UYR88hD9KOGQyeOdzUA5j6GHaAUZDcpG01A8vTmFgiiUb20PT-QUjXDv98if", // Water bottle
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