const params = new URLSearchParams(window.location.search);
const path = decodeURIComponent(params.get('path'));

init();

async function getData() {
    const typeRes = await fetch('/api/auth/load', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            'type': path
        }),
    })

    if(typeRes.ok) {
        console.log('boxoffice data');
    } else {
        alert('Wrong keyword or just an Error, IDK.');
        window.location.href = 'home.html';
    }
}

async function init() {
    getData();
}