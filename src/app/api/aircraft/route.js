import { prisma } from "@/app/prismaclient";


export async function POST(request){
    const data = await request.json();
    const ret = await Promise.all(data.map(aircraft => {
        const tail = parseInt(aircraft.aircraft_id);
        const msn = parseInt(aircraft.manufacture_serial_number.slice(0,6));
        return prisma.aircraft.upsert({
            where:{
                tail:tail
            },
            update:{
                msn:msn,
                fleet:aircraft.fmis_fleet_type_code
            },
            create:{
                tail:tail,
                msn:msn,
                fleet:aircraft.fmis_fleet_type_code
            }
        });
    }))
    Response.json(ret);
}