import { prisma } from "@/app/prismaclient";


export async function POST(request){
    const data = await request.json();
    const ret = await Promise.all(data.data.map(aircraft => {
        const tail = parseInt(aircraft.aircraft_id);
        const msn = parseInt(aircraft.msn);
        const cec = parseInt(aircraft.cec);
        if (!tail || !msn || !cec || !aircraft.fmis_fleet_type_code){
            console.log("Empty Fields Detected for " + JSON.stringify(aircraft));
            return;
        }
        return prisma.aircraft.upsert({
            where:{
                tail:tail
            },
            update:{
                msn:msn,
                fleet:aircraft.fmis_fleet_type_code,
                cec:cec
            },
            create:{
                tail:tail,
                msn:msn,
                fleet:aircraft.fmis_fleet_type_code,
                cec:cec
            }
        });
    }))
    return Response.json(ret);
}