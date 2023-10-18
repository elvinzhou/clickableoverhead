import Home from "./home";
import { prisma } from "./prismaclient";



export default async function App() {

  const aircraft = await prisma.aircraft.findMany();
  const aircraftlist = aircraft.map(item => item.tail);

  return (
    <Home aircraft={aircraft} aircraftlist={aircraftlist} />
  )
}
