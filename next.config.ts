import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites(){
    return[
      {
        source:"/api/:path*",
        destination:"https://dev.dreamerz.net/docs/#/Payouts/:path"
      }
    ]
  }
};

export default nextConfig;
