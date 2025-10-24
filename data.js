// Datos de la aplicación - Categorías e items
const APP_DATA = {
    categories: [
        {
            id: 'panificados',
            name: 'Panificados',
            icon: 'fas fa-bread-slice',
            description: 'Panes y productos de panadería',
            items: [
                'Pan Rustico',
                'Pan de sanguche de lomito/milanesa/bondiola',
                'Pan redonditos individuales',
                'Pan de miga',
                'Pan de hamburguesa',
                'Pizzas',
                'Panqueques',
                'Focaccia'
            ]
        },
        {
            id: 'carne',
            name: 'Carne',
            icon: 'fas fa-drumstick-bite',
            description: 'Carnes y proteínas',
            items: [
                'Hamburguesas',
                'Bondiola (carne)',
                'Lomito',
                'Milanesa de carne',
                'Milanesa de pollo',
                'Muslito de pollo',
                'Carne picada',
                'Pechuga de pollo',
                'Pollo desmenuzado',
                'Pata muslo'
            ]
        },
        {
            id: 'pastas',
            name: 'Pastas',
            icon: 'fas fa-utensils',
            description: 'Pastas y rellenos',
            items: [
                'Tallarines',
                'Sorrentinos de bondiola',
                'Sorrentinos de 4 quesos',
                'Sorrentinos de calabaza',
                'Raviolones de verdura'
            ]
        },
        {
            id: 'verduras',
            name: 'Verduras',
            icon: 'fas fa-carrot',
            description: 'Verduras y frutas',
            items: [
                'Lechuga',
                'Tomate',
                'Cebolla',
                'Zanahoria',
                'Rucula',
                'Cebolla de verdeo',
                'Perejil',
                'Ajo',
                'Morrón',
                'Acelga',
                'Limon',
                'Naranja'
            ]
        },
        {
            id: 'frituras',
            name: 'Frituras',
            icon: 'fas fa-hamburger',
            description: 'Productos para freír',
            items: [
                'Papas fritas (congeladas)',
                'Bastones de muzzarella',
                'Nuggets',
                'Rabas',
                'Papas naturales para rústicas'
            ]
        },
        {
            id: 'rellenos',
            name: 'Rellenos',
            icon: 'fas fa-cookie-bite',
            description: 'Rellenos para empanadas',
            items: [
                'Relleno de cortada a cuchillo',
                'Relleno de verdura/acelga',
                'Relleno de carne picada salada',
                'Relleno de osobuco'
            ]
        },
        {
            id: 'fiambres',
            name: 'Fiambres y Quesos',
            icon: 'fas fa-cheese',
            description: 'Fiambres y productos lácteos',
            items: [
                'Queso barra',
                'Queso holanda',
                'Queso para rallar',
                'Jamón cocido',
                'Lomito ahumado',
                'Bondiola (fiambre)',
                'Salame',
                'Mortadela',
                'Queso roquefort',
                'Provoleta',
                'Muzzarella',
                'Cheddar',
                'Panceta',
                'Salchicha'
            ]
        },
        {
            id: 'salsas',
            name: 'Salsas',
            icon: 'fas fa-wine-bottle',
            description: 'Salsas y aderezos',
            items: [
                'Mostaza',
                'Roquefort',
                'Verdeo',
                'Blanca',
                'Roja',
                'Bolognesa',
                'Crema',
                'Alioli',
                'Chimichurri',
                'Caesar',
                'Salsa Criolla'
            ]
        },
        {
            id: 'pizza',
            name: 'Insumos Pizza',
            icon: 'fas fa-pizza-slice',
            description: 'Ingredientes para pizza',
            items: [
                'Caja de puré de tomate',
                'Provenzal',
                'Huevo duro',
                'Cebolla caramelizada',
                'Aceitunas'
            ]
        },
        {
            id: 'postres',
            name: 'Postres',
            icon: 'fas fa-ice-cream',
            description: 'Postres y dulces',
            items: [
                'Flan casero',
                'Panqueques',
                'Budin de pan',
                'Bombón escocés',
                'Dulce de leche'
            ]
        },
        {
            id: 'extras',
            name: 'Extras',
            icon: 'fas fa-box',
            description: 'Ingredientes varios',
            items: [
                'Tapas de empanadas',
                'Mayonesa',
                'Manteca',
                'Vinagre',
                'Aceite',
                'Detergente',
                'Desengrasante',
                'Lavandina',
                'Azúcar',
                'Sal fina',
                'Leche',
                'Maizena'
            ]
        },
        {
            id: 'descartables',
            name: 'Descartables',
            icon: 'fas fa-trash-alt',
            description: 'Productos descartables',
            items: [
                'Caja de pizza cuadrada entera',
                'Media caja de pizza cuadrada',
                'Papel parafinado para las papas fritas',
                'Pinchos para las picadas y sanguches',
                'Papel film',
                'Bolsas de corte o arranque',
                'Bolsas de basura'
            ]
        },
        {
            id: 'condimentos',
            name: 'Condimentos',
            icon: 'fas fa-pepper-hot',
            description: 'Especias y condimentos',
            items: [
                'Pimentón',
                'Curry',
                'Oregano'
            ]
        }
    ]
};

// Estado de la aplicación
const AppState = {
    currentScreen: 'home',
    currentCategoryIndex: 0,
    currentControl: {
        date: '',
        shift: '',
        items: {}
    },
    previousControl: null
};

// Utilidades para fechas y turnos
const DateUtils = {
    getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },
    
    getCurrentShift() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 14) {
            return 'Turno Mañana';
        } else if (hour >= 14 && hour < 22) {
            return 'Turno Tarde';
        } else {
            return 'Turno Noche';
        }
    },
    
    getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString('es-AR');
    }
};

// Gestión de almacenamiento local
const Storage = {
    saveControl(control) {
        localStorage.setItem('lastControl', JSON.stringify(control));
    },
    
    loadLastControl() {
        const saved = localStorage.getItem('lastControl');
        return saved ? JSON.parse(saved) : null;
    },
    
    saveAppState() {
        localStorage.setItem('appState', JSON.stringify(AppState));
    },
    
    loadAppState() {
        const saved = localStorage.getItem('appState');
        if (saved) {
            Object.assign(AppState, JSON.parse(saved));
        }
    }
};
