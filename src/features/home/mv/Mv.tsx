import { useContext } from 'react';
import { Canvas } from '@react-three/fiber';

import { Experience } from './Experience';
import { BackButton } from './BackButton';
import { Loading } from './Loading';
import { StartButton } from './StartButton';
import { MvContext } from '../context/MvContext';

export const Mv = () => {
  const { mvContext } = useContext(MvContext)
  const panFlg = mvContext.panFlg
  const isStart = mvContext.isStart
  const isLoaded = mvContext.isLoaded

  return (
    <>
      <Canvas id='mv'
        camera={{ 
          fov: 50, 
          near: 0.1, 
          far: 50,
          position: [10, 3, 10], 
        }}
        className={`${!isStart && '!pointer-events-none'}`}
      >
        <Experience />
      </Canvas>

      { panFlg && (
        <BackButton />
      ) }

      { isLoaded && (
        <StartButton  />
      ) }

      { !isLoaded && (
        <Loading />
      )}
    </>
  )
}