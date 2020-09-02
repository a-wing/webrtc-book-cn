
//JavaScript variables associated with send and receive channels
var sendChannel, receiveChannel;

//JavaScript variables associated with demo buttons
var startButton = document.getElementById("startButton");
var sendButton = document.getElementById("sendButton");
var closeButton = document.getElementById("closeButton");

//On startup, just the Start button must be enabled
startButton.disabled = false;
sendButton.disabled = true;
closeButton.disabled = true;

//Associate handlers with buttons
startButton.onclick = createConnection;
sendButton.onclick = sendData;
closeButton.onclick = closeDataChannels;

//Utility function for logging information to the JavaScript console
function log(text) {
  console.log("At time: " + (performance.now() / 1000).toFixed(3) +" --> " + text);
}

function createConnection() {

  // Chrome
  if (navigator.webkitGetUserMedia) {
    RTCPeerConnection = webkitRTCPeerConnection;

    // Firefox
  } else if(navigator.mozGetUserMedia) {
    RTCPeerConnection = mozRTCPeerConnection;
    RTCSessionDescription = mozRTCSessionDescription;
    RTCIceCandidate = mozRTCIceCandidate;
  }
  log("RTCPeerConnection object: " + RTCPeerConnection);

  // This is an optional configuration string
  // associated with NAT traversal setup
  var servers = null;

  // JavaScript variable associated with proper
  // configuration of an RTCPeerConnection object:
  // use DTLS/SRTP
  var pc_constraints = {
    'optional': [
      {
        'DtlsSrtpKeyAgreement': true
      }
    ]
  };

  // Create the local PeerConnection object...
  // ...with data channels
  localPeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log("Created local peer connection object, with Data Channel");
  try {

    // Note: SCTP-based reliable DataChannels supported
    // in Chrome 29+ !
    // use {reliable: false} if you have an older version of Chrome
    sendChannel = localPeerConnection.createDataChannel("sendDataChannel", {reliable: true});
    log('Created reliable send data channel');
  } catch (e) {
    alert('Failed to create data channel!');
    log('createDataChannel() failed with following message: ' + e.message);
  }
  // Associate handlers with peer connection ICE events
  localPeerConnection.onicecandidate = gotLocalCandidate;

  // Associate handlers with data channel events
  sendChannel.onopen = handleSendChannelStateChange;
  sendChannel.onclose = handleSendChannelStateChange;

  // Mimic a remote peer connection
  window.remotePeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log('Created remote peer connection object, with DataChannel');

  // Associate handlers with peer connection ICE events...
  remotePeerConnection.onicecandidate = gotRemoteIceCandidate;

  // ...and data channel creation event
  remotePeerConnection.ondatachannel = gotReceiveChannel;

  // We're all set! Let's start negotiating a session...
  localPeerConnection.createOffer(gotLocalDescription, onSignalingError);

  // Disable Start button and enable Close button
  startButton.disabled = true;
  closeButton.disabled = false;
}

function onSignalingError(error) {
  console.log('Failed to create signaling message : ' + error.name);
}

// Handler for sending data to the remote peer
function sendData() {

  var data = document.getElementById("dataChannelSend").value;
  sendChannel.send(data);
  log('Sent data: ' + data);
}

// Close button handler
function closeDataChannels() {

  // Close channels...
  log('Closing data channels');
  sendChannel.close();
  log('Closed data channel with label: ' + sendChannel.label);
  receiveChannel.close();
  log('Closed data channel with label: ' + receiveChannel.label);

  // Close peer connections
  localPeerConnection.close();
  remotePeerConnection.close();

  // Reset local variables
  localPeerConnection = null;
  remotePeerConnection = null;
  log('Closed peer connections');

  // Rollback to the initial setup of the HTML5 page
  startButton.disabled = false;
  sendButton.disabled = true;
  closeButton.disabled = true;
  dataChannelSend.value = "";
  dataChannelReceive.value = "";
  dataChannelSend.disabled = true;
  dataChannelSend.placeholder = "1: Press Start; 2: Enter text; 3: Press Send.";

}

// Handler to be called as soon as the local SDP is made available to
// the application
function gotLocalDescription(desc) {

  // Set local SDP as the right (local/remote) description for both local
  // and remote parties
  localPeerConnection.setLocalDescription(desc);
  log('localPeerConnection\'s SDP: \n' + desc.sdp);
  remotePeerConnection.setRemoteDescription(desc);

  // Create answer from the remote party, based on the local SDP
  remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
}

// Handler to be called as soon as the remote SDP is made available to
// the application
function gotRemoteDescription(desc) {

  // Set remote SDP as the right (remote/local) description for both local
  // and remote parties
  remotePeerConnection.setLocalDescription(desc);
  log('Answer from remotePeerConnection\'s SDP: \n' + desc.sdp);
  localPeerConnection.setRemoteDescription(desc);
}

// Handler to be called whenever a new local ICE candidate becomes available
function gotLocalCandidate(event) {
  log('local ice callback');
  if (event.candidate) {
    remotePeerConnection.addIceCandidate(event.candidate);
    log('Local ICE candidate: \n' + event.candidate.candidate);
  }
}

// Handler to be called whenever a new remote ICE candidate becomes available
function gotRemoteIceCandidate(event) {
  log('remote ice callback');
  if (event.candidate) {
    localPeerConnection.addIceCandidate(event.candidate);
    log('Remote ICE candidate: \n ' + event.candidate.candidate);
  }
}

// Handler associated with the management of remote peer connection's
// data channel events
function gotReceiveChannel(event) {
  log('Receive Channel Callback: event --> ' + event);

  // Retrieve channel information
  receiveChannel = event.channel;

  // Set handlers for the following events:
  // (i) open; (ii) message; (iii) close
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onclose = handleReceiveChannelStateChange;
}

// Message event handler
function handleMessage(event) {
  log('Received message: ' + event.data);

  // Show message in the HTML5 page
  document.getElementById("dataChannelReceive").value = event.data;

  // Clean 'Send' text area in the HTML page
  document.getElementById("dataChannelSend").value = '';
}

// Handler for either 'open' or 'close' events on sender's data channel
function handleSendChannelStateChange() {
  var readyState = sendChannel.readyState;
  log('Send channel state is: ' + readyState);

  if (readyState == "open") {

    // Enable 'Send' text area and set focus on it
    dataChannelSend.disabled = false;
    dataChannelSend.focus();
    dataChannelSend.placeholder = "";

    // Enable both Send and Close buttons
    sendButton.disabled = false;
    closeButton.disabled = false;
  } else {

    // event MUST be 'close', if we are here...
    // Disable 'Send' text area
    dataChannelSend.disabled = true;

    // Disable both Send and Close buttons
    sendButton.disabled = true;
    closeButton.disabled = true;
  }
}

// Handler for either 'open' or 'close' events on receiver's data channel
function handleReceiveChannelStateChange() {
  var readyState = receiveChannel.readyState;
  log('Receive channel state is: ' + readyState);
}
