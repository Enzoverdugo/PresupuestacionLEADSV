# Sistema de Presupuestación de Proyectos

Una aplicación web moderna para la gestión de presupuestos de construcción, desarrollada como evolución digital del sistema Excel OE-LEAD-2024-000.

## 🎯 Objetivo

Replicar con 100% de fidelidad la lógica de cálculo y estructura jerárquica del sistema de presupuestación original, mejorando la eficiencia, colaboración y trazabilidad.

## 🏗️ Arquitectura del Sistema

### Metodología Bottom-Up
- **Tarifas Base**: Cálculo de costos fundamentales (mano de obra, equipos, materiales)
- **APU**: Análisis de Precios Unitarios para cada tarea
- **Agregación**: Consolidación de costos por partidas
- **Oferta Final**: Aplicación de gastos generales y utilidades

### Estructura de Fases
- **Fase 0**: Configuración del Sistema (✅ Completado)
- **Fase 1**: Módulos Maestros (Mano de Obra, Equipos, Materiales)
- **Fase 2**: Motor de Presupuestación (Proyectos, APU Jerárquico)
- **Fase 3**: Costos Indirectos (Gastos Generales)
- **Fase 4**: Oferta Final y Reportes

## 🚀 Stack Tecnológico

### Backend
- **Node.js** con Express
- **TypeScript** para tipado estricto
- **Prisma ORM** para gestión de base de datos
- **PostgreSQL** como base de datos

### Frontend (Próximamente)
- **React** con TypeScript
- **Tailwind CSS** para estilos
- **Interfaz jerárquica** para presupuestos

## 📋 Estado Actual

### ✅ Fase 0 - Módulo 0: Configuración del Sistema
- [x] Modelo de datos `SystemConfig` en Prisma
- [x] API REST para configuración (`GET /api/config`, `PUT /api/config`)
- [x] Auto-inicialización con valores por defecto
- [x] Gestión de parámetros globales:
  - Datos de la empresa
  - Parámetros financieros (IVA, moneda)
  - Valores por defecto para cálculos

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL (o usar Prisma Dev)
- npm o yarn

### Configuración
1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   # Editar .env con sus configuraciones
   ```

3. **Configurar base de datos**:
   ```bash
   # Opción 1: Usar Prisma Dev (recomendado para desarrollo)
   npx prisma dev
   
   # Opción 2: Usar PostgreSQL existente
   npm run db:push
   ```

4. **Generar cliente Prisma**:
   ```bash
   npm run db:generate
   ```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Iniciar servidor en modo desarrollo
npm run build         # Compilar TypeScript
npm start            # Iniciar servidor de producción

# Base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Aplicar schema a BD
npm run db:migrate   # Ejecutar migraciones
npm run db:studio    # Abrir Prisma Studio
```

## 📡 API Endpoints

### Configuración del Sistema
- `GET /api/config` - Obtener configuración (crea automáticamente si no existe)
- `PUT /api/config` - Actualizar configuración

### Health Check
- `GET /api/health` - Verificar estado de la API

## 🧪 Testing de la API

### Configuración del Sistema
```bash
# Obtener configuración
curl http://localhost:3000/api/config

# Actualizar configuración
curl -X PUT http://localhost:3000/api/config \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Mi Empresa Constructora S.A.",
    "defaultCurrency": "CLP",
    "ivaPercentage": 19.0,
    "defaultUtilityPercentage": 12.0,
    "defaultEffectiveHours": 180.0
  }'
```

## 📚 Documentación del Modelo de Negocio

El sistema replica la lógica del Excel OE-LEAD-2024-000 con los siguientes componentes clave:

### Configuración Global (SystemConfig)
- **Datos de Empresa**: Nombre, logo para reportes
- **Parámetros Financieros**: Moneda, IVA
- **Valores por Defecto**: Utilidades, horas efectivas mensuales

### Flujo de Datos
1. **Motores de Costos**: ECO-05 (Mano de Obra), ECO-06 (Equipos), Mat-01 (Materiales)
2. **Asignación de Recursos**: Inicio_Distrib (HH/HM por tarea)
3. **APU**: Serie ECO-04 (Precios unitarios por tarea)
4. **Agregación**: ECO-02 (Presupuesto maestro)
5. **Oferta Final**: ECO-01 (Con gastos generales y utilidades)

## 🔮 Próximos Pasos

### Fase 1: Módulos Maestros
- [ ] Maestro de Mano de Obra (ECO-05)
- [ ] Maestro de Equipos (ECO-06)  
- [ ] Maestro de Materiales (Mat-01)

### Fase 2: Motor de Presupuestación
- [ ] Gestión de Proyectos
- [ ] Constructor de Presupuestos Jerárquico
- [ ] Sistema de APU

## 🤝 Contribución

Este proyecto sigue las convenciones establecidas en `.github/copilot-instructions.md` para mantener consistencia en el código.

## 📄 Licencia

ISC License
