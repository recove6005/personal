function init() {}
tokenAuthorization();

async function tokenAuthorization() {
    const authRes = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { "Content-Type":"application/json" },
        credentials: 'include',
    });

    if(authRes.ok) {
        init();
    } else {
        alert('Err');
        window.location.href = '/index.html';
    }
}

const canvas = document.getElementById('white-board');

let drawing = false;
let mode = true;
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if(mode)  {
        const data = { x, y, color: '#FFFFFF', size: 3 };
        draw(data);
    } else {
        const data = { x, y, color: 'rgba(2, 46, 2)', size: 3 };
        draw(data);
    }
});

const moveBtn = document.getElementById('move-to-btn');
const moveText = document.getElementById('move-to-text');

moveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const hash = '';

    // hash
    const hashRes = await fetch('/api/auth/hash', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        credentials: 'include',
        body: JSON.stringify({
            'plain': moveText.value.trim()
        }),
    });

    if(hashRes.ok) {
        const hashResult = await hashRes.json();
        const path = encodeURIComponent(hashResult.hashed);
        window.location.href = `/template/main.html?path=${path}`;
    } else {
        alert('Err');
    }
});