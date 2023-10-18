'use client'
import T7overhead from "../../../assets/777overhead.svg";
import React, { useEffect, useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, ActionIcon, Table, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { AircraftContext } from "../providers";
import { useRouter } from "next/navigation";


export default function TripleSeven() {
  const router = useRouter();
  const { aircraft } = useContext(AircraftContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [rows, setRows] = useState();
  useEffect(() => {
    if (!aircraft.tail){
      router.push('/');
    }
    const svgElement = document.getElementById('t7overhead')
    console.log(svgElement);
    if (svgElement) {
      const rectElements = svgElement.querySelectorAll("rect");
      const handleClick = async (event) => {
        console.log(event.target.id);
        const url = "/api/url?id=" + event.target.id + "&ac=" + aircraft.tail;
        const switcharray = await fetch(url).then(res => res.json());
        const rowdata = switcharray.map(item => (
            <Table.Tr key={item.id}>
            <Table.Td>{item.panel}</Table.Td>
            <Table.Td>{item.equipnum}</Table.Td>
            <Table.Td>{item.cmm}</Table.Td>
            <Table.Td>{item.effectivity}</Table.Td>
            <Table.Td>{item.switchdesc}</Table.Td>
            <Table.Td><ActionIcon component="a" target="_blank" href={item.url}><IconExternalLink /></ActionIcon></Table.Td>
          </Table.Tr>
        )
        );
        setRows(rowdata);
        open();
      };
      rectElements.forEach(rect => {
        rect.addEventListener("click", handleClick);
      })

    }
    return () => {
      const handleClick = (event) => {
        console.log(event.target);
      };
      const rectElements = svgElement.querySelectorAll('rect');
      rectElements.forEach(rect => {
        rect.removeEventListener('click', handleClick);
      })
    }
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Switches" centered>
        {rows?.length ? (
          <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Panel</Table.Th>
              <Table.Th>Equipment Num</Table.Th>
              <Table.Th>CMM</Table.Th>
              <Table.Th>Effectivity</Table.Th>
              <Table.Th>Switch Description</Table.Th>
              <Table.Th>Link to IPC</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        ):(
          <Text>No Switch Data Returned...</Text>
        )}
      </Modal>
      <T7overhead id="t7overhead" />
    </>
  )
}