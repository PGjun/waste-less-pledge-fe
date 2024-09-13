'use client'

import PDFGenerator from './pdf'
// import MyDocument from './pdf'
// import { PDFDownloadLink } from '@react-pdf/renderer'

export const Main = () => {
  return (
    <div className="flex justify-center min-h-screen ">
      <div>
        {/* <h1>PDF 생성 예제</h1>
        <MyDocument />
        <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'PDF 생성 중...' : 'PDF 다운로드'
          }
        </PDFDownloadLink> */}
        <PDFGenerator />
      </div>
    </div>
  )
}
