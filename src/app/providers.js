'use client';
import {createContext, useState, useContext} from 'react';

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
      <AircraftContext.Provider value={value}>{children}</AircraftContext.Provider>
  );
}
