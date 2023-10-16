import { prisma } from "@/app/prismaclient";

export async function GET(request){
    //Need to recreate the link to hack together deep linking.
    //URL is toolboxremote777.ual.com/{{toolboxversion}}/ToolboxRemote.html#/AIPC/bid/38987421/data/k{{ATAREFERENCE}}/ap/{{MSN}}
    //Does 38987421 ever change? What does it mean? Make it rversion then.
    const isInRanges = (ranges, num) => {
        return ranges.split(',')
          .map(r => r.split('-')) // we're splitting right away
          .some(r => r.length == 1 ? num == +r[0] : num >= +r[0] && num <= +r[1]);
      }
      
    const tail = request.nextUrl.searchParams.get('tail');
    const switchid = request.nextUrl.searchParams.get('switchid');
    const [versions, aircraft, switches] = await Promise.all([prisma.versions.findFirst(),prisma.aircraft.findUnique({
        where:{
            tail: tail
        }
    }),prisma.switches.findMany({
        where:{
            switchid:switchid
        }
    })]);
    const filterswitches = switches.filter(r => isInRanges(r.effectivity, aircraft.cec));
    
    const switchreturn = filterswitches.map(item => {
        item.url = versions.url + "/" + versions.tbversion + "/ToolboxRemote.html#/AIPC/bid/" + versions.rversion + "/data/k" + item.atareference + "/ap/" + aircraft.msn;
        return item;
    })
    return Response.json(switchreturn);
}