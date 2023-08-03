
import axios from 'axios';
import React from 'react'
import Video from '../components/Video';
import {
    useQuery
} from 'react-query';
import Header from '../components/Header';
import Layout from '../components/Layout';
type Props = {}

const result = (props: Props) => {

    const getVideo = async () => {

        const response = await axios.get('/api/getLatestVideo')

        console.log(response.data)

        return response.data?.url
    }
    const query = useQuery('video', getVideo)
    return (
        <Layout>
            <Video url={query.data}/>
        </Layout>
    )
}

export default result