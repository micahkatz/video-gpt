import React from 'react'
import GradientText from './GradientText'

type Props = {
    query: string
}

const InQueue = (props: Props) => {
    return (
        <div className='flex flex-col text-center items-center'>
            <p className='text-text text-6xl font-bold mb-8'>Generating Video</p>
            <p className="mb-8 text-3xl border-none outline-none text-center w-fit bg-primary-200 py-2 px-4 rounded-xl">{props.query}</p>

            <GradientText className='text-3xl'>{props.query}</GradientText>
            <p className='text-text text-2xl mb-2'>Your Spot in the Queue</p>
            <p className='text-text text-2xl font-bold mb-8'>8/22</p>
            <div className="w-96 mb-5 h-4 overflow-hidden rounded-full bg-primary-200">
                <div className="transition-all h-4 animate-pulse rounded-full bg-gradient-to-br from-accent to-secondaryAccent" style={{ width: '90%' }}/>
            </div>
            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Cancel</button>

        </div>
    )
}

export default InQueue