const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');

// 1. మెసేజ్ పంపే లాజిక్ (లోకల్ గా)
sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    
    if (text !== "") {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message sent';
        msgDiv.innerText = text;
        
        chatBox.appendChild(msgDiv);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
});

// 2. గ్రూప్ కాల్ స్టార్ట్ చేసే లాజిక్ (ZegoCloud)
function startCall() {
    // మీరు ఇచ్చిన ఐడీలు
    const appID = 1499174615; 
    const serverSecret = "91716d1342605904fe8fe37eca9ffa51"; 
    
    // రూమ్ మరియు యూజర్ డీటెయిల్స్
    const roomID = "WorldOfGod_GroupCall"; 
    const userID = Math.floor(Math.random() * 10000).toString(); // రాండమ్ ఐడీ
    const userName = "User_" + userID;

    // టోకెన్ క్రియేట్ చేయడం
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    // కాలింగ్ స్క్రీన్ ని చూపించడం
    zp.joinRoom({
        container: document.getElementById('chatBox'), // చాట్ స్క్రీన్ పైనే కాల్ వస్తుంది
        scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // గ్రూప్ కాల్
        },
        showScreenSharingButton: false, // మొబైల్ కి అవసరం లేదు
        showPreJoinView: false // డైరెక్ట్ గా కాల్లోకి వెళ్ళడానికి
    });
}

// కాల్ బటన్స్ కి ఫంక్షన్ కనెక్ట్ చేసాం
document.getElementById('videoCallBtn').addEventListener('click', startCall);
document.getElementById('audioCallBtn').addEventListener('click', startCall);
