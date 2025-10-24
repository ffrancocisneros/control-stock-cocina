// Aplicación principal
class StockControlApp {
    constructor() {
        this.init();
    }

    init() {
        this.loadAppState();
        this.setupEventListeners();
        this.updateDateInfo();
        this.showScreen('home');
        this.initTheme();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(savedTheme + '-theme');
        this.updateThemeIcons(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(newTheme + '-theme');
        
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcons(newTheme);
    }

    updateThemeIcons(theme) {
        const icons = document.querySelectorAll('.theme-toggle-btn i');
        icons.forEach(icon => {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    loadAppState() {
        Storage.loadAppState();
        AppState.previousControl = Storage.loadLastControl();
    }

    setupEventListeners() {
        // Toggle de tema
        document.querySelectorAll('.theme-toggle-btn, #theme-toggle, #theme-toggle-categories, #theme-toggle-checklist, #theme-toggle-summary').forEach(btn => {
            btn.addEventListener('click', () => this.toggleTheme());
        });

        // Botones de navegación principal
        document.getElementById('start-control').addEventListener('click', () => {
            this.startNewControl();
        });

        document.getElementById('view-previous').addEventListener('click', () => {
            this.viewPreviousControl();
        });

        // Botones de navegación entre pantallas
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.showScreen('home');
        });

        document.getElementById('back-to-categories').addEventListener('click', () => {
            this.showScreen('categories');
        });

        document.getElementById('next-category').addEventListener('click', () => {
            this.nextCategory();
        });

        // Botones del resumen
        document.getElementById('copy-list').addEventListener('click', () => {
            this.copyList();
        });

        document.getElementById('share-whatsapp').addEventListener('click', () => {
            this.shareWhatsApp();
        });

        document.getElementById('new-control').addEventListener('click', () => {
            this.startNewControl();
        });
    }

    updateDateInfo() {
        const currentDate = DateUtils.getCurrentDate();
        const currentShift = DateUtils.getCurrentShift();
        
        document.getElementById('current-date').textContent = currentDate;
        document.getElementById('current-shift').textContent = currentShift;
        
        document.getElementById('summary-date').textContent = currentDate;
        document.getElementById('summary-shift').textContent = currentShift;
    }

    showScreen(screenName) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar la pantalla solicitada
        document.getElementById(`${screenName}-screen`).classList.add('active');
        AppState.currentScreen = screenName;

        // Ejecutar acciones específicas de cada pantalla
        switch(screenName) {
            case 'categories':
                this.renderCategories();
                break;
            case 'checklist':
                this.renderChecklist();
                break;
            case 'summary':
                this.renderSummary();
                break;
        }

        Storage.saveAppState();
    }

    startNewControl() {
        // Inicializar nuevo control
        AppState.currentControl = {
            date: DateUtils.getCurrentDate(),
            shift: DateUtils.getCurrentShift(),
            items: {}
        };
        
        AppState.currentCategoryIndex = 0;
        this.showScreen('categories');
    }

    viewPreviousControl() {
        if (AppState.previousControl) {
            // Mostrar el control anterior en el resumen
            AppState.currentControl = AppState.previousControl;
            this.showScreen('summary');
        } else {
            alert('No hay controles anteriores disponibles');
        }
    }

    renderCategories() {
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = '';

        APP_DATA.categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.innerHTML = `
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <span class="category-count">${category.items.length} items</span>
            `;
            
            categoryCard.addEventListener('click', () => {
                this.selectCategory(category.id);
            });
            
            categoriesList.appendChild(categoryCard);
        });
    }

    selectCategory(categoryId) {
        const category = APP_DATA.categories.find(cat => cat.id === categoryId);
        if (category) {
            AppState.currentCategory = category;
            this.showScreen('checklist');
        }
    }

    renderChecklist() {
        if (!AppState.currentCategory) return;

        const categoryTitle = document.getElementById('category-title');
        const itemsList = document.getElementById('items-list');
        const progressText = document.getElementById('progress-text');
        const progressBarFill = document.getElementById('progress-bar-fill');

        categoryTitle.textContent = AppState.currentCategory.name;
        
        // Calcular progreso
        const totalItems = AppState.currentCategory.items.length;
        const completedItems = AppState.currentCategory.items.filter(item => 
            AppState.currentControl.items[item] !== undefined
        ).length;
        
        const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        
        progressText.textContent = `${completedItems}/${totalItems}`;
        progressBarFill.style.width = progressPercent + '%';

        itemsList.innerHTML = '';

        AppState.currentCategory.items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            
            const currentState = AppState.currentControl.items[item] || null;
            
            itemCard.innerHTML = `
                <div class="item-name">${item}</div>
                <div class="item-options">
                    <button class="option-btn hay ${currentState === 'hay' ? 'selected' : ''}" data-item="${item}" data-state="hay">
                        <i class="fas fa-check"></i> Hay
                    </button>
                    <button class="option-btn poco ${currentState === 'poco' ? 'selected' : ''}" data-item="${item}" data-state="poco">
                        <i class="fas fa-exclamation-triangle"></i> Poco
                    </button>
                    <button class="option-btn falta ${currentState === 'falta' ? 'selected' : ''}" data-item="${item}" data-state="falta">
                        <i class="fas fa-times"></i> Falta
                    </button>
                </div>
            `;

            // Agregar event listeners a los botones
            itemCard.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const item = e.target.dataset.item;
                    const state = e.target.dataset.state;
                    
                    // Remover selección anterior
                    itemCard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    
                    // Seleccionar nuevo estado
                    e.target.classList.add('selected');
                    
                    // Guardar estado
                    AppState.currentControl.items[item] = state;
                    Storage.saveAppState();
                    
                    // Actualizar progreso
                    this.updateProgress();
                });
            });

            itemsList.appendChild(itemCard);
        });
        
        // Actualizar progreso inicial
        this.updateProgress();
    }

    updateProgress() {
        if (!AppState.currentCategory) return;
        
        const itemsList = document.getElementById('items-list');
        const progressText = document.getElementById('progress-text');
        const progressBarFill = document.getElementById('progress-bar-fill');
        
        if (!itemsList || !progressText || !progressBarFill) return;
        
        const totalItems = AppState.currentCategory.items.length;
        const completedItems = AppState.currentCategory.items.filter(item => 
            AppState.currentControl.items[item] !== undefined
        ).length;
        
        const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        
        progressText.textContent = `${completedItems}/${totalItems}`;
        progressBarFill.style.width = progressPercent + '%';
    }

    nextCategory() {
        const currentIndex = APP_DATA.categories.findIndex(cat => cat.id === AppState.currentCategory.id);
        
        if (currentIndex < APP_DATA.categories.length - 1) {
            // Ir a la siguiente categoría
            AppState.currentCategory = APP_DATA.categories[currentIndex + 1];
            this.showScreen('checklist');
        } else {
            // Terminar el control
            this.finishControl();
        }
    }

    finishControl() {
        // Guardar control anterior
        if (AppState.currentControl.items && Object.keys(AppState.currentControl.items).length > 0) {
            Storage.saveControl(AppState.currentControl);
            AppState.previousControl = AppState.currentControl;
        }
        
        this.showScreen('summary');
    }

    renderSummary() {
        const summaryResults = document.getElementById('summary-results');

        // Separar items por estado
        const pocoItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'poco')
            .map(([item]) => item);
        
        const faltaItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'falta')
            .map(([item]) => item);

        summaryResults.innerHTML = '';

        if (pocoItems.length === 0 && faltaItems.length === 0) {
            summaryResults.innerHTML = `
                <div class="card summary-card success">
                    <div class="card-content">
                        <div class="success-card">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div>
                                <h3 class="success-title">¡Todo en orden!</h3>
                                <p class="success-description">No hay productos faltantes en este control</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Mostrar items que faltan primero
            if (faltaItems.length > 0) {
                const card = document.createElement('div');
                card.className = 'card summary-card alert';
                card.innerHTML = `
                    <div class="summary-header">
                        <div class="summary-number">1</div>
                        <div class="summary-title">NO HAY</div>
                    </div>
                    <ul class="summary-list">
                        ${faltaItems.map(item => `
                            <li class="summary-item">
                                <span class="summary-bullet">•</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;
                summaryResults.appendChild(card);
            }

            // Luego mostrar items que hay poco
            if (pocoItems.length > 0) {
                const card = document.createElement('div');
                card.className = 'card summary-card warning';
                card.innerHTML = `
                    <div class="summary-header">
                        <div class="summary-number">2</div>
                        <div class="summary-title">HAY POCO</div>
                    </div>
                    <ul class="summary-list">
                        ${pocoItems.map(item => `
                            <li class="summary-item">
                                <span class="summary-bullet">•</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;
                summaryResults.appendChild(card);
            }
        }
    }

    copyList() {
        const pocoItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'poco')
            .map(([item]) => item);
        
        const faltaItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'falta')
            .map(([item]) => item);

        if (pocoItems.length === 0 && faltaItems.length === 0) {
            alert('No hay items para copiar');
            return;
        }

        let listText = `📋 CONTROL DE STOCK\n`;
        listText += `📅 Fecha: ${AppState.currentControl.date}\n`;
        listText += `🕐 Turno: ${AppState.currentControl.shift}\n\n`;
        
        if (faltaItems.length > 0) {
            listText += `1. ❌ NO HAY:\n`;
            faltaItems.forEach(item => {
                listText += `   • ${item}\n`;
            });
            listText += `\n`;
        }
        
        if (pocoItems.length > 0) {
            listText += `2. ⚠️ HAY POCO:\n`;
            pocoItems.forEach(item => {
                listText += `   • ${item}\n`;
            });
        }

        navigator.clipboard.writeText(listText).then(() => {
            const copyText = document.getElementById('copy-text');
            if (copyText) {
                copyText.textContent = '¡Copiado!';
                setTimeout(() => {
                    copyText.textContent = 'Copiar lista';
                }, 2000);
            }
        }).catch(() => {
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = listText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            const copyText = document.getElementById('copy-text');
            if (copyText) {
                copyText.textContent = '¡Copiado!';
                setTimeout(() => {
                    copyText.textContent = 'Copiar lista';
                }, 2000);
            }
        });
    }

    shareWhatsApp() {
        const pocoItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'poco')
            .map(([item]) => item);
        
        const faltaItems = Object.entries(AppState.currentControl.items)
            .filter(([item, state]) => state === 'falta')
            .map(([item]) => item);

        if (pocoItems.length === 0 && faltaItems.length === 0) {
            alert('No hay items para compartir');
            return;
        }

        let message = `📋 CONTROL DE STOCK\n`;
        message += `📅 Fecha: ${AppState.currentControl.date}\n`;
        message += `🕐 Turno: ${AppState.currentControl.shift}\n\n`;
        
        if (faltaItems.length > 0) {
            message += `1. ❌ NO HAY:\n`;
            faltaItems.forEach(item => {
                message += `   • ${item}\n`;
            });
            message += `\n`;
        }
        
        if (pocoItems.length > 0) {
            message += `2. ⚠️ HAY POCO:\n`;
            pocoItems.forEach(item => {
                message += `   • ${item}\n`;
            });
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new StockControlApp();
});
