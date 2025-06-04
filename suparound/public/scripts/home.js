tokenAuthorization();

async function tokenAuthorization() {
    const authRes = await fetch('/api/check', {
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

function init() {
    console.log(`init()`);
}