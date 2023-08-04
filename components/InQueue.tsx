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
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    const secondsToEnd = 180
    const msToEnd = 1000 * secondsToEnd
    const totalIntervals = 100
    useEffect(() => {
        var currInterval = 0
        const interval = setInterval(() => {
            setProgress(prev => (currInterval / totalIntervals))
            if(currInterval >= totalIntervals) {
                return
            }
            currInterval++
        }, msToEnd / totalIntervals);

        return () => clearInterval(interval)
    },[])
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
                <div className="transition-all duration-1000 h-4 animate-pulse rounded-full bg-gradient-to-br from-accent to-secondaryAccent" style={{ width: `${progress * 100}%` }}/>
            </div>
            {/* <p className='text-text text-2xl mb-2'>Your Spot in the Queue</p>
             */}
            <button onClick={() => props.setIsProcessingInBackground(false)} type="button" className="text-white bg-primary-950 py-2 px-4 rounded-lg mb-2 hover:scale-105">Try Again</button>

        </div>
    )
}

export default InQueue