import * as THREE from 'three'

type Props = {
  obj: THREE.Group<THREE.Object3DEventMap>,
  texture: THREE.Texture,
  children?: React.ReactNode
}

const emissions = {
  star_lamp: new THREE.MeshBasicMaterial({ color: '#FAFF9A' }),
  bed_lamp: new THREE.MeshBasicMaterial({ color: '#86E9FF' }),
  outside: new THREE.MeshBasicMaterial({ color: '#fff' }),
  monitor: new THREE.MeshBasicMaterial({ color: '#fff' }),
  wall_lamp: new THREE.MeshBasicMaterial({ color: '#fff' }),
  cloud: new THREE.MeshBasicMaterial({ color: '#B6D6FF' }),
}

export const ObjToPrimitive: React.FC<Props> = ({obj, texture, children}) => {
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })

      // emission
      if(child.name in emissions) {
        child.material = emissions[child.name as keyof typeof emissions];
      } else {
        obj.name = child.name
      }
    }
  })

  return (
    <>
      <primitive
        object={obj}
      >
        {children}
      </primitive>      
    </>
  )
}