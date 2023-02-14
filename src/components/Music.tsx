import React, { useState } from 'react';
import styled from 'styled-components';
import { IoVolumeHigh, IoVolumeLow } from 'react-icons/io5';

interface Props {
  musicSrc: string;
}

const MusicPlayer: React.FC<Props> = ({ musicSrc }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
  }, [isMuted]);

  return (
    <Main>
      <div className="text-3xl text-gray-100">
        <audio ref={audioRef} src={musicSrc} loop />
        {/* <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button> */}
        <button
          onClick={toggleMute}
          className={`text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5`}
        >
          {isMuted ? <IoVolumeLow /> : <IoVolumeHigh />}
        </button>
      </div>
    </Main>
  );
};

const Main = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  padding: 30px;
  margin-top: 30px;
`;

export default MusicPlayer;
