const moveBtn = document.getElementById('move-to-btn');
const movekeyword = document.getElementById('move-to-text');
const boardUl = document.getElementById('board-list');

var journals = [];

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
   await loadBoxJournals();
   await displayBoxJournals();
}

