import ReactPlayer, { ReactPlayerProps } from "react-player";

import React, { useEffect } from "react";
import BaseReactPlayer from "react-player/base";
import { PiPlayDuotone } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import styles from '/styles/Video.module.css'
interface Props extends ReactPlayerProps {}

const Video = (props: Props) => {
    const {className, ...withoutClassName} = props
  return (
    <>
      {props.url && (
        <div className={twMerge(className,'')}>
            <ReactPlayer className={styles.reactPlayer} {...withoutClassName} volume={.5} stopOnUnmount playing muted />  
        </div>
      )}
    </>
  );
};

export default Video;
