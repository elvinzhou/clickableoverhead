import { PrismaClient } from "@prisma/client";
import Home from "./home";

const prisma = new PrismaClient();

export default async function App() {

  const aircraft = await prisma.aircraft.findMany();
  const aircraftlist = aircraft.map(item => item.tail);

  return (
    <Home aircraft={aircraft} aircraftlist={aircraftlist} />
  )
}
