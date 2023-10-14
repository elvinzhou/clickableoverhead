import Image from 'next/image';
import t7overhead from "../../public/777overhead.svg";

export default function Home() {
  return (
    <Image
    priority
    src={t7overhead}
    />
  )
}
