const enterBox = document.getElementById('enter-box');
const passInput = document.getElementById('gate-password-input');

enterBox.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passStr = passInput.value;
    const enterRes = await fetch('/api/auth/pass', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'password': passStr,
        }),
    });
    
    if(enterRes.ok) {
        window.location.href = '/template/home.html';
    } else {
        alert(`Nop..`);
    }
});