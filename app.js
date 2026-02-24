const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startBtn = document.getElementById('startBtn');
const callBtn = document.getElementById('callBtn');
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');
const myIdDisplay = document.getElementById('myId');
const friendIdInput = document.getElementById('friendId');

let localStream;

// సర్వర్ అవసరం లేకుండా PeerJS ఫ్రీ సిస్టమ్ ని స్టార్ట్ చేస్తున్నాం
const peer = new Peer(); 

// 1. మనకు ఒక ఆటోమేటిక్ ID వస్తుంది, దాన్ని స్క్రీన్ పై చూపిస్తాం
peer.on('open', (id) => {
    myIdDisplay.innerText = id;
});

// 2. కెమెరా ఆన్ బటన్ లాజిక్
startBtn.addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        
        startBtn.disabled = true;
        callBtn.disabled = false;
        muteBtn.disabled = false;
        videoBtn.disabled = false;
    } catch (error) {
        console.error('Error:', error);
        alert('దయచేసి Camera/Mic పర్మిషన్ ఇవ్వండి.');
    }
});

// 3. కాల్ చేయి బటన్ లాజిక్
callBtn.addEventListener('click', () => {
    const friendId = friendIdInput.value;
    if (!friendId) {
        alert("దయచేసి ఫ్రెండ్ ID ఇవ్వండి!");
        return;
    }
    
    // ఫ్రెండ్ కి కాల్ చేస్తున్నాం
    const call = peer.call(friendId, localStream);
    
    // ఫ్రెండ్ వీడియో డేటా రాగానే స్క్రీన్ పై చూపించడం
    call.on('stream', (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
    });
});

// 4. ఎవరైనా మనకు కాల్ చేస్తే రిసీవ్ చేసుకోవడం
peer.on('call', (call) => {
    // కాల్ రాగానే మన వీడియో డేటాని వాళ్ళకి పంపడం
    call.answer(localStream); 
    
    // వాళ్ళ వీడియో మన స్క్రీన్ పై చూపించడం
    call.on('stream', (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
    });
});

// 5. Mute / Video Off బటన్స్
muteBtn.addEventListener('click', () => {
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    muteBtn.innerText = audioTrack.enabled ? "Mic Off" : "Mic On";
    muteBtn.style.backgroundColor = audioTrack.enabled ? "#007bff" : "#dc3545";
});

videoBtn.addEventListener('click', () => {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    videoBtn.innerText = videoTrack.enabled ? "Video Off" : "Video On";
    videoBtn.style.backgroundColor = videoTrack.enabled ? "#007bff" : "#dc3545";
});
