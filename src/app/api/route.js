import { PrismaClient} from ".prisma/client"

const prisma = new PrismaClient();

export async function GET(request){
    const tbversion = prisma.tbv.findFirst({
        select:{
            tbversion:true
        }
    });
}