WebRTC 1.0 APIs
=====


本附录概述了 W3C WebRTC API 。


## RTCPeerConnection API

`RTCPeerConnection` 允许两个用户直接进行浏览器之间的通信。

### Configuration

表A-1 `RTCConfiguration` 子典成员

Name | Type | Default | Description
---- | ---- | ------- | -----------
iceServers | `sequence<RTCIceServer>` | | 包含可供 ICE 使用的服务器（例如 STUN 和 TURN 服务器）的 URI 的数组。
iceTransports | RTCIceTransports | `all` | 表示允许 ICE 引擎使用的候选对象。
requestIdentity | RTCIdentityOption | `ifconfigured` | 请参阅 `RTCOfferAnswerOptions` 字典的 `requestIdentity` 成员。


表A-2 `RTCIceServer` 子典成员

Name | Type | Description
---- | ---- | -----------
credential | DOMString | 如果此 `RTCIceServer` 对象表示 TURN 服务器，则此属性指定用于该 TURN 服务器的凭据
urls | (DOMString or `sequence<DOMString>`) | [STUN-URI] 和 [TURN-URI] 中定义的 STUN 或 TURN URI 或其他 URI 类型。
username | DOMString | 如果此 `RTCIceServer` 对象表示 TURN 服务器，则此属性指定用于该 TURN 服务器的用户名。

表A-3 `RTCIceTransports` 枚举值

Name | Description
---- | -----------
none | ICE 引擎此时不得发送或接收任何数据包。
relay | ICE 引擎必须仅使用媒体中继候选者，例如通过 TURN 服务器的候选者。 在某些用例中，这可以用来减少 IP 地址的泄漏。
all | 指定此值时，ICE 引擎可以使用任何类型的候选项。

### Constructor

这是RTCPeerConnection构造函数：

* `RTCPeerConnection(configuration)`

这是 `RTCPeerConnection` 方法：

* createOffer(RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback, optional RTCOfferOptions options)
* createAnswer(RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback, optional RTCOfferAnswerOptions options)
* setLocalDescription(RTCSessionDescription description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback)
* setRemoteDescription(RTCSessionDescription description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback)
* updateIce(RTCConfiguration configuration)
* addIceCandidate(RTCIceCandidatecandidate, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback)
* getConfiguration()
* getLocalStreams()
* getRemoteStreams()
* getStreamById(DOMString streamId)
* addStream(MediaStream stream)
* removeStream(MediaStream stream)
* close()

### 属性

表A-4 `RTCPeerConnection` 属性

Access property | Type | Name
--------------- | ---- | ----
readonly | RTCSessionDescription | remoteDescription
readonly | RTCSignalingState | signalingState
readonly | RTCIceGatheringState | iceGatheringState
readonly | RTCIceConnectionState | iceConnectionState
 | EventHandler | onnegotiationneeded
 | EventHandler | onicecandidate
 | EventHandler | onsignalingstatechange
 | EventHandler | onaddstream
 | EventHandler | onremovestream
 | EventHandler | oniceconnectionstatechange


### 状态定义
表A-5 RTCSignalingState

Name | Description
---- | -----------
stable | 没有正在进行的 `offer/answer` 交换。 这也是初始状态，在这种情况下，本地和远程描述为空。
have-local-offer | 类型为 `offer` 的本地描述已成功应用。
have-remote-offer | 类型为 `offer` 的远程描述已成功应用。
have-local-pranswer | 类型 `offer` 的远程描述已成功应用，类型 `pranswer` 的本地描述已成功应用。
have-remote-pranswer | 类型 `offer` 的本地描述已成功应用，类型 `pranswer` 的远程描述已成功应用。
closed | 连接已关闭。


表A-6 RTCIceGatheringState

Value | Description
----- | -----------
new | 该对象刚刚创建，尚未建立任何网络。
gathering | ICE 引擎正在收集此 `RTCPeerConnection` 的候选对象。
complete | ICE 引擎已完成收集。 添加新接口或新 TURN 服务器之类的事件将使状态返回到收集状态。


表A-7 RTCIceConnectionState

Value | Description
----- | -----------
new | ICE 代理正在收集地址和/或等待提供远程候选者。
checking | ICE 代理已在至少一个组件上接收到远程候选，并且正在检查候选对，但尚未找到连接。 除了检查外，它可能仍在收集中。
connected | ICE 代理已找到所有组件的可用连接，但仍在检查其他候选对以查看是否存在更好的连接。 它可能仍在聚集。
completed | ICE 代理已完成收集和检查，并找到了所有组件的连接。
failed | ICE 代理已完成所有候选对的检查，未能找到至少一个组件的连接。可能已为某些组件找到连接。
disconnected | 一个或多个组件的活动性检查失败。 这比失败更具攻击性，并且可能在不稳定的网络上间歇性触发（并自行解决而不采取措施）。
closed | ICE 代理已关闭，并且不再响应 STUN 请求。


## Peer-to-Peer Data API

点对点数据 API 使 Web 应用程序可以点对点发送和接收通用应用程序数据。 用于发送和接收数据的 API 对 WebSocket 的行为进行建模。

* Method:
RTCDataChannel

createDataChannel([TreatNullAs=EmptyString] DOMString label, optionalRTCDataChannelInit dataChannelDict)

* Attribute:
EventHandler

ondatachannel


### 接口 RTCDataChannel 接口方法

表A-8 方法

Return type | Description
----- | -----------
void | `close()`
void | `send(DOMString data)`
void | `send(Blob data)`
void | `send(ArrayBuffer data)`
void | `send(ArrayBufferView data)`


### RTCDataChannel 接口属性

表A-9 属性

Access property | Type | Name
--------------- | ---- | ----
readonly | DOMString | label
readonly | boolean | ordered
readonly | unsigned? | maxRetransmitTime
readonly | unsigned? | maxRetransmits
readonly | DOMString | protocol
readonly | attribute | negotiated
readonly | unsigned  | shortid
readonly | RTCDataChannelState | readyState
readonly | unsigned long | bufferedAmount
 | EventHandler | onopen
 | EventHandler | onerror
 | EventHandler | onclose
 | EventHandler | onmessage
 | DOMString | binaryType


表A-10 RTCDataChannelInit 字典

Name | Type | Description
---- | ---- | -----------
id | unsigned short | 覆盖此通道的 ID 的默认选择。
maxRetransmitTime | unsigned short | 限制如果未成功传送通道将重新传输数据的时间。
maxRetransmits | unsigned short | 限制如果传输失败则通道将重新传输数据的次数。
negotiated | boolean | 默认为 `false`。 默认值 `false` 指示用户代理宣布带内通道，并指示另一个对等方调度相应的 `RTCDataChannel` 对象。 如果设置为 `true`，则由应用程序来协商通道并创建具有与另一个对等方相同的 ID 的 `RTCDataChannel` 对象。
ordered | boolean | 默认为 `true`。 如果设置为 `false`，则允许数据无序发送。 默认值 `true` 保证数据将按顺序传递。
protocol | DOMString | 默认为 `""`。 此通道使用的子协议名称


表A-11 RTCDataChannelState 枚举值

Value | Description
----- | -----------
connecting | 用户代理正在尝试建立基础数据传输。 这是使用 `createDataChannel()` 创建的 `RTCDataChannel` 对象的初始状态。
open | 建立了基础数据传输，并且可以进行通信。 这是作为 `RTCDataChannelEvent` 的一部分调度的 `RTCDataChannel` 对象的初始状态。
closing | 关闭基础数据传输的过程已开始。
closed | 基础数据传输已关闭或无法建立。

