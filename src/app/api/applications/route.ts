import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { createdAt: "desc" }, // les plus récentes d'abord
        });
        return Response.json(applications);
    } catch (error) {
        console.error("Erreur récupération applications", error);
        return new Response( "Erreur serveur", { status: 500 });
    }
}
