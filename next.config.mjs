/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // SECURITY ENHANCEMENT: Enforce global security headers to protect against XSS, clickjacking, and other common vulnerabilities.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // Prevents the site from being embedded in iframes, mitigating clickjacking attacks.
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Prevents browsers from guessing the MIME type, mitigating MIME sniffing vulnerabilities.
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Controls how much referrer information is sent with requests.
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Enforces secure (HTTPS) connections to the server, protecting against downgrade attacks.
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            // Mitigates Cross-Site Scripting (XSS) and data injection attacks by restricting the sources of executable scripts.
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
