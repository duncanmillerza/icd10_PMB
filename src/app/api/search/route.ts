import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { codes } = await request.json();

        if (!Array.isArray(codes) || codes.length === 0) {
            return NextResponse.json({ results: [] });
        }

        // 1. Fetch Codes
        const foundCodes = await prisma.iCD10Code.findMany({
            where: {
                code: {
                    in: codes,
                },
            },
        });

        // 2. Fetch PMB Links (where our codes are either dagger or asterisk)
        const pmbLinks = await prisma.pMBLink.findMany({
            where: {
                OR: [
                    { daggerCode: { in: codes } },
                    { asteriskCode: { in: codes } },
                ],
            },
        });

        // 3. Map outcomes
        // We want to return a result for EACH unique requested code found, 
        // plus any 'extra' context from PMB links if relevant.
        // Or just return the list of found codes enriched with PMB data.

        const results = foundCodes.map((code) => {
            // Find related PMB links
            const relatedLinks = pmbLinks.filter(
                (link) => link.daggerCode === code.code || link.asteriskCode === code.code
            );

            return {
                ...code,
                pmbLinks: relatedLinks,
            };
        });

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
