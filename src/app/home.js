'use client'
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Button, Center, Autocomplete, Paper, Text, Stack } from '@mantine/core';
import { AircraftContext } from './providers';

export default function Home(props) {
  const { aircraft, setAircraft } = useContext(AircraftContext);
  const [buttondis, setButtonDis] = useState(true);
  const [aircraftnum, setAircraftNum] = useState();
  const aircraftdata = props.aircraft;
  const aircraftlist = props.aircraftlist;

  return (
    <Stack h="100%" justify="center">
      <Center>
        <Paper w="20%" h="100%" shadow="md" radius="lg" withBorder p="xl">
          <Text>Select Aircraft:</Text>
          <Autocomplete mt={10} mb={10} data={aircraftlist} onOptionSubmit={(e) => {
            setAircraftNum(e);
            const newval = aircraftdata.filter(item => parseInt(item.tail) === parseInt(e));
            setAircraft(newval[0]);
            setButtonDis(false)
          }
          }
          />
          <Button w="100%" data-disabled={buttondis} component={Link} href={`/${aircraft.fleet}`} >Go</Button>
        </Paper>
      </Center>
    </Stack>
  )
}
