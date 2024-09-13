import React, { useRef, useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const PDFGenerator = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const generatePDF = () => {
    const input = containerRef.current

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      const pdfBlob = pdf.output('blob')
      const pdfFile = new File([pdfBlob], 'test.pdf', {
        type: 'application/pdf',
      })
      console.log(pdfFile)
      pdf.save('test.pdf')
      return
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const startDrawing = (e) => {
      e.preventDefault() // 터치 시 스크롤 막기
      setIsDrawing(true)
      draw(e)
    }

    const stopDrawing = () => {
      setIsDrawing(false)
      ctx.beginPath()
    }

    const draw = (e) => {
      if (!isDrawing) return

      let x, y
      const rect = canvas.getBoundingClientRect()

      if (e.touches) {
        // 터치 이벤트
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      } else {
        // 마우스 이벤트
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'black'

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }

    // 마우스 이벤트
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)

    // 터치 이벤트
    canvas.addEventListener('touchstart', startDrawing)
    canvas.addEventListener('touchmove', draw)
    canvas.addEventListener('touchend', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseout', stopDrawing)

      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', draw)
      canvas.removeEventListener('touchend', stopDrawing)
    }
  }, [isDrawing])

  return (
    <div>
      <h1>캔버스와 배경 이미지 포함 PDF 생성</h1>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '340px',
          height: '700px',
          border: '1px solid black',
        }}
      >
        <img src="/images/main.png" alt="ddd" width={340} height={300} />
        <canvas
          ref={canvasRef}
          width={340}
          height={700}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'crosshair',
          }}
        />
      </div>

      <button onClick={generatePDF}>PDF 다운로드</button>
    </div>
  )
}

export default PDFGenerator
