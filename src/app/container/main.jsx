'use client'

import { useState } from 'react'
import PDFGenerator from './pdf'
import { useRouter } from 'next/navigation'
// import MyDocument from './pdf'
// import { PDFDownloadLink } from '@react-pdf/renderer'

export const Main = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[20px] justify-center">
        <div className="bg-[#00861f] rounded-[20px] p-[6px] text-white">
          #음식물쓰레기
        </div>
        <div className="bg-[#00861f] rounded-[20px] p-[6px] text-white">
          #환경보호
        </div>
        <div className="bg-[#00861f] rounded-[20px] p-[6px] text-white">
          #지구지키기
        </div>
      </div>

      <img
        src="/images/main.png"
        alt="ddd"
        width={340}
        height={300}
        className="mt-[20px]"
      />

      <div className="mt-[20px] text-center">
        <div>현재까지</div>
        <div>
          총 <span className="text-[#00861f] text-[20px]">{999}</span>명이
          참여했어요!
        </div>
      </div>

      <div className="w-[340px] h-[450px] border-[10px] border-[#00861f] flex flex-col items-center bg-[#fffff4]">
        <div className="bg-[#00861f] w-[200px] text-center text-white rounded-b-lg">
          서약서를 작성해주세요!
        </div>
        <div className="mt-[10px] border-[1px] w-[280px] bg-white border-[#00861f] ">
          ddd
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#00861f] w-[100px] text-center rounded-[20px] text-white py-[5px]"
        >
          서약하기
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#333333aa] fixed top-0 w-full h-screen flex items-center justify-center">
          <div className="w-[340px] bg-white">
            <div className="h-[30px] bg-[#00861f] flex justify-end pr-[5px]">
              <button onClick={() => setIsOpen(!isOpen)}>X</button>
            </div>
            <div className="flex flex-col items-center mt-[20px]">
              <div className="text-[#00861f] text-[20px]">
                서약이 완료되었습니다!
              </div>
              <div>참여해 주셔서 감사합니다.</div>
              <button
                onClick={() => router.push('/pdf')}
                className="bg-[#00861f] w-[150px] text-center rounded-[20px] text-white py-[5px] my-[20px]"
              >
                서약서 보러가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
