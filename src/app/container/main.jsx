'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const BASE_URL = 'http://43.201.46.179'

function openExternalBrowser() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  // iOS 기기인지 확인
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS 기기에서는 window.open 사용
    window.open('https://localhost:3000', '_blank')
  }
  // 안드로이드 기기인지 확인
  else if (/android/i.test(userAgent)) {
    // 안드로이드 기기에서는 intent 사용
    window.location.href =
      'intent://localhost:3000#Intent;scheme=https;package=com.android.chrome;end;'
  }
  // 그 외의 경우 (안드로이드와 iOS가 아닌 경우)
  else {
    alert('외부 브라우저로 열기 기능이 지원되지 않는 기기입니다.')
  }
}

export const Main = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [userName, setUserName] = useState('')
  const [isCheck1, setIsCheck1] = useState(false)
  const [isCheck2, setIsCheck2] = useState(false)
  const [isCheck3, setIsCheck3] = useState(false)
  const [isCheck4, setIsCheck4] = useState(false)

  const incrementUserCount = async () => {
    try {
      const response = await fetch(`/api/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        console.log('User incremented successfully:', data)
      } else {
        console.error('Failed to increment user')
      }
    } catch (error) {
      console.error('Error incrementing user:', error)
    }
  }

  const handleSubmit = () => {
    if (!isCheck1 || !isCheck2 || !isCheck3 || !isCheck4)
      return alert('모든 서약내용을 체크해주세요!')
    if (!userName) return alert('이름을 입력해주세요!')
    setIsOpen(true)
    incrementUserCount()
  }

  useEffect(() => {
    // API 호출
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(`/api/total-cnt`)
        const data = await response.json()
        setTotalUsers(data.total_cnt) // 응답 데이터에서 필요한 필드 추출
      } catch (error) {
        console.error('Error fetching total user count:', error)
      }
    }

    fetchTotalUsers()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[20px] justify-center text-[12px]">
        <div className="bg-[#00861f] rounded-[20px] py-[1px] px-[10px] text-white">
          #음식물쓰레기
        </div>
        <div className="bg-[#00861f] rounded-[20px] py-[1px] px-[10px] text-white">
          #환경보호
        </div>
        <div className="bg-[#00861f] rounded-[20px] py-[1px] px-[10px] text-white">
          #지구지키기
        </div>
      </div>
      <a href="#" onclick={() => openExternalBrowser()}>
        외부 브라우저로 열기
      </a>

      <img
        src="/images/main.png"
        alt="ddd"
        width={340}
        height={300}
        className="mt-[10px]"
      />

      <div className="mt-[20px] text-center text-[#525252] text-[14px] leading-[20px]">
        <div>현재까지</div>
        <div>
          총{' '}
          <span className="text-[#00861f] font-bold text-[18px]">
            {totalUsers.toLocaleString()}
          </span>{' '}
          명이 참여했어요!
        </div>
      </div>
      <img
        src="/images/main-cnt.png"
        alt="cnt"
        height={17}
        width={190}
        className="mt-[10px]"
      />
      <div className="w-[340px] mt-[2px] h-[440px] border-[10px] border-[#00861f] flex flex-col items-center bg-[#f8f8f4]">
        <div className="bg-[#00861f] w-[200px] text-[12px] leading-[12px] pb-[6px] text-center text-white rounded-b-lg">
          서약서를 작성해주세요!
        </div>
        <div className="mt-[10px] shadow border-[1px] w-[260px] bg-white border-[#00861f] flex flex-col items-center">
          <img
            src={'/images/pledge-main-title.png'}
            alt="titlem"
            width={200}
            height={20}
            className="mt-[7px]"
          />

          <div className="text-[10px] mt-[25px] flex flex-col gap-[8px] text-[#525252]">
            <button
              type="button"
              onClick={() => setIsCheck1(!isCheck1)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={
                  isCheck1 ? '/images/check-on.png' : '/images/check-off.png'
                }
                alt="check1"
                width={20}
                height={20}
              />
              <div>장보기 전에 리스트를 작성하겠습니다.</div>
            </button>
            <button
              type="button"
              onClick={() => setIsCheck2(!isCheck2)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={
                  isCheck2 ? '/images/check-on.png' : '/images/check-off.png'
                }
                alt="check2"
                width={20}
                height={20}
              />
              <div>음식은 먹을 만큼만 담겠습니다.</div>
            </button>
            <button
              type="button"
              onClick={() => setIsCheck3(!isCheck3)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={
                  isCheck3 ? '/images/check-on.png' : '/images/check-off.png'
                }
                alt="check3"
                width={20}
                height={20}
              />
              <div>남기지 않고 맛있게 먹겠습니다.</div>
            </button>
            <button
              type="button"
              onClick={() => setIsCheck4(!isCheck4)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={
                  isCheck4 ? '/images/check-on.png' : '/images/check-off.png'
                }
                alt="check4"
                width={20}
                height={20}
              />
              <div>버릴때는 물기를 꼭 제거하겠습니다.</div>
            </button>
            <div className="my-[20px] text-[10px] font-bold text-[#00861f]">
              위 내용을 성실하게 실천할것을 서약합니다.
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[24px] gap-[10px]">
          <div className="text-[10px] leading-[10px]">이름</div>
          <input
            className="min-w-0 w-[100px] border border-[#00861f] pl-[10px] h-[24px] shadow text-[10px] leading-[10px]"
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#00861f] w-[95px] text-center text-[12px] rounded-[20px] mt-[50px] text-white py-[5px]"
        >
          서약하기
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#333333aa] fixed top-0 w-full h-screen flex items-center justify-center">
          <div className="w-[340px] bg-white">
            <div className="h-[30px] bg-[#00861f] flex justify-end pr-[5px]">
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  src="/images/close-icon.png"
                  alt="close"
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <div className="flex flex-col items-center mt-[20px]">
              <div className="text-[#00861f] text-[18px] font-bold">
                서약이 완료되었습니다!
              </div>
              <div className="text-[12px]  text-[#525252]">
                참여해 주셔서 감사합니다.
              </div>
              <button
                onClick={() => router.push(`/pdf?n=${userName}`)}
                className="bg-[#00861f] w-[130px] text-center rounded-[20px] text-[14px] text-white py-[5px] my-[20px]"
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
