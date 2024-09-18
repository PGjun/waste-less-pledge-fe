/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/total-cnt',
        destination: `http://43.201.46.179/v1/user/total-cnt`, // HTTP API를 여기에 설정
      },
      {
        source: '/api/increment',
        destination: `http://43.201.46.179/v1/user/increment`, // HTTP API를 여기에 설정
      },
    ]
  },
}

export default nextConfig
