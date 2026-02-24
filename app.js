const localVideo = document.getElementById('localVideo');
const startBtn = document.getElementById('startBtn');
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');

let localStream; // Mana audio/video data ni store cheskodaniki

// Call Join avvadaniki
startBtn.addEventListener('click', async () => {
    try {
        // Video mariyu Audio rendu permission adugutundi
        localStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        
        localVideo.srcObject = localStream;
        
        // Buttons enable chestunnam
        startBtn.disabled = true;
        muteBtn.disabled = false;
        videoBtn.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        alert('Dayachesi Camera mariyu Mic permission ivvandi.');
    }
});

// Mic Off / On Logic
muteBtn.addEventListener('click', () => {
    const audioTrack = localStream.getAudioTracks()[0];
    
    if (audioTrack.enabled) {
        audioTrack.enabled = false; // Mic Off
        muteBtn.innerText = "Mic On";
        muteBtn.style.backgroundColor = "red"; // Red color
    } else {
        audioTrack.enabled = true; // Mic On
        muteBtn.innerText = "Mic Off";
        muteBtn.style.backgroundColor = ""; // Normal color
    }
});

// Video Off / On Logic
videoBtn.addEventListener('click', () => {
    const videoTrack = localStream.getVideoTracks()[0];
    
    if (videoTrack.enabled) {
        videoTrack.enabled = false; // Video Off
        videoBtn.innerText = "Video On";
        videoBtn.style.backgroundColor = "red"; // Red color
    } else {
        videoTrack.enabled = true; // Video On
        videoBtn.innerText = "Video Off";
        videoBtn.style.backgroundColor = ""; // Normal color
    }
});
