'use client'
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; 
import {Button, Container, AutoComplete} from '@mantine/core';

export default async function Home(props) {
const router = useRouter();
const [aircraftnum, setAircraftNum] = useState(); 
const aircraft = props.aircraft;
const aircraftlist = props.aircraftlist;

const handleClick = () => {
    const aircraftval = aircraft.filter(item => item.tail === aircraftnum);
    router.push('/777')
    //Would like to use link. Also need to send the data over to the new route as well.
}

  return (
  <Container>
    <AutoComplete data={aircraftlist} value={aircraftnum} onChange={setAircraftNum} />
    <Button onClick={handleClick}>Go</Button>
  </Container>
  )
}
