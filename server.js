const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Datos mock
const projects = [
    {
        id: '1',
        name: 'Proyecto Casa Ejemplo',
        description: 'Casa unifamiliar de 150m²',
        location: 'Santiago, Chile',
        budget: 85000000,
        startDate: '2024-01-15',
        endDate: '2024-08-15',
        status: 'En Progreso'
    }
];

// Datos mock para costos indirectos
const indirectCostItems = {
    GASTO_GENERAL: [
        // Oficina central
        { id: '1', projectId: '1', category: 'GASTO_GENERAL', item: 'Arriendo oficina central', unit: 'Mes', quantity: 8, unitPrice: 1200000, totalCost: 9600000 },
        { id: '2', projectId: '1', category: 'GASTO_GENERAL', item: 'Servicios básicos oficina', unit: 'Mes', quantity: 8, unitPrice: 350000, totalCost: 2800000 },
        { id: '3', projectId: '1', category: 'GASTO_GENERAL', item: 'Internet y telefonía', unit: 'Mes', quantity: 8, unitPrice: 150000, totalCost: 1200000 },
        
        // Administración
        { id: '4', projectId: '1', category: 'GASTO_GENERAL', item: 'Administrador de obra', unit: 'Mes', quantity: 8, unitPrice: 2500000, totalCost: 20000000 },
        { id: '5', projectId: '1', category: 'GASTO_GENERAL', item: 'Jefe de terreno', unit: 'Mes', quantity: 8, unitPrice: 2000000, totalCost: 16000000 },
        { id: '6', projectId: '1', category: 'GASTO_GENERAL', item: 'Prevencionista', unit: 'Mes', quantity: 8, unitPrice: 1800000, totalCost: 14400000 },
        
        // Equipos y herramientas
        { id: '7', projectId: '1', category: 'GASTO_GENERAL', item: 'Herramientas menores', unit: 'Global', quantity: 1, unitPrice: 2500000, totalCost: 2500000 },
        { id: '8', projectId: '1', category: 'GASTO_GENERAL', item: 'Equipos de protección personal', unit: 'Global', quantity: 1, unitPrice: 1500000, totalCost: 1500000 }
    ],
    INSTALACION_FAENA: [
        // Preparación del terreno
        { id: '9', projectId: '1', category: 'INSTALACION_FAENA', item: 'Despeje y limpieza', unit: 'm²', quantity: 500, unitPrice: 2500, totalCost: 1250000 },
        { id: '10', projectId: '1', category: 'INSTALACION_FAENA', item: 'Nivelación de terreno', unit: 'm²', quantity: 500, unitPrice: 3500, totalCost: 1750000 },
        { id: '11', projectId: '1', category: 'INSTALACION_FAENA', item: 'Cerco perimetral', unit: 'ml', quantity: 120, unitPrice: 25000, totalCost: 3000000 },
        
        // Instalaciones provisorias
        { id: '12', projectId: '1', category: 'INSTALACION_FAENA', item: 'Bodega de materiales', unit: 'Global', quantity: 1, unitPrice: 3500000, totalCost: 3500000 },
        { id: '13', projectId: '1', category: 'INSTALACION_FAENA', item: 'Oficina de obra', unit: 'Global', quantity: 1, unitPrice: 2800000, totalCost: 2800000 },
        { id: '14', projectId: '1', category: 'INSTALACION_FAENA', item: 'Baños químicos', unit: 'Un', quantity: 3, unitPrice: 180000, totalCost: 540000 },
        { id: '15', projectId: '1', category: 'INSTALACION_FAENA', item: 'Vestuarios', unit: 'Global', quantity: 1, unitPrice: 1800000, totalCost: 1800000 },
        
        // Servicios provisorios
        { id: '16', projectId: '1', category: 'INSTALACION_FAENA', item: 'Instalación eléctrica provisoria', unit: 'Global', quantity: 1, unitPrice: 2200000, totalCost: 2200000 },
        { id: '17', projectId: '1', category: 'INSTALACION_FAENA', item: 'Instalación de agua provisoria', unit: 'Global', quantity: 1, unitPrice: 1500000, totalCost: 1500000 },
        { id: '18', projectId: '1', category: 'INSTALACION_FAENA', item: 'Empalme eléctrico', unit: 'Global', quantity: 1, unitPrice: 850000, totalCost: 850000 }
    ]
};

// Datos predefinidos para costos indirectos
const predefinedItems = {
    GASTO_GENERAL: [
        // Administración y personal
        { category: 'Administración', item: 'Administrador de obra', unit: 'Mes' },
        { category: 'Administración', item: 'Jefe de terreno', unit: 'Mes' },
        { category: 'Administración', item: 'Prevencionista', unit: 'Mes' },
        { category: 'Administración', item: 'Bodeguero', unit: 'Mes' },
        { category: 'Administración', item: 'Guardia', unit: 'Mes' },
        { category: 'Administración', item: 'Secretaria', unit: 'Mes' },
        
        // Oficina central
        { category: 'Oficina Central', item: 'Arriendo oficina central', unit: 'Mes' },
        { category: 'Oficina Central', item: 'Servicios básicos oficina', unit: 'Mes' },
        { category: 'Oficina Central', item: 'Internet y telefonía', unit: 'Mes' },
        { category: 'Oficina Central', item: 'Consumo eléctrico oficina', unit: 'Mes' },
        { category: 'Oficina Central', item: 'Agua potable oficina', unit: 'Mes' },
        
        // Equipos y herramientas
        { category: 'Equipos', item: 'Herramientas menores', unit: 'Global' },
        { category: 'Equipos', item: 'Equipos de protección personal', unit: 'Global' },
        { category: 'Equipos', item: 'Equipos topográficos', unit: 'Mes' },
        { category: 'Equipos', item: 'Equipos de laboratorio', unit: 'Global' },
        
        // Seguros y garantías
        { category: 'Seguros', item: 'Seguro de construcción', unit: 'Global' },
        { category: 'Seguros', item: 'Seguro de responsabilidad civil', unit: 'Global' },
        { category: 'Seguros', item: 'Garantía de fiel cumplimiento', unit: 'Global' },
        { category: 'Seguros', item: 'Póliza CAR', unit: 'Global' },
        
        // Gastos legales y administrativos
        { category: 'Legales', item: 'Permisos de construcción', unit: 'Global' },
        { category: 'Legales', item: 'Recepción municipal', unit: 'Global' },
        { category: 'Legales', item: 'Certificados y ensayos', unit: 'Global' },
        { category: 'Legales', item: 'Inspección técnica', unit: 'Global' }
    ],
    INSTALACION_FAENA: [
        // Preparación del terreno
        { category: 'Preparación Terreno', item: 'Despeje y limpieza', unit: 'm²' },
        { category: 'Preparación Terreno', item: 'Nivelación de terreno', unit: 'm²' },
        { category: 'Preparación Terreno', item: 'Excavación masiva', unit: 'm³' },
        { category: 'Preparación Terreno', item: 'Relleno compactado', unit: 'm³' },
        { category: 'Preparación Terreno', item: 'Mejoramiento de suelo', unit: 'm²' },
        
        // Cercos y accesos
        { category: 'Cercos y Accesos', item: 'Cerco perimetral', unit: 'ml' },
        { category: 'Cercos y Accesos', item: 'Portón de acceso', unit: 'Un' },
        { category: 'Cercos y Accesos', item: 'Caseta de control', unit: 'Un' },
        { category: 'Cercos y Accesos', item: 'Señalética de obra', unit: 'Global' },
        
        // Instalaciones provisorias - Construcciones
        { category: 'Construcciones Provisorias', item: 'Bodega de materiales', unit: 'Global' },
        { category: 'Construcciones Provisorias', item: 'Oficina de obra', unit: 'Global' },
        { category: 'Construcciones Provisorias', item: 'Vestuarios', unit: 'Global' },
        { category: 'Construcciones Provisorias', item: 'Casino', unit: 'Global' },
        { category: 'Construcciones Provisorias', item: 'Enfermería', unit: 'Global' },
        { category: 'Construcciones Provisorias', item: 'Laboratorio de hormigón', unit: 'Global' },
        
        // Servicios básicos
        { category: 'Servicios Básicos', item: 'Baños químicos', unit: 'Un' },
        { category: 'Servicios Básicos', item: 'Instalación eléctrica provisoria', unit: 'Global' },
        { category: 'Servicios Básicos', item: 'Instalación de agua provisoria', unit: 'Global' },
        { category: 'Servicios Básicos', item: 'Empalme eléctrico', unit: 'Global' },
        { category: 'Servicios Básicos', item: 'Medidor de agua', unit: 'Un' },
        { category: 'Servicios Básicos', item: 'Alcantarillado provisorio', unit: 'Global' },
        
        // Equipos de faena
        { category: 'Equipos Faena', item: 'Grúa torre', unit: 'Mes' },
        { category: 'Equipos Faena', item: 'Montacargas', unit: 'Mes' },
        { category: 'Equipos Faena', item: 'Betonera', unit: 'Mes' },
        { category: 'Equipos Faena', item: 'Vibrador de inmersión', unit: 'Un' },
        { category: 'Equipos Faena', item: 'Andamios metálicos', unit: 'm²' },
        { category: 'Equipos Faena', item: 'Encofrado metálico', unit: 'm²' },
        
        // Seguridad y protección
        { category: 'Seguridad', item: 'Extintor polvo químico', unit: 'Un' },
        { category: 'Seguridad', item: 'Botiquín primeros auxilios', unit: 'Un' },
        { category: 'Seguridad', item: 'Malla de seguridad', unit: 'm²' },
        { category: 'Seguridad', item: 'Cinta de peligro', unit: 'ml' },
        { category: 'Seguridad', item: 'Señalización de seguridad', unit: 'Global' }
    ]
};

// =================== RUTAS API ===================

// Salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Obtener todos los proyectos
app.get('/api/projects', (req, res) => {
    res.json({
        success: true,
        data: projects
    });
});

// Obtener proyecto por ID
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
        return res.status(404).json({
            success: false,
            message: 'Proyecto no encontrado'
        });
    }
    res.json({
        success: true,
        data: project
    });
});

// ================= RUTAS DE COSTOS INDIRECTOS =================

// Obtener costos indirectos de un proyecto
app.get('/api/projects/:projectId/indirect-costs', (req, res) => {
    const { projectId } = req.params;
    
    const projectIndirectCosts = {
        GASTO_GENERAL: indirectCostItems.GASTO_GENERAL.filter(item => item.projectId === projectId),
        INSTALACION_FAENA: indirectCostItems.INSTALACION_FAENA.filter(item => item.projectId === projectId)
    };
    
    // Calcular totales
    const totalGastoGeneral = projectIndirectCosts.GASTO_GENERAL.reduce((sum, item) => sum + item.totalCost, 0);
    const totalInstalacionFaena = projectIndirectCosts.INSTALACION_FAENA.reduce((sum, item) => sum + item.totalCost, 0);
    const total = totalGastoGeneral + totalInstalacionFaena;
    
    res.json({
        success: true,
        data: {
            indirectCosts: [...projectIndirectCosts.GASTO_GENERAL, ...projectIndirectCosts.INSTALACION_FAENA],
            totals: {
                GASTO_GENERAL: totalGastoGeneral,
                INSTALACION_FAENA: totalInstalacionFaena,
                total: total
            }
        }
    });
});

// Crear nuevo costo indirecto
app.post('/api/projects/:projectId/indirect-costs', (req, res) => {
    const { projectId } = req.params;
    const { category, item, unit, quantity, unitPrice } = req.body;
    
    if (!category || !item || !unit || !quantity || !unitPrice) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
        });
    }
    
    const totalCost = quantity * unitPrice;
    const newItem = {
        id: Date.now().toString(),
        projectId,
        category,
        item,
        unit,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(unitPrice),
        totalCost
    };
    
    indirectCostItems[category].push(newItem);
    
    res.json({
        success: true,
        message: 'Costo indirecto creado exitosamente',
        data: newItem
    });
});

// Actualizar costo indirecto
app.put('/api/indirect-cost-items/:itemId', (req, res) => {
    const { itemId } = req.params;
    const { category, item, unit, quantity, unitPrice } = req.body;
    
    // Buscar el ítem en ambas categorías
    let foundItem = null;
    let foundCategory = null;
    
    for (const cat of ['GASTO_GENERAL', 'INSTALACION_FAENA']) {
        const index = indirectCostItems[cat].findIndex(item => item.id === itemId);
        if (index !== -1) {
            foundItem = indirectCostItems[cat][index];
            foundCategory = cat;
            break;
        }
    }
    
    if (!foundItem) {
        return res.status(404).json({
            success: false,
            message: 'Ítem no encontrado'
        });
    }
    
    // Actualizar campos
    foundItem.category = category;
    foundItem.item = item;
    foundItem.unit = unit;
    foundItem.quantity = parseFloat(quantity);
    foundItem.unitPrice = parseFloat(unitPrice);
    foundItem.totalCost = foundItem.quantity * foundItem.unitPrice;
    
    res.json({
        success: true,
        message: 'Costo indirecto actualizado exitosamente',
        data: foundItem
    });
});

// Eliminar costo indirecto
app.delete('/api/indirect-cost-items/:itemId', (req, res) => {
    const { itemId } = req.params;
    
    // Buscar y eliminar el ítem en ambas categorías
    let found = false;
    
    for (const cat of ['GASTO_GENERAL', 'INSTALACION_FAENA']) {
        const index = indirectCostItems[cat].findIndex(item => item.id === itemId);
        if (index !== -1) {
            indirectCostItems[cat].splice(index, 1);
            found = true;
            break;
        }
    }
    
    if (!found) {
        return res.status(404).json({
            success: false,
            message: 'Ítem no encontrado'
        });
    }
    
    res.json({
        success: true,
        message: 'Costo indirecto eliminado exitosamente'
    });
});

// Obtener ítems predefinidos
app.get('/api/indirect-costs/predefined-items', (req, res) => {
    res.json({
        success: true,
        data: predefinedItems
    });
});

// Ruta para servir el index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📋 Aplicación disponible en: http://localhost:${PORT}`);
});
