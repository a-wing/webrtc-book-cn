export default {
  title: 'WebRTC 实时通信',
  description: '中文版 《 Real-Time Communication with WebRTC 》',
  base: '/webrtc-book-cn/',
  themeConfig: {
    socialLinks: [
      {
        icon: {
          svg: '<svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240 240"><defs><linearGradient id="linear-gradient" x1="120" y1="240" x2="120" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1d93d2"/><stop offset="1" stop-color="#38b0e3"/></linearGradient></defs><title>Telegram_logo</title><circle cx="120" cy="120" r="120" fill="url(#linear-gradient)"/><path d="M81.229,128.772l14.237,39.406s1.78,3.687,3.686,3.687,30.255-29.492,30.255-29.492l31.525-60.89L81.737,118.6Z" fill="#c8daea"/><path d="M100.106,138.878l-2.733,29.046s-1.144,8.9,7.754,0,17.415-15.763,17.415-15.763" fill="#a9c6d8"/><path d="M81.486,130.178,52.2,120.636s-3.5-1.42-2.373-4.64c.232-.664.7-1.229,2.1-2.2,6.489-4.523,120.106-45.36,120.106-45.36s3.208-1.081,5.1-.362a2.766,2.766,0,0,1,1.885,2.055,9.357,9.357,0,0,1,.254,2.585c-.009.752-.1,1.449-.169,2.542-.692,11.165-21.4,94.493-21.4,94.493s-1.239,4.876-5.678,5.043A8.13,8.13,0,0,1,146.1,172.5c-8.711-7.493-38.819-27.727-45.472-32.177a1.27,1.27,0,0,1-.546-.9c-.093-.469.417-1.05.417-1.05s52.426-46.6,53.821-51.492c.108-.379-.3-.566-.848-.4-3.482,1.281-63.844,39.4-70.506,43.607A3.21,3.21,0,0,1,81.486,130.178Z" fill="#fff"/></svg>'
        },
        link: 'https://t.me/webrtc_cn'
      },
      { icon: 'github', link: 'https://github.com/a-wing/webrtc-book-cn/' },
    ],
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        items: [
          { text: '关于', link: 'readme' },
          { text: '前言', link: 'preface' },
        ]
      },
      {
        text: '目录',
        items: [
          { text: '第1章 简介', link: '01_introduction' },
          { text: '第2章 处理浏览器中的媒体', link: '02_handling-media-in-the-browser' },
          { text: '第3章 构建浏览器 RTC 梯形图：本地视角', link: '03_building-the-browser-RTC-trapezoid' },
          { text: '第4章 需要信令通道', link: '04_the-need-for-a-signaling-channel' },
          { text: '第5章 放在一起：拼凑出你的第一个 WebRTC 系统', link: '05_putting_it_all_together' },
          { text: '第6章 WebRTC API 的高级功能简介', link: '06_advanced_features' },
          { text: '附录A WebRTC 1.0 APIs', link: '07_webrtc_api_v1' },
          { text: '关于本书和作者', link: 'about_the_authors' },
        ]
      }
    ]
  }
}
