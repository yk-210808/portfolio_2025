
export const Loading = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-100 bg-slate-700">
      <div className="h-full flex justify-center items-center">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    </div>
  )
}