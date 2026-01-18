import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    // Debug log to verify if ENV is loaded correctly
    // Note: Vercel serverless logs will show this
    console.log('Initializing Prisma Client');
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

    return new PrismaClient();
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
