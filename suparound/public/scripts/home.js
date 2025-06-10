const moveBtn = document.getElementById('move-to-btn');
const movekeyword = document.getElementById('move-to-text');
const boardUl = document.getElementById('board-list');
const whiteboard = document.getElementById('white-board');

var journals = [];
var boardText = '';

init();

moveBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const hashRes = await fetch('/api/auth/hash', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            'plain': movekeyword.value,
        }),    
    });

    if(hashRes.ok) {
        const hashResult = await hashRes.json();
        window.location.href = `/template/box.html?secret=${hashResult.hashed}`;
    } else {
        console.log('Nop..');
    }
});

whiteboard.addEventListener('click', (e) => {
    const existing = document.getElementById('white-board-draw');
    if (existing) return;

    whiteboard.innerHTML = `
        <textarea id="white-board-draw"></textarea>
    `;
    const textarea = document.getElementById('white-board-draw');
    textarea.focus();
    textarea.value = boardText;
    textarea.addEventListener('blur', async (e) => {
        const text = textarea.value;
        boardText = text;
        whiteboard.innerText = boardText;
        await saveWhiteboard(text);
    });
});

async function tokenAuthorization() {
    const authRes = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { "Content-Type":"application/json" },
        credentials: 'include',
    });

    if(!authRes.ok) {
        alert('Err');
        window.location.href = '/index.html';
    }
}

async function loadWhiteboard() {
    const loadRes = await fetch('/api/board/load', {
        method: 'GET',
        credentials: 'include',
    });

    if(loadRes.ok) {
        const result = await loadRes.json();
        boardText = result.board.board;
        whiteboard.innerText = boardText;
    } else {
        whiteboard.innerHTML = ``;
    }
}

async function saveWhiteboard(boardText) {
    const saveRes = await fetch('/api/board/save', {
        method: 'POST',
        headers: { "Content-Type":"application/json" },
        credentials: 'include',
        body: JSON.stringify({
            'board': boardText,    
        }),
    });

    if(!saveRes.ok) {
        alert(`Err`);
    }
}

async function loadBoxJournals() {
    const loadRes = await fetch('/api/box/load', {
        method: 'POST',
        credentials: 'include',
    });

    if(loadRes.ok) {
        const result = await loadRes.json();
        journals = result.journals;
    } else {
        alert('Err');
    }
}

async function displayBoxJournals() {
    var innerLiHTML = '';

    for(var i = 0; i < journals.length; i++) {
        innerLiHTML += `
            <li>
                <div class="li-date">${journals[i].date}</div>
                <a class="li-title" href="/template/box-journal.html?docId=${journals[i].docId}">‣ ${journals[i].title}</a>            
            </li>
        `;
    }

    boardUl.innerHTML = innerLiHTML;
}

async function init() {
   await tokenAuthorization();
   await loadWhiteboard();
   await loadBoxJournals();
   await displayBoxJournals();
}

