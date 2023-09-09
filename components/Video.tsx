import ReactPlayer, { ReactPlayerProps } from "react-player";

import React, { useEffect, useState } from "react";
import BaseReactPlayer from "react-player/base";
import { PiSpeakerSimpleHighDuotone, PiSpeakerSimpleSlashDuotone } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import styles from "/styles/Video.module.css";
interface Props extends ReactPlayerProps {}

const Video = (props: Props) => {
  const { className, ...withoutClassName } = props;
  const [muted, setMuted] = useState(true);
  return (
    <>
      {props.url && (
        <div className={twMerge(className, "relative")}>
          <ReactPlayer
            className={twMerge(styles.reactPlayer, "mb-2")}
            {...withoutClassName}
            volume={0.25}
            stopOnUnmount
            playing
            controls
            muted={muted}
          />
          {/* {!muted ? (
            <PiSpeakerSimpleHighDuotone onClick={() => setMuted(true)} className="cursor-pointer hover:scale-105" />
          ) : (
            <PiSpeakerSimpleSlashDuotone onClick={() => setMuted(false)} className="cursor-pointer hover:scale-105" />
          )} */}
        </div>
      )}
    </>
  );
};

export default Video;
