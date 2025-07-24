import prisma from './src/config/database';

async function initializeDatabase() {
  try {
    console.log('🔄 Intentando inicializar base de datos...');
    
    // Verificar conexión
    await prisma.$connect();
    console.log('✅ Conexión establecida');
    
    // Intentar crear las tablas usando SQL directo
    console.log('🔧 Creando tablas...');
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SystemConfig" (
        "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "companyName" TEXT NOT NULL DEFAULT 'Mi Empresa Constructora',
        "companyLogoUrl" TEXT,
        "defaultCurrency" TEXT NOT NULL DEFAULT 'CLP',
        "ivaPercentage" DECIMAL(5,2) NOT NULL DEFAULT 19.00,
        "defaultUtilityPercentage" DECIMAL(5,2) NOT NULL DEFAULT 15.00,
        "effectiveWorkingHoursPerDay" DECIMAL(4,2) NOT NULL DEFAULT 8.00,
        "workingDaysPerMonth" INTEGER NOT NULL DEFAULT 20,
        "ausentismoPercentage" DECIMAL(5,2) NOT NULL DEFAULT 5.00,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "LaborRole" (
        "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "baseSalary" DECIMAL(12,2) NOT NULL,
        "bonuses" DECIMAL(12,2) NOT NULL DEFAULT 0,
        "socialSecurityTax" DECIMAL(5,2) NOT NULL DEFAULT 25.0,
        "taxableIncome" DECIMAL(12,2) NOT NULL,
        "totalMonthlyCost" DECIMAL(12,2) NOT NULL,
        "costPerHour" DECIMAL(10,4) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('✅ Tablas creadas correctamente');
    
    // Probar insertar datos de prueba
    console.log('🧪 Probando inserción de datos...');
    
    const config = await prisma.systemConfig.create({
      data: {}
    });
    
    console.log('✅ Configuración creada:', config);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDatabase();
