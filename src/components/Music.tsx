'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 50; // Total durasi lagu dalam detik (50 detik)
  const audioRef = useRef<HTMLAudioElement>(null);

  // Efek untuk mengatur waktu progress saat bermain
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 0.1;
        });
      }, 100); // Update setiap 100ms untuk animasi halus
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Handler untuk tombol play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handler untuk mengubah progress saat progress bar diklik
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * totalDuration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
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

  return (
    <div className='flex items-center justify-center min-h-full bg-gray-100 p-4'>
      <motion.div
        className='bg-purple-400 p-6 rounded-lg shadow-lg w-full max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
          Music Player
        </h2>

        {/* Audio element (contoh dengan file dummy) */}
        <audio
          ref={audioRef}
          src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />

        {/* Progress Bar */}
        <div
          className='w-full bg-gray-200 rounded-full h-2 cursor-pointer'
          onClick={handleProgressClick}
        >
          <motion.div
            className='bg-blue-600 h-2 rounded-full'
            style={{ width: `${progressPercentage}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Waktu Progress */}
        <div className='flex justify-between text-sm text-gray-600 mt-2'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>

        {/* Tombol Play/Pause */}
        <div className='flex justify-center mt-4'>
          <motion.button
            className='bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none'
            onClick={togglePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
