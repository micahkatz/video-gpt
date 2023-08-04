import React, { useEffect, useState } from 'react'
import GradientText from './GradientText'
import clerk,{ clerkClient, currentUser, useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

type Props = {
    query: string;
    setIsProcessingInBackground: React.Dispatch<React.SetStateAction<boolean>>
}

const InQueue = (props: Props) => {
      const { user } = useUser();
    const [lastVideo, setLastVideo] = useState(user.publicMetadata?.lastVideo)
    const router = useRouter()

    useEffect(() => {
        if(user){
            console.log(user.publicMetadata)
            if (user.publicMetadata?.lastVideo !== lastVideo){
                setLastVideo(user.publicMetadata?.lastVideo)
                // send to the video page
                console.log('Video has finished processing')
                router.push('/user/latestVideo')
            } else {
                console.log('video is the same as last time')
            }
        } else {
            console.error('User not logged in')
        }
    }, [user?.publicMetadata])
    return (
        <div className='flex flex-col text-center items-center'>
            <p className='text-text text-6xl font-bold mb-8'>Generating Video</p>
            <GradientText className='text-3xl mb-8'>{props.query || 'How to tie a tie'}</GradientText>
            <div className="w-96 mb-5 h-4 overflow-hidden rounded-full bg-primary-200">
                <div className="transition-all h-4 animate-pulse rounded-full bg-gradient-to-br from-accent to-secondaryAccent" style={{ width: '90%' }}/>
            </div>
            {/* <p className='text-text text-2xl mb-2'>Your Spot in the Queue</p>
            <p className='text-text text-2xl font-bold mb-8'>8/22</p> */}
            <button onClick={() =>props.setIsProcessingInBackground(false)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Cancel</button>

        </div>
    )
}

export default InQueue