import { PrismaClient } from '@prisma/client';
import path from 'path';

const prismaClientSingleton = () => {
    // Debug log to verify if ENV is loaded correctly
    console.log('Initializing Prisma Client');
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

    // In Vercel, the file is likely at process.cwd() + /prisma/icd10.db
    // We need to override the datasource url to be absolute to be safe.
    const dbPath = path.join(process.cwd(), 'prisma', 'icd10.db');
    console.log('Resolved DB Path:', dbPath);

    const url = `file:${dbPath}`;

    return new PrismaClient({
        datasources: {
            db: {
                url,
            },
        },
    });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
