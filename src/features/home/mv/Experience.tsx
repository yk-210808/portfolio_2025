import { CameraControls as DreiCameraControls } from '@react-three/drei'
import CameraControls from 'camera-controls'
import { Model } from '../model'
import { useRef, useEffect, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { MvContext } from '../context/MvContext'
import { isMobile } from 'react-device-detect'

export const Experience = () => {
  const cameraControlsRef = useRef<CameraControls | null>(null)
  const { camera } = useThree()
  const { mvContext, setMvContext } = useContext(MvContext)

  /**
   * カメラ制御
   */
  useEffect(() => {
    if(cameraControlsRef.current){
      if(mvContext.panFlg){
        let cameraControl: Promise<void>[] = []

        // desk
        if(mvContext.panObjectName === 'desk'){
          cameraControlsRef.current.enabled = true
          cameraControlsRef.current.reset(true)

          if(isMobile) {
            cameraControl = [
              cameraControlsRef.current.moveTo(0, 1.45, 1.95, true),
              cameraControlsRef.current.zoomTo(5, true),
              cameraControlsRef.current.rotateTo(Math.PI / 2, Math.PI / 2.3, true)
            ]
          } else {
            cameraControl = [
              cameraControlsRef.current.moveTo(0, 1.45, 1.6, true),
              cameraControlsRef.current.zoomTo(7, true),
              cameraControlsRef.current.rotateTo(Math.PI / 2, Math.PI / 2.3, true)
            ]
          }
        }

        // mugi
        if(mvContext.panObjectName === 'mugi'){
          cameraControlsRef.current.enabled = true
          cameraControlsRef.current.reset(true)

          cameraControl = [
            cameraControlsRef.current.moveTo(2.5, -2, 0, true),
            cameraControlsRef.current.zoomTo(3.5, true),
            cameraControlsRef.current.rotateTo(Math.PI * - 1, Math.PI / 2.5, true)
          ]
        }

        Promise.all(
          cameraControl as Promise<void>[]
        ).then(function(){
          if(cameraControlsRef.current) cameraControlsRef.current.enabled = false
        })

      }else{
        Promise.all(
          [cameraControlsRef.current.enabled = true]
        ).then(function(){
          if(cameraControlsRef.current) cameraControlsRef.current.reset(true)
        })
      }
    }
  },[mvContext.panFlg])

  /**
   * カメラ制御（限界位置の設定）
   */
  useFrame(() => {
    if (cameraControlsRef.current) {
      // カーソルした距離
      const target = cameraControlsRef.current.getTarget(new THREE.Vector3());
      const position = cameraControlsRef.current.getPosition(new THREE.Vector3());

      if(position.x < -3.8){
        cameraControlsRef.current.truck(1, target.y, true)
      }

      if(position.z < -3.8){
        cameraControlsRef.current.truck(-1, target.y, true)
      }

      if(position.y < -2){
        cameraControlsRef.current.elevate(0.5, true)
      }
    }
  });

  // 初回読み込み
  useEffect(() => {
    if(!mvContext.isStart && cameraControlsRef.current){
      cameraControlsRef.current.reset(true)
      cameraControlsRef.current.mouseButtons.left = CameraControls.ACTION.NONE
      cameraControlsRef.current.mouseButtons.right = CameraControls.ACTION.NONE
      cameraControlsRef.current.mouseButtons.wheel = CameraControls.ACTION.NONE

      if(isMobile){
        cameraControlsRef.current.moveTo(1.3, 0, 0, false)
        cameraControlsRef.current.zoomTo(2, false)
        cameraControlsRef.current.rotateTo(0, 1.5 , false)
      }else{
        cameraControlsRef.current.moveTo(1.3, -1.5, 0, false)
        cameraControlsRef.current.zoomTo(4.5, false)
        cameraControlsRef.current.rotateTo(0, 1.5 , false)
      }

      setMvContext({...mvContext, isLoaded: true})
    }
  })

  // Startボタンを押した時
  useEffect(() => {
    if(mvContext.isStart && cameraControlsRef.current){
      cameraControlsRef.current.reset(true)
      cameraControlsRef.current.mouseButtons.left = CameraControls.ACTION.ROTATE
      cameraControlsRef.current.mouseButtons.right = CameraControls.ACTION.TRUCK
      cameraControlsRef.current.mouseButtons.wheel = CameraControls.ACTION.DOLLY
    }
    
  }, [mvContext.isStart])


  return (
    <>
      <DreiCameraControls 
        ref={cameraControlsRef}
        makeDefault 
        camera={camera} 
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 2}
        maxDistance={isMobile ? 30 :14 }
      />

      <directionalLight position={[1, 2, 3]} intensity={10} />
      <ambientLight intensity={1.5} />

      <group
        rotation-y={- Math.PI * 0.5} 
        position-y={- 2.8}
        name='modelGroup'
        >
        <Model />
      </group>
    </>
  )
}