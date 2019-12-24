第2章 处理浏览器中的媒体
=====

在本章中，我们将开始研究WebRTC框架的细节，该框架基本上指定了一组JavaScript API，用于开发基于Web的应用程序。 这些API一开始就被认为是用于实现基本用例的友好工具，例如一对一的音频/视频调用。 它们还应具有足够的灵活性，以保证专家开发人员可以实现各种复杂得多的使用场景。 因此，为程序员提供了一组API，这些API可以大致分为三个逻辑组：

1. 本地和远程音频和视频的获取和管理：
  - `MediaStream` 界面（以及HTML5 `<audio>`和`<video>`标签的相关用法）

2. 连接管理：
  - `RTCPeerConnection` 接口

3. 管理任意数据：
  - `RTCDataChannel` 接口


## WebRTC 的 10 个步骤

以下10个步骤的步骤描述了WebRTC API的典型使用场景：

1. 从本地设备（如麦克风、网络摄像头）创建一个 `MediaStream` 对象。
2. 从本地 `MediaStream` 获取 *URL Blob*
3. 使用获取的 *URL Blob* 进行本地预览
4. 创建一个 `RTCPeerConnection` 对象
5. 将本地流添加到新创建的连接
6. 将你自己的会话描述发送到远程对等点  Send your own session description to the remote peer.
7. 从您的对等方接收远程会话描述  Receive the remote session description from your peer.
8. 处理收到的会话描述，并将远程流添加到您的 `RTCPeerConnection`
9. 从远程流获取 *URL Blob*
10. 使用获取的 *URL Blob* 播放远程对等方的音频和/或视频

我们将逐步完成上述步骤。 在本章的其余部分中，我们将涉及整个基于 WebRTC 的点对点通信生命周期的前三个阶段。 这意味着我们暂时将忘记远程对等方，而只专注于如何从浏览器中访问和使用本地音频和视频资源。 在执行此操作的同时，我们还将研究如何在限制条件下播放（例如，强制视频分辨率）。


> ### **Warning :** WebRTC 支持的浏览器
> 在撰写本文时，WebRTC API在Chrome，Firefox和Opera中可用。 本书中包含的所有示例均已使用这些浏览器进行了测试。 为了简洁起见（由于Opera和Chrome在实现API方面几乎完全相同），我们从现在开始只将Chrome和Firefox作为运行客户端平台的示例。

## 媒体捕获及数据流

W3C Media Capture and Streams 文档定义了一组 JavaScript API，这些API使应用程序能够从平台请求音频和视频流，以及操纵和处理流数据。

### 流媒体 API

`MediaStream` 接口用于表示媒体数据流。 流可以是输入或输出，也可以是本地或远程（例如，本地网络摄像头或远程连接）。 必须注意，单个 `MediaStream` 可以包含零个或多个轨道。 每个轨道都有一个对应的 `MediaStreamTrack` 对象，该对象代表用户代理中的特定媒体源。 `MediaStream` 中的所有轨道在渲染时进行同步。`MediaStreamTrack` 表示包含一个或多个通道的内容，其中，通道之间具有定义的已知的关系。 通道是此 API 规范中考虑的最小单位。 图2-1显示了由单个视频轨道和两个不同的音频（左声道和右声道）轨道组成的 `MediaStream`

![图2-1](images/rcwr_0201.png)

图2-1 由一个视频轨道和两个音频轨道组成的 `MediaStream`

W3C Media Capture Streams API 定义了两种方法 `getUserMedia()` 和 `createObjectUrl()`，以下各节对此进行了简要说明。

### 获取本地多媒体内容

`getUserMedia()` API，通过指定一组（强制或可选）成功和失败的回调函数，Web 开发人员可以访问本地设备媒体（当前是音频和/或视频）

```javascript
getUserMedia(constraints, successCallback, errorCallback)
```

`getUserMedia()` 提示用户许可使用其网络摄像头或其他视频或音频输入。

### URL

`createObjectUrl()` 方法指示浏览器创建和管理与本地文件或二进制对象（blob）关联的唯一URL：

```javascript
createObjectURL(stream)
```

它在 WebRTC 中的典型用法是从 `MediaStream` 对象开始创建 *Blob URL* 。 然后，将在 HTML 页面内使用 *Blob URL* 。 实际上，本地和远程流都需要此过程。

