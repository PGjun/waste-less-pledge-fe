export const Main = () => {
  return (
    <div className="h-screen w-[900px]">
      <div className="text-[45px] h-[145px] flex items-center justify-center">
        <div className="text-[#525252]">
          음식물쓰레기 줄이기 <span className="text-[#00861f]">실천서약</span>
        </div>
      </div>
      <div className="flex mt-[66px] relative">
        <div className="absolute top-0 left-[126px]">
          <div className=" text-[30px] h-[50px] text-[white]">
            #음식물쓰레기
          </div>
        </div>
        <div className="absolute top-0 left-[391px]">
          <div className=" text-[30px]  h-[50px] text-[white]">#환경보호</div>
        </div>
        <div className="absolute top-0 left-[609px]">
          <div className=" text-[30px]  h-[50px] text-[white]">#지구지키기</div>
        </div>
      </div>
    </div>
  )
}
