const params = new URLSearchParams(window.location.search);
const secret = decodeURIComponent(params.get('secret'));

const titleText = document.getElementById('title');
const dateText = document.getElementById('date-text');
const textarea = document.getElementById('content');
const form = document.getElementById('content-form');

init();

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveRes = await fetch('/api/box/save', {
        method: 'POST',
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
            'title': titleText.value,
            'content': textarea.value,
            'date': dateText.innerText,
        }),
    });

    if(saveRes.ok) {
        window.location.href = "/template/home.html";
    } else {
        alert('Err');
    }
});

function getDateStr(nowdate) {
    switch(nowdate) {
        case 0: return '일요일';
        case 1: return '월요일';
        case 2: return '화요일';
        case 3: return '수요일';
        case 4: return '목요일';
        case 5: return '금요일';
        case 6: return '토요일';
    }
};

function displayTodaysDate() {
    const now = new Date();
    const today = now.getFullYear()
        + '년 ' 
        + (now.getMonth() + 1).toString().padStart(2, '0')
        + '월 '
        + (now.getDate().toString().padStart(2, '0'))
        + '일 '
        + getDateStr(now.getDay());

    dateText.innerText = today;
}

async function getData() {
    const typeRes = await fetch('/api/auth/load', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            'type': secret
        }),
    })

    if(typeRes.ok) {
        console.log('datas');
    } else {
        alert('Wrong keyword or just an Error, IDK.');
        window.location.href = '/template/home.html'
    }
}

async function init() {
    getData();
    displayTodaysDate();
}

