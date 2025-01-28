import { useContext } from 'react';
import { MvContext } from '../context/MvContext';

export const BackButton = () => {
  const { mvContext, setMvContext } = useContext(MvContext)

  return (
    <div className="fixed z-40 bottom-14 left-0 right-0 m-auto w-96 h-20 bg-black hover:bg-blue-800">
    <button type='button' className='w-full h-full flex justify-center items-center gap-10' onClick={() => setMvContext({...mvContext, panFlg: false, panObjectName: ''}) }>
      <p className='font-bold text-2xl'>Back</p>
      <img src="img/icon_return.svg" alt="" className='w-10' />
    </button>
  </div>
  )
}