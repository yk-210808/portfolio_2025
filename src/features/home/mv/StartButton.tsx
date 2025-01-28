import { useContext } from "react"
import { MvContext } from "../context/MvContext"

export const StartButton = () => {
  const { mvContext, setMvContext } = useContext(MvContext)

  const handleClick = () => {
    setMvContext({ ...mvContext, isStart: true, panFlg: false });
  };
  
  return (
    
      <>
      { !mvContext.isStart && (
        <div className="fixed top-0 bottom-0 left-0 right-0 m-auto z-50 bg-white/40 w-96 h-60 flex justify-center items-center">
          <div 
            onClick={() => handleClick()}
            className="w-32 h-fit bg-white text-center p-2 border-4 border-sky-500 border-double cursor-pointer text-sky-500 font-bold text-base hover:bg-sky-300 hover:text-white hover:border-white"
          >
            START
          </div>
        </div>
      )}
      </>
  )
}