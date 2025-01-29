import { useContext } from 'react';
import { MvContext } from '../context/MvContext';

export const BackButton = () => {
  const { mvContext, setMvContext } = useContext(MvContext)

  return (
    <div className="fixed z-40 bottom-14 left-0 right-0 m-auto md:w-96 w-52 md:h-20 h-16 bg-black hover:bg-blue-800">
    <button type='button' className='w-full h-full flex justify-center items-center md:gap-10 gap-4' onClick={() => setMvContext({...mvContext, panFlg: false, panObjectName: ''}) }>
      <p className='font-bold md:text-2xl text-lg'>Back</p>
      <img src="img/icon_return.svg" alt="" className='md:w-10 w-6' />
    </button>
  </div>
  )
}