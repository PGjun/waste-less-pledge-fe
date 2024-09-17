'use client'

import PDFGenerator from '../container/pdf'

export default function Page(page) {
  const userName = page.searchParams.n
  return (
    <div className="flex flex-col items-center">
      <PDFGenerator userName={userName} />
    </div>
  )
}
