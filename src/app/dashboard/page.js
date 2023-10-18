'use client'
import { FileButton, Button, Center, Group, Paper, Text, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import Papa from 'papaparse';

export default function Dashboard() {
    const [aircraftsubmitting, setASubmit] = useState(false);
    const [switchsubmitting, setSwitchSubmit] = useState(false);
    const fileupload = async(file,url,message) => {
        const config = {
            header:true,
            skipEmptyLines:true,
            transformHeader:function (header) {
                    return header.replaceAll(" ","").toLowerCase();
            },
            complete: async function(results){
                const res = await fetch(url,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(results)
                })
                if (res.ok){
                    const resdata = await res.json();
                    console.log(resdata);
                    setASubmit(false);
                    setSwitchSubmit(false);
                    notifications.show({
                        title:"Upload Successful",
                        message:message
                    })
                }
            }
        }
        Papa.parse(file,config);
    }

    return (
        <Stack h="100%" justify="center">
            <Center>
                <Paper w="20%" h="100%" shadow="md" radius="lg" withBorder p="xl">
                    <Text>Upload Aircraft List from Palantir:</Text>
                    <Group mt={10} justify="center">
                        <FileButton onChange={(file) => {fileupload(file,'/api/aircraft',"Aircraft List will be refreshed momentarily...");setASubmit(true)}}>
                            {(props) => <Button loading={aircraftsubmitting} {...props}>Upload Aircraft List</Button>}
                        </FileButton>
                    </Group>
                    <Text mt={10}>Upload csv of switches: </Text>
                    <Group mt={10} justify='center'>
                        <FileButton onChange={(file) => {fileupload(file,'/api/switches',"Switches have been added to the database");setSwitchSubmit(true)}}>
                            {(props) => <Button loading={switchsubmitting} {...props}>Upload Switch List</Button>}
                        </FileButton>
                    </Group>
                </Paper>
            </Center>
        </Stack>
    )
}