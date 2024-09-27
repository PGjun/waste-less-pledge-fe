import React, { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import dayjs from 'dayjs'

const PDFGenerator = ({ userName }) => {
  const containerRef = useRef(null)
  const today = dayjs().format('YYYY년 MM월 DD일')

  const generatePDF = () => {
    const input = containerRef.current

    html2canvas(input, {
      scale: 2, // 해상도를 2배로 높여 더 선명하게 렌더링
      // useCORS: true, // 외부 리소스가 있을 경우 CORS 문제 해결
      allowTaint: true, // 다른 도메인에서 로드된 이미지를 허용
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2], // PDF 크기 설정
      })

      // PDF 내부에서 이미지의 크기와 위치를 조정
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)

      // Blob 형태로 PDF 생성
      const pdfBlob = pdf.output('blob')
      const pdfFile = new File([pdfBlob], 'test.pdf', {
        type: 'application/pdf',
      })

      console.log(pdfFile)

      // PDF 다운로드
      pdf.save(`음식물쓰레기_줄이기_실천_서약서_[${userName}].pdf`)
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '340px',
          height: '428px',
          // border: '1px solid black',
          // backgroundImage: 'url("/images/pledge-bg.png")',
          // backgroundSize: 'fit', // 이미지가 div 크기에 맞게 조정됨
          // backgroundPosition: 'center', // 이미지를 가운데에 배치
        }}
      >
        <img
          src="/images/pledge-from-title.jpg"
          alt="pledge"
          width={340}
          height={431}
          className="absolute -z-10"
        />

        <div className="pt-[135px] flex flex-col items-center z-20">
          {/* <button className="bg-[#00861f] rounded-[25px] text-white text-[9px]  h-[20px] px-[20px] leading-[20px]">
            음식물쓰레기 줄이기 실천 다짐 서약서
          </button> */}
          {/* <img
            src="/images/pledge-title.png"
            alt="pledge"
            width={170}
            height={30}
            className=""
          /> */}
          <div className="flex gap-[9px] mt-[25px] text-[12px] items-end">
            <span className="leading-[10px]">저</span>
            <span className="text-[14px] text-[#00861f] font-bold leading-[12px]">
              {userName}
            </span>
            <span className="leading-[10px]">은(는)</span>
          </div>
          <div className="text-[9.5px] mt-[15px] text-center flex flex-col gap-[6px]">
            <div>장보기 전에 리스트를 작성하겠습니다.</div>
            <div>음식은 먹을 만큼만 담겠습니다.</div>
            <div>남기지 않고 맛있게 먹겠습니다.</div>
            <div>버릴때는 물기를 꼭 제거하겠습니다.</div>
          </div>
          <div className="mt-[15px] text-[11px] font-bold text-[#00861f]">
            위 내용을 성실하게 실천할것을 서약합니다.
          </div>
          <div className="flex items-end leading-[12px] gap-[16px] text-[9px] mt-[25px]">
            <div>서약일 : {today}</div>
            <div className="flex items-end">
              자원순환 대표 :{' '}
              <span className="ml-[5px] tracking-[5px] text-[#525252] font-[HanYoon] text-[22px] leading-[20px]">
                {userName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="flex items-center gap-[7px] bg-[#00861f] text-[12px] py-[5px] rounded-[25px] px-[60px] text-white mt-[25px]"
      >
        <img
          src="/images/download-icon.png"
          alt="download"
          width={15}
          height={12}
        />
        PDF 저장
      </button>
    </div>
  )
}

export default PDFGenerator
