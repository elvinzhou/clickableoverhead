import { PrismaClient} from ".prisma/client"

const prisma = new PrismaClient();

export async function GET(request){
    //Need to recreate the link to hack together deep linking.
    //URL is toolboxremote777.ual.com/{{toolboxversion}}/ToolboxRemote.html#/AIPC/bid/38987421/data/k{{ATAREFERENCE}}/ap/{{MSN}}
    //Does 38987421 ever change? What does it mean? Make it rversion then.
    const tail = request.nextUrl.searchParams.get('tail');
    const switchid = request.nextUrl.searchParams.get('switchid');
    const [versions, msn, atareference] = await Promise.all(prisma.versions.findFirst(),prisma.aircraft.findUnique({
        where:{
            tail: tail
        },
        select:{
            msn:true
        }
    }),prisma.switches.findFirst({
        where:{
            id:switchid
        },
        select:{
            atareference:true
        }
    }));
    const url = versions.url + "/" + versions.tbversion + "/ToolboxRemote.html#/AIPC/bid/" + versions.rversion + "/data/k" + atareference + "/ap/" + msn;
    return Response.redirect(url);
}