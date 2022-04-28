import React from "react";
import {useParams} from "react-router-dom";
import {Box, Progress, Text} from "@chakra-ui/react";
import {useFetch} from "../../hooks/use-fetch";
import {apiUrl} from "../profile/me";

export function TeacherDetail() {
    const {teacherId} = useParams()

    const {
        data, error, loading
    } = useFetch<{ teacher: any }>(`${apiUrl}/teachers/${teacherId}`)

    if (loading) {
        return (
            <Progress isIndeterminate/>
        )
    }

    if (error || !data) {
        return (
            <Text>Sorry, we have not found any teacher.</Text>
        )
    }

    return (
        <div style={{marginTop: 30}}>

            <Box bg='white'
                 w='100%'
                 p={4}
                 color='black'
                 borderRadius='md'
                 boxShadow='2xl'
                 border='1px'
                borderColor='gray.200'>
                {data.teacher.name}
                <br/>
                {data.teacher.email}
                <br/>
                {data.teacher.createdAt}
            </Box>

        </div>
    )
}