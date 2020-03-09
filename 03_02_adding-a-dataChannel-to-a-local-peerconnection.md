## 将数据通道添加到本地 `PeerConnection`

点对点数据 API 使 Web应用程序 可以以点对点方式发送和接收通用应用程序数据。 用于发送和接收数据的 API 汲取了 WebSocket 的启发。

在本节中，我们将展示如何将 `DataChannel` 添加到 `PeerConnection`。 再次，我们将坚持本地观点，并忽略信号问题。 让我们从 例3-2 中的 HTML5 页面开始。

例3-2 本地数据通道用法示例
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>DataChannel simple example</title>
  </head>
  <body>
    <textarea rows="5" cols="50" id="dataChannelSend" disabled placeholder="1: Press Start; 2: Enter text; 3: Press Send."></textarea>
    <textarea rows="5" cols="50" id="dataChannelReceive" disabled></textarea>
    <div id="buttons">
      <button id="startButton">Start</button>
      <button id="sendButton">Send</button>
      <button id="closeButton">Stop</button>
    </div>
    <script src="js/dataChannel.js"></script>
  </body>
</html>
```


该页面（在 Chrome 中其外观如 图3-12 所示）仅包含两个并排的文本区域，分别与从发件人的数据通道发送的数据和另一方在另一端接收的数据相关联 接收者的数据通道。 三个按钮用于编排应用程序：（1）在启动时按下的“开始”按钮； （2）需要在数据通道上流式传输新数据时使用的发送按钮； （3）关闭按钮，可用于重置应用程序并将其恢复到原始状态。


![图3-12](images/rcwr_0312.png)

图3-12 Chrome 中加载的 `DataChannel` 示例页面


像往常一样，此应用程序的核心行为是在嵌入式 JavaScript 文件 `dataChannel.js` 中实现的，其布局如下：


[由于这段代码太长，单独放到一个文件里了](dataChannel.js)



与前面的示例一样，我们将通过逐步跟踪应用程序的生命周期来分析其行为。 我们将跳过所有已经说明的部分。 这使我们可以只关注代码中引入的新功能。

### Starting Up the Application
