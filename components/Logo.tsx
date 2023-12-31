import React from 'react'

type Props = {}

const Logo = (props: Props) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='fill-primary-700' fill-rule="evenodd" clip-rule="evenodd"
                d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM16.5 18C18.7091 18 20.5 16.2091 20.5 14C20.5 11.7909 18.7091 10 16.5 10C14.2909 10 12.5 11.7909 12.5 14C12.5 16.2091 14.2909 18 16.5 18Z" />
        </svg>
    )
}

export default Logo