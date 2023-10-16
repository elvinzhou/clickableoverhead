import { prisma } from "@/app/prismaclient";


export async function POST(request){
    const data = await request.json();
    const ret = await Promise.all(data.map(item => {
        return prisma.switches.upsert({
            where:{
                switchid:item.switchid,
                atareference:item.atareference
            },
            update:{
                switchdesc:item.switchdesc,
                legend:item.legend,
                equipnum:item.equipnum,
                cmm:item.cmm,
                panel:item.panel,
                effectivity:item.effectivity,                
            },
            create:{
                switchdesc:item.switchdesc,
                legend:item.legend,
                equipnum:item.equipnum,
                cmm:item.cmm,
                panel:item.panel,
                effectivity:item.effectivity,
                switchid:item.switchid,
                atareference:item.atareference
            }
        });
    }))
    Response.json(ret);
}