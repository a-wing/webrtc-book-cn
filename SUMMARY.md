前言
  - 本书使用的约定
  - 使用代码范例
  - Safari® 在线阅读
  - 如何联系我们
  - 感谢

---
Dedication
---

1. 简介
  - Web 架构
  - WebRTC 架构
  - 浏览器中的 WebRTC
  - 信令
  - WebRTC API
    - MediaStream
    - PeerConnection
    - DataChannel
  - 一个简单的例子
2. 处理浏览器中的媒体
  - WebRTC 的 10 个步骤
  - 媒体捕获及数据流
    - 流媒体 API
    - 获取本地多媒体内容
    - URL
  - 使用 `getUserMedia()` API
  - 媒体模型 **The Media Model**
    - 媒体约束 **Media Constraints**
    - 使用约束 **Using Constraints**
3. 构建浏览器 RTC 梯形图：本地透视图 **Building the Browser RTC Trapezoid: A Local Perspective**
  - 本地使用 PeerConnection 对象：一个例子
    - 启动程序 **Starting the Application**
    - 呼叫 **Placing a Call**
    - 挂断 **Hanging Up**
  - 将 `DataChannel` 添加到本地 `PeerConnection` 对象 **Adding a DataChannel to a Local PeerConnection**
    - 启动 `DataChannel` **Starting Up the Application**
    - 使用 `DataChannel` 来传输流文本 **Streaming Text Across the Data Channel**
    - 关闭 `DataChannel` **Closing the Application**
4. 需要一个信令通道 **The Need for a Signaling Channel**
  - 建立简单的呼叫流程 **Building Up a Simple Call Flow**
  - 创建信令通道
  - 加入信令通道
  - 开始使用服务器中转通信 **Starting a Server-Mediated Conversation**
  - 继续跨频道聊天 **Continuing to Chat Across the Channel**
  - 关闭信令通道
5. 放在一起：你的第一个WebRTC系统 **Putting It All Together: Your First WebRTC System from Scratch**
  - 一个完整的 WebRTC 呼叫流程 **A Complete WebRTC Call Flow**
  - 发起人加入频道
  - 接收者加入频道
  - 发起方开始协商并发出 `offer` **Initiator Starting Negotiation**
  - 接收者接收发起人的 `offer` **Joiner Managing Initiator’s Offer**
  - ICE候选人交流 **ICE Candidate Exchanging**
  - 接收者回应 `answer` **Joiner’s Answer**
  - 建立点对点连接 **Going Peer-to-Peer!**
    - 使用 `DataChannel`  **Using the Data Channel**
  - 快速浏览Chrome WebRTC内部工具 **A Quick Look at the Chrome WebRTC Internals Tool**
6. WebRTC API 的高级功能简介
  - 网络会议 **Conferencing**
  - 身份认证
  - 点对点双音多频 **Peer-to-Peer DTMF**
  - 统计模型 **Statistics Model**
7. WebRTC 1.0 APIs
  - RTCPeerConnection API
    - 配置 **Configuration**
    - 初始化 **Constructor**
    - 方法 **Methods**
    - 属性 **Attributes**
    - 状态定义 **State Definition**
  - Peer-to-Peer Data API
    - Interface RTCDataChannel Interface Methods
    - RTCDataChannel Interface Attributes
---
- Index
- Colophon
- Copyright

