import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {}

const numTimesUsed = 4
const UsesLeft = (props: Props) => {
    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm'>4/5</span>
            <div className="w-[5rem] bg-primary-200 h-2 rounded-lg overflow-hidden">
                <div className={twMerge('w-0 h-2 rounded-lg bg-gradient-to-br from-accent to-secondaryAccent', `w-[${numTimesUsed}rem]`)} />
            </div>
        </div>
    )
}

export default UsesLeft