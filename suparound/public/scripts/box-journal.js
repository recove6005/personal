const params = new URLSearchParams(window.location.search);
const docId = params.get('docId');

const title = document.getElementById('journal-title');
const content = document.getElementById('journal-content');
const date = document.getElementById('journal-date');

init();

async function getJournalData() {
    const loadRes = await fetch('/api/box/load-journal', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
            'docId': docId
        }),
    });

    if(loadRes.ok) {
        const result = await loadRes.json();
        title.innerHTML = result.journal['title'];
        date.innerHTML = result.journal['date'];
        content.innerHTML = result.journal['content'];
    } else {
        alert('Err');
        window.location.href = '/template/home.html';
    }

}

async function init() {
    await getJournalData();
}

