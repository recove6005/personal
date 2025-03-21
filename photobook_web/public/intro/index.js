document.addEventListener('DOMContentLoaded', function() {
    
});

document.getElementById('enter-btn').addEventListener('click', (e) => {
    e.preventDefault();
    checkSecretNumber();
});

async function checkSecretNumber() {
    const input = document.getElementById('entry');
    const key = input.value.trim();
    const response = await fetch('/api/auth/validate-secret-entry', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({key: key}),
    });

    if(response.redirected) {
        window.location.href = response.url;
    } else {
        alert(`error`);
    }
}