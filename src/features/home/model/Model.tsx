import { useEffect, useRef, useState, useContext } from 'react'
import { useGLTF, useTexture, Html  } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree  } from '@react-three/fiber'
import { EffectComposer, Selection, Outline } from '@react-three/postprocessing'

import { ObjToPrimitive } from './ObjToPrimitive'
import { MvContext } from '../context/MvContext'
import { isMobileOnly } from 'react-device-detect'

type TypeHoveredObject = {
  desk: boolean,
  mugi: boolean,
  monitor: boolean,
}

export const Model = () => {
  useGLTF.setDecoderPath('draco/')

  // Textures
  const textures = {
    floor: useTexture('textures/baked_floor.jpg'),
    furniture: useTexture('textures/baked_furniture.jpg'),
    desk: useTexture('textures/baked_desk.jpg'),
    wall: useTexture('textures/baked_wall.jpg'),
    mugi: useTexture('textures/baked_mugi.jpg'),
    bg: useTexture('textures/daySkyTexture.png')
  }

  // Models
  const models = {
    floor: useGLTF('models/floor.glb'),
    furniture: useGLTF('models/furniture.glb'),
    desk: useGLTF('models/desk.glb'),
    wall: useGLTF('models/wall.glb'),
    mugi: useGLTF('models/mugi.glb')
  }

  /**
   * Scene
   */
  const { scene } = useThree()
  scene.background = textures.bg
  textures.bg.colorSpace = THREE.SRGBColorSpace

  /**
   * Animate
   */
  const mouseRef = useRef({ x: 0, y: 0 });
  const deskRef = useRef<THREE.Group>(null);
  const mugiRef = useRef<THREE.Group>(null);
  const monitor = scene.getObjectByName('monitor')
  const iframePosition = new THREE.Vector3(monitor?.position.x, (monitor?.position.y ?? 0) - 0.005, (monitor?.position.z ?? 0))
  const { mvContext, setMvContext } = useContext(MvContext)

  // Mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animate
  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;

    // Update Mugi
    const objectMugi = scene.getObjectByName('mugi');
    const meshMugi = objectMugi?.children[0].children.find((mesh) => mesh.type === 'SkinnedMesh') as THREE.SkinnedMesh;
    const bonesMugi = meshMugi?.skeleton.bones;
    
    if (bonesMugi) {
      const tail = bonesMugi.find((bone) => bone.name === 'tail');
      if (tail) tail.rotation.y = Math.sin(elapsedTime * 2) * 0.8;
      
      const face = bonesMugi.find((bone) => bone.name === 'face');
      const x = mouseRef.current.y + 0.7 * 0.5 < 0.1 ? 0.1 : mouseRef.current.y + 0.7 * 0.5;
      const y = mouseRef.current.x > 0.5 ? 0.5 : mouseRef.current.x < -0.5 ? -0.5 : mouseRef.current.x;
      if (face) {
        face.rotation.x = -x;
        face.rotation.y = y;
      }
    }
  });


  /**
   * Functions
  */
  const [isOutlined, setIsOutlined] = useState(false)
  const [hoveredObject, setHoveredObject] = useState<TypeHoveredObject>({mugi: false, desk: false, monitor: false})
  const panFlg = mvContext.panFlg
  const isStart = mvContext.isStart

    const collectChildren = (object: THREE.Object3D) => {
      const children = [] as THREE.Mesh[]
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) children.push(child)
      })
      return children
    }

    const handlePointerMove = (name:string) => {
      if(!isOutlined){
        setIsOutlined(true);
        setHoveredObject({...hoveredObject, [name]: true})
      }
    };

    const handlePointerOut = (name:string) => {
      if(isOutlined){
        setIsOutlined(false);
        setHoveredObject({...hoveredObject, [name]: false})
      }
    };

    const togglePanFlg = (flg:boolean, name: string) => {
      const objectName = name === 'monitor' ? 'desk' : name

      if(isMobileOnly && objectName === 'desk'){
        window.location.href = 'https://works.mumumugi.com/'
      }else{
        setMvContext({...mvContext, panFlg: flg, panObjectName: objectName}) 
      }
    }

    const handleOutlineSelection = () => {
      const returnObjects = []

      if(isOutlined && !panFlg && isStart){
        if((hoveredObject.desk || hoveredObject.monitor) && deskRef.current) {
          returnObjects.push(...collectChildren(deskRef.current))
        }
  
        if(hoveredObject.mugi && mugiRef.current) {
          returnObjects.push(...collectChildren(mugiRef.current))
        }
      }
      return returnObjects
    }

  return (
    <>
      {/* Floor */}
      <group dispose={null} >
        <ObjToPrimitive obj={models.floor.scene} texture={textures.floor} />
      </group>

      {/* Furniture */}
      <group dispose={null} >
        <ObjToPrimitive obj={models.furniture.scene} texture={textures.furniture} />
      </group>

      {/* desk */}
      <group 
        dispose={null}
        ref={deskRef}
        onPointerMove={(e) => handlePointerMove(e.object.name)} // ホバー開始
        onPointerOut={(e) => handlePointerOut(e.object.name)} // ホバー終了
        onClick={(e) => togglePanFlg(true, e.object.name)}
      >
        <Selection>
          <ObjToPrimitive obj={models.desk.scene} texture={textures.desk}>
            <group>
              <Html
                transform
                wrapperClass="htmlScreen"
                // distanceFactor={0.651}
                distanceFactor={1}
                rotation-y={Math.PI}
                pointerEvents={panFlg ? 'auto' : 'none'}
                position={iframePosition}
                scale={1}
              >
                <div className="[-webkit-overflow-scrolling:touch!important] overflow-auto relative w-[920px] h-[576px]">
                  <iframe 
                    id="iframe" 
                    src="https://works.mumumugi.com/" 
                    className='w-full h-full border-0 block absolute top-0 left-0'
                  />
                </div>
              </Html>
            </group>
          </ObjToPrimitive>
        </Selection>
      </group>


      {/* wall */}
      <group dispose={null} >
        <ObjToPrimitive obj={models.wall.scene} texture={textures.wall} />
      </group>

      {/* mugi */}
      <group 
        dispose={null} 
        ref={mugiRef}
        onPointerMove={(e) => handlePointerMove(e.object.name)} // ホバー開始
        onPointerOut={(e) => handlePointerOut(e.object.name)} // ホバー終了
        onClick={(e) => togglePanFlg(true, e.object.name)}
      >
        <ObjToPrimitive obj={models.mugi.scene} texture={textures.mugi} >

        </ObjToPrimitive>
      </group>

      <EffectComposer autoClear={false}>
      <Outline
        selection={handleOutlineSelection()}
        blur={true}
        visibleEdgeColor={0xffffff}
        edgeStrength={10}
      />
      </EffectComposer>
    </>
  )
}