import axios from 'axios';
import ReactPlayer from 'react-player';
import {
    useQuery
} from 'react-query';
type Props = {}

const Video = (props: Props) => {

    const getVideo = async () => {

        const response = await axios.get('/api/getLatestVideo')

        console.log(response.data)

        return response.data?.url
    }
    const query = useQuery('video', getVideo)

    return (
        <>
            {query?.data && <ReactPlayer url={query.data} controls />}
        </>
    )
}

export default Video