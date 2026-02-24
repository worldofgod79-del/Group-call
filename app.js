const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');

// మనం మెసేజ్ పంపే బటన్ నొక్కినప్పుడు
sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    
    if (text !== "") {
        // కొత్త మెసేజ్ బాక్స్ ని క్రియేట్ చేయడం
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message sent';
        msgDiv.innerText = text;
        
        // ఆ మెసేజ్ ని స్క్రీన్ మీద యాడ్ చేయడం
        chatBox.appendChild(msgDiv);
        
        // బాక్స్ ఖాళీ చేయడం
        messageInput.value = '';
        
        // కొత్త మెసేజ్ రాగానే ఆటోమేటిక్ గా కిందకు స్క్రోల్ అవ్వడం
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
});

// వీడియో కాల్ బటన్ నొక్కినప్పుడు (ఇది నెక్స్ట్ స్టెప్ లో చేద్దాం)
document.getElementById('videoCallBtn').addEventListener('click', () => {
    alert("వీడియో కాల్ ఫీచర్ నెక్స్ట్ యాడ్ చేద్దాం!");
});
