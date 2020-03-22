// Get <div> placeholder element from DOM
div = document.getElementById('scratchPad');

// Connect to server
var socket = io.connect('http:localhost:8181');

// Ask channel name from user
channel = prompt("Enter signaling channel name:");
if (channel !== "") {
  console.log('Trying to create or join channel: ', channel);
  // Send 'create or join' to the server
  socket.emit('create or join', channel);
}

// Handle 'created' message
socket.on('created', function (channel) {
  console.log('channel ' + channel + ' has been created!');
  console.log('This peer is the initiator...');

  // Dynamically modify the HTML5 page
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) + ' --> Channel '+ channel + ' has been created! </p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> This peer is the initiator...</p>');
});

// Handle 'full' message
socket.on('full', function (channel) {
  console.log('channel ' + channel + ' is too crowded! Cannot allow you to enter, sorry :-(');
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) + ' --> channel ' + channel + ' is too crowded! Cannot allow you to enter, sorry :-( </p>');
});

// Handle 'remotePeerJoining' message
socket.on('remotePeerJoining', function (channel) {
  console.log('Request to join ' + channel);
  console.log('You are the initiator!');

  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">Time: ' +(performance.now() / 1000).toFixed(3) +' --> Message from server: request to join channel ' +channel + '</p>');
});

// Handle 'joined' message
socket.on('joined', function (msg) {
  console.log('Message from server: ' + msg);

  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Message from server: </p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +msg + '</p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Message from server: </p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +msg + '</p>');
});

// Handle 'broadcast: joined' message
socket.on('broadcast: joined', function (msg) {
  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">Time: ' +(performance.now() / 1000).toFixed(3) +' --> Broadcast message from server: </p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">' +msg + '</p>');

  console.log('Broadcast message from server: ' + msg);

  // Start chatting with remote peer:
  // 1. Get user's message
  var myMessage = prompt('Insert message to be sent to your peer:', "");

  // 2. Send to remote peer (through server)
  socket.emit('message', {
    channel: channel,
    message: myMessage
  });
});

// Handle remote logging message from server
socket.on('log', function (array) {
  console.log.apply(console, array);
});

// Handle 'message' message
socket.on('message', function (message) {
  console.log('Got message from other peer: ' + message);

  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Got message from other peer: </p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +message + '</p>');

  // Send back response message:
  // 1. Get response from user
  var myResponse = prompt('Send response to other peer:', "");

  // 2. Send it to remote peer (through server)
  socket.emit('response', {
    channel: channel,
    message: myResponse
  });
});

// Handle 'response' message
socket.on('response', function (response) {
  console.log('Got response from other peer: ' + response);

  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Got response from other peer: </p>');

  div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +response + '</p>');

  // Keep on chatting
  var chatMessage = prompt('Keep on chatting. Write "Bye" to quit conversation', "");

  // User wants to quit conversation: send 'Bye' to remote party
  if(chatMessage == "Bye") {
    div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Sending "Bye" to server...</p>');
    console.log('Sending "Bye" to server');

    socket.emit('Bye', channel);

    div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Going to disconnect...</p>');
    console.log('Going to disconnect...');

    // Disconnect from server
    socket.disconnect();
  } else {
    // Keep on going: send response back
    // to remote party (through server)
    socket.emit('response', {
      channel: channel,
      message: chatMessage
    });
  }
});

// Handle 'Bye' message
socket.on('Bye', function () {
  console.log('Got "Bye" from other peer! Going to disconnect...');

  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Got "Bye" from other peer!</p>');
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Sending "Ack" to server</p>');

  // Send 'Ack' back to remote party (through server)
  console.log('Sending "Ack" to server');
  socket.emit('Ack');

  // Disconnect from server
  div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +(performance.now() / 1000).toFixed(3) +' --> Going to disconnect...</p>');
  console.log('Going to disconnect...');

  socket.disconnect();
});

