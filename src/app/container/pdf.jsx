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
        format: [canvas.width, canvas.height],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      const pdfBlob = pdf.output('blob')
      const pdfFile = new File([pdfBlob], 'test.pdf', {
        type: 'application/pdf',
      })
      console.log(pdfFile)
      return
      pdf.save('canvas-content.pdf')
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const startDrawing = (e) => {
      setIsDrawing(true)
      draw(e)
    }

    const stopDrawing = () => {
      setIsDrawing(false)
      ctx.beginPath()
    }

    const draw = (e) => {
      if (!isDrawing) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'black'

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseout', stopDrawing)
    }
  }, [isDrawing])

  return (
    <div>
      <h1>캔버스와 배경 이미지 포함 PDF 생성</h1>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '500px',
          height: '900px',
          border: '1px solid black',
          backgroundImage: 'url("/images/main.png")',
          backgroundSize: 'cover',
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={900}
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
