'use client';
import {createContext, useState, useContext} from 'react';
import { MantineProvider } from '@mantine/core';

export const AircraftContext = createContext({
  aircraft:{
    fleet:"777"
  },
  setAircraft:() => {}
});

export function Providers({ children }) {
    const [aircraft, setAircraft] = useState({
      aircraft:{
        fleet:"777"
      },
      setAircraft:() => {}
    });
    const value = {aircraft, setAircraft}      

  return (
    <AircraftContext.Provider value={value}>
    <MantineProvider>
      {children}
    </MantineProvider>
    </AircraftContext.Provider>
  );
}
