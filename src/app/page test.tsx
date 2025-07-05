'use client';

import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

type isPlayType = 'loading' | 'pause' | 'playing';
const Home = () => {
  const delays = [0, 0.1, 0.2, 0.3, 0.4];
  const [isPlay, setIsPlay] = useState<isPlayType>('pause');
  const [volume, setVolume] = useState(50);

  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 50; // Total durasi lagu dalam detik (50 detik)
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Volume audio dari 0 ke 1
    }
  }, [volume]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlay === 'playing') {
      audioRef.current?.play();
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlay('pause');

            return totalDuration;
          }
          return prev + 0.1;
        });
      }, 300);
    } else if (isPlay === 'pause') {
      audioRef.current?.pause();
      setIsPlay('pause');
    } else {
      setIsPlay('pause');
      setTimeout(() => {
        setIsPlay('playing');
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlay]);

  // Handler untuk tombol play/pause
  const togglePlayPause = () => {
    if (isPlay == 'playing') {
      setIsPlay('pause');
    } else {
      setIsPlay('playing');
    }
  };

  // Handler untuk mengubah progress saat progress bar diklik
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * totalDuration;
    setCurrentTime(newTime);
    audioRef.current?.pause();
    setIsPlay('pause');
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Handler untuk mengatur volume saat slider digeser
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(100, (clickX / width) * 100));
      setVolume(newVolume);
    }
  };

  // Format waktu ke MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Persentase progress untuk progress bar
  const progressPercentage = (currentTime / totalDuration) * 100;

  const HandleNext = async () => {
    setIsPlay('loading');
    console.log('handle Next');
  };
  const barVariants: Variants = {
    loading: {
      height: 16,
      transition: {
        duration: 0.2,
      },
    },
    paused: {
      height: 8,
      transition: {
        duration: 0.2,
      },
    },
    Playing: {
      height: [6, 32, 6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const handleColor =
    isPlay === 'playing' ? 'bg-primary-300' : 'bg-neutral-500';

  const handleOpacity = isPlay === 'loading' ? 'opacity-50' : 'opacity-100';

  if (!isPlay) return setIsPlay('loading');

  return (
    <div className=' flex items-center justify-center min-h-screen min-w-screen bg-neutral-950'>
      <div
        className='flex flex-col gap-20 p-16 rounded-2xl bg-[#0F0F0F]'
        style={{
          boxShadow: `1px 1px 20px ${isPlay === 'playing' ? '#8B5CF6' : ''}`,
        }}
      >
        {/* Logo & Title & Dynamic Bar */}
        <div className='flex flex-col'>
          {/* Logo & Title */}
          <div className=' flex gap-24'>
            {/* Logo */}
            <motion.div
              className={`size-120 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center rounded-[12px] ${handleOpacity}`}
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: isPlay === 'playing' ? 360 : 0,
                scale:
                  isPlay === 'playing' ? 1 : isPlay === 'pause' ? 0.95 : 0.9,
              }}
              transition={{
                rotate: {
                  repeat: isPlay === 'playing' ? Infinity : 0,
                  duration: isPlay === 'playing' ? 15 : 0,
                  ease: 'linear',
                },

                scale: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                },
              }}
            >
              <div className='display-2xl-bold'>🎵</div>
            </motion.div>
            {/* title */}
            <div className='flex flex-col gap-8 my-26'>
              <p className='text-lg-semibold text-neutral-100'>Title Song</p>
              <p className='text-neutral-400 text-sm-regular'>Artist</p>
            </div>
          </div>
          {/* Dynamic Bar */}
          <div className={`mx-144 -mt-10 bars items-end ${handleOpacity}`}>
            {delays.map((d, i) => (
              <motion.div
                key={i}
                className='bg-primary-200'
                style={{ originY: 1, width: 8 }}
                initial={{ height: 6 }}
                variants={barVariants}
                animate={{
                  height:
                    isPlay === 'loading'
                      ? 16
                      : isPlay === 'pause'
                      ? 6
                      : [6, 32, 6],
                }}
                transition={{
                  height: {
                    duration: isPlay === 'playing' ? 0.5 : 0.2,
                    repeat: isPlay === 'playing' ? Infinity : 0,
                    delay: isPlay === 'playing' ? d : 0,
                    ease: 'easeInOut',
                  },
                  duration: 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Test */}
        <audio
          ref={audioRef}
          src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          onEnded={() => {
            setIsPlay('pause');
            setCurrentTime(0);
          }}
        />
        {/* Progress Bar */}
        <div
          className='w-full bg-neutral-800 rounded-full h-8 cursor-pointer'
          onClick={handleProgressClick}
        >
          <motion.div
            className={`h-8 rounded-full ${handleColor}`}
            style={{ width: `${progressPercentage}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Waktu Progress */}
        <div className='flex justify-between text-sm text-neutral-500 mt-2'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>

        {/* --End Test */}
        {/* Button Action */}
        <div className='flex justify-center gap-16 items-center'>
          <motion.div
            className='p-8 cursor-pointer '
            whileHover={{ scale: 1.05, color: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
            transition={{ color: { duration: 0.5 } }}
          >
            <Shuffle color='#D5D7DA' size='20' />
          </motion.div>

          <motion.div
            className='p-8 cursor-pointer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={HandleNext}
          >
            <SkipBack color='#D5D7DA' size='20' />
          </motion.div>

          <motion.div
            className={`size-56  flex justify-center items-center rounded-full cursor-pointer ${handleColor}`}
            onClick={togglePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlay === 'playing' ? (
              <Pause color='#D5D7DA' size='24' />
            ) : (
              <Play color='#D5D7DA' size='24' />
            )}
          </motion.div>

          <motion.div
            className='p-8 cursor-pointer rounded-full'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={HandleNext}
          >
            <SkipForward color='#D5D7DA' size='20' />
          </motion.div>
          <motion.div
            className='p-8 cursor-pointer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Repeat color='#D5D7DA' size='20' />
          </motion.div>
        </div>
        {/* Volume */}
        <div className='flex gap-8 items-center '>
          <Volume2 color='#A4A7AE' size='16' />
          <div
            className='w-full bg-neutral-800 rounded-full h-4 cursor-pointer'
            ref={sliderRef}
            onClick={handleVolumeChange}
          >
            <motion.div
              className='bg-neutral-500 h-4 rounded-full hover:bg-primary-200'
              style={{ width: `${volume}%` }}
              animate={{ width: `${volume}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
        <div className='text-white'>{volume.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Home;
