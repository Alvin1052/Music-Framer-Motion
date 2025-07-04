'use client';

import MusicPlayer from '@/components/Music';
import {
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

type Phase = 'loading' | 'pause' | 'play';
const Home: React.FC = () => {
  const [status, setStatus] = useState<Phase>('pause');
  const delays = [0, 0.1, 0.2, 0.3, 0.4];
  return (
    <div className=' flex items-center justify-center min-h-screen min-w-screen'>
      <div className='flex flex-col gap-20 p-16 rounded-2xl shadow-purple-400 shadow-lg inset-shadow-sm inset-shadow-purple-400 '>
        {/* Logo & Title & Dynamic Bar */}
        <div className='flex flex-col'>
          {/* Logo & Title */}
          <div className=' flex gap-24'>
            {/* Logo */}
            <div className='size-120 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center rounded-[12px]'>
              <div className='display-2xl-bold'>🎵</div>
            </div>
            {/* title */}
            <div className='flex flex-col gap-8 my-26'>
              <p className='text-lg-semibold text-neutral-100'>Title Song</p>
              <p className='text-neutral-400 text-sm-regular'>Artist</p>
            </div>
          </div>
          {/* Dynamic Bar */}
          <div className='mx-144 -mt-10 bars'>
            {delays.map((d, i) => (
              <motion.div
                key={i}
                className='bg-indigo-600 mx-1'
                style={{ originY: 1 }}
                initial={{ width: 8, height: 6 }}
                animate={{ height: [6, 32, 6] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: d,
                }}
              />
            ))}
          </div>
        </div>
        {/* Progress Bar & Time */}
        <MusicPlayer />
        {/* Button Action */}
        <div className='flex justify-center gap-16 items-center'>
          <Shuffle color='#ffffff' size='20' className='m-8' />
          <SkipBack color='#ffffff' size='20' className='m-8' />

          <div className='size-56 bg-primary-200 flex justify-center items-center rounded-full'>
            <Play color='#ffffff' size='24' className='m-8' />
          </div>
          <SkipForward color='#ffffff' size='20' className='m-8' />
          <Repeat color='#ffffff' size='20' className='m-8' />
        </div>
        {/* Volume */}
        <div className='flex gap-8 items-center jus'>
          <Volume2 color='#A4A7AE' size='16' />
          <div className='w-full h-4 bg-neutral-500 rounded-full'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
