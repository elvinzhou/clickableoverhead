import { FileButton, Button, Center, Group, Paper, Text, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Papa from 'papaparse';

export default function Dashboard() {
    const fileupload = async(file,url,message) => {
        const config = {
            complete: async function(results){
                const res = await fetch(url,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(results)
                })
                if (res.ok){
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
                    <Group justify="center">
                        <FileButton onChange={(file) => fileupload(file,'/api/aircraft',"Aircraft List will be refreshed momentarily...")}>
                            {(props) => <Button {...props}>Upload Aircraft List</Button>}
                        </FileButton>
                        <FileButton onChange={(file) => fileupload(file,'/api/switches',"Switches have been added to the database")}>
                            {(props) => <Button {...props}>Upload Switch List</Button>}
                        </FileButton>
                    </Group>

                </Paper>
            </Center>
        </Stack>
    )
}