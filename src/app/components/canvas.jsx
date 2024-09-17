import React, { useRef, useEffect, useState } from 'react'

export const Canvas = () => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

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
    <>
      <canvas
        ref={canvasRef}
        width={340}
        height={340}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'crosshair',
        }}
      />
    </>
  )
}
