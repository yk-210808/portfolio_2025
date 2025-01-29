import { useContext, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'

import { Experience } from './Experience';
import { BackButton } from './BackButton';
import { Loading } from './Loading';
import { StartButton } from './StartButton';
import { MvContext } from '../context/MvContext';
import { isMobile } from 'react-device-detect';

export const Mv = () => {
  const { mvContext } = useContext(MvContext)
  const panFlg = mvContext.panFlg
  const isStart = mvContext.isStart
  const isLoaded = mvContext.isLoaded
  const cameraPosition = isMobile ? new THREE.Vector3(20, 3, 20) : new THREE.Vector3(10, 3, 10)

  const updateViewport = () => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) return;
  
    if (isMobile) {
      // スマホの場合
      metaViewport.setAttribute('content', 'width=820, user-scalable=no');
    } else {
      // PCの場合
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
    }
  };

  useEffect(() => {
    updateViewport();
  }, []);

  return (
    <>
      <div className='mv-block'>
        <Canvas id='mv'
          camera={{ 
            fov: 50, 
            near: 0.1, 
            far: 150,
            position: cameraPosition, 
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
      </div>
    </>
  )
}