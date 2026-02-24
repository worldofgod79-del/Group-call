// HTML లోని ఎలిమెంట్స్ ని తీసుకుంటున్నాం
const localVideo = document.getElementById('localVideo');
const startBtn = document.getElementById('startBtn');

// బటన్ క్లిక్ చేసినప్పుడు కెమెరా ఆన్ అవ్వడానికి లాజిక్
startBtn.addEventListener('click', async () => {
    try {
        // బ్రౌజర్ ద్వారా కెమెరా, మైక్ పర్మిషన్ అడగడం (ఇదే WebRTC బేసిక్ స్టెప్)
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        
        // వచ్చిన వీడియోని మన HTML video ట్యాగ్ కి కనెక్ట్ చేయడం
        localVideo.srcObject = stream;
        
        // కెమెరా ఆన్ అయ్యాక బటన్ డిసేబుల్ చేయడం
        startBtn.disabled = true;
        startBtn.innerText = "కెమెరా ఆన్ లో ఉంది";
        startBtn.style.backgroundColor = "green";

    } catch (error) {
        console.error('కెమెరా ఆన్ చేయడంలో సమస్య వచ్చింది:', error);
        alert('దయచేసి మీ కెమెరా మరియు మైక్ పర్మిషన్ ఇవ్వండి.');
    }
});
