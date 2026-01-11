export interface Exercise {
    id: string;
    fen: string;
    solution: string[]; // UCI format e.g., "e2e4", "e7e5"
    instruction: string;
}

export interface LessonTopic {
    id: string;
    title: string;
    description: string;
    icon: string; // Material symbol name or custom SVG url
    category: 'checkmates' | 'patterns';
    exercises: Exercise[];
}

export const lessons: LessonTopic[] = [
    // --- SECTION: MATES ---
    {
        id: 'checkmate',
        title: 'Jaque Mate',
        description: 'Gana la partida con estilo.',
        icon: 'emoji_events',
        category: 'checkmates',
        exercises: [
            {
                id: 'ex1',
                fen: '4k3/8/4K3/4Q3/8/8/8/8 w - - 0 1',
                solution: ['e5b8'], // Simple checkmate
                instruction: 'Mueve la dama para dar Jaque Mate.'
            }
        ]
    },
    {
        id: 'mate-in-1',
        title: 'Mate en 1',
        description: 'Dar mate en un movimiento.',
        icon: 'looks_one',
        category: 'checkmates',
        exercises: [
            {
                id: 'ex1',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2',
                solution: ['d8h4'],
                instruction: 'Encuentra el mate en 1 jugada (Mate del Loco).'
            }
        ]
    },
    {
        id: 'mate-in-2',
        title: 'Mate en 2',
        description: 'Dar mate en dos movimientos.',
        icon: 'looks_two',
        category: 'checkmates',
        exercises: [] // To be populated
    },

    // --- SECTION: TEMAS DE MATE ---
    {
        id: 'anastasia-mate',
        title: 'Mate de Anastasia',
        description: 'Caballo y torre atrapan al rey en el borde.',
        icon: 'castle', // Placeholder icon
        category: 'patterns',
        exercises: [
            {
                id: 'ana1',
                fen: '5r1k/1p6/p1n5/4N3/8/8/PPP5/2KR4 w - - 0 1',
                solution: ['e5g6', 'h8g8', 'g6f8'], // Placeholder sequence
                instruction: 'Este es un ejemplo (Necesitamos FEN real de Anastasia).'
            }
        ]
    },
    {
        id: 'arabian-mate',
        title: 'Mate Árabe',
        description: 'Caballo y torre en la esquina.',
        icon: 'mosque',
        category: 'patterns',
        exercises: []
    },
    {
        id: 'back-rank',
        title: 'Mate del Pasillo',
        description: 'El rey atrapado por sus propios peones.',
        icon: 'door_back',
        category: 'patterns',
        exercises: []
    },
    {
        id: 'smothered',
        title: 'Mate de la Coz',
        description: 'El rey ahogado por sus propias piezas ante un caballo.',
        icon: 'pets',
        category: 'patterns',
        exercises: []
    },
    {
        id: 'bodens',
        title: 'Mate de Boden',
        description: 'Dos alfiles cruzados.',
        icon: 'close',
        category: 'patterns',
        exercises: []
    }
];

export const getLessonById = (id: string) => lessons.find(l => l.id === id);
