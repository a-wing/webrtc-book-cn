module.exports = {
  title: 'WebRTC 实时通信',
  description: '中文版 《 Real-Time Communication with WebRTC 》',
  themeConfig: {
    sidebar: [
      { title: '前言', path: 'preface' },
      {
        title: '目录',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          { title: '第1章 简介', path: '01_introduction' },
          { title: '第2章 处理浏览器中的媒体', path: '02_handling-media-in-the-browser' },
          { title: '第3章 构建浏览器 RTC 梯形图：本地视角', path: '03_building-the-browser-RTC-trapezoid' },
          { title: '第4章 需要信令通道', path: '04_the-need-for-a-signaling-channel' },
          { title: '第5章 放在一起：拼凑出你的第一个 WebRTC 系统', path: '05_putting_it_all_together' },
          { title: '第6章 WebRTC API 的高级功能简介', path: '06_advanced_features' },
          { title: '附录A WebRTC 1.0 APIs', path: '07_webrtc_api_v1' },
          { title: '关于本书和作者', path: 'about_the_authors' },
        ]
      }
    ]
	}
}

