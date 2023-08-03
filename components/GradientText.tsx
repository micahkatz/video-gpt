import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode
}

const GradientText = (props: Props) => {
    const {className, ...propsWithoutClassName} = props
  return (
      <span
          className={twMerge("bg-gradient-to-r from-accent to-secondaryAccent bg-clip-text text-transparent", className)}
          {...propsWithoutClassName}
          >
          {props.children}
      </span>  
      )
}

export default GradientText