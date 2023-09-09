import { useUser } from '@clerk/nextjs'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {}

const UsesLeft = (props: Props) => {
    const { user } = useUser();

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm'>{user?.publicMetadata?.numTimesUsed}/5</span>
            <div className="w-[5rem] bg-primary-200 h-2 rounded-lg overflow-hidden">
                <div style={{ width: `${(user?.publicMetadata?.numTimesUsed / 5) * 100}%`}} className='h-2 rounded-lg bg-gradient-to-br from-accent to-secondaryAccent' />
            </div>
        </div>
    )
}

export default UsesLeft