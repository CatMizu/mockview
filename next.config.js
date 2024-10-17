/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // 保持你的配置不变
    images: {
      domains: ['reqres.in'], // 添加允许的外部图片域名
    },
  };
  
  module.exports = nextConfig;
  