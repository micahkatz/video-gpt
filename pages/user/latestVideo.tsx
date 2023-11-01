
import axios from 'axios';
import React from 'react'
import Video from '../../components/Video';
import {
    useQuery
} from 'react-query';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
type Props = {}

const latestVideo = (props: Props) => {

    const getVideo = async () => {

        const response = await axios.get('/api/getLatestVideo')

        return response.data?.url
    }
    const query = useQuery("video", getVideo, {
      staleTime: 72000000,
    });
    return (
        <Layout className='flex flex-1 items-center justify-center w-screen'>
            <Video url={query.data} className='mt-2 h-screen' width={'calc(100vw - 4rem)'} />
        </Layout>
    )
}

export default latestVideo