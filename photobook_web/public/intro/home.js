document.addEventListener('DOMContentLoaded', async () => {
    const key = window.location.search.split('=')[1];
    const mainResponse = await fetch('/api/auth/validate-secret-main', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({key:key})
    });

    if(mainResponse.ok) {
        getPosters();
    } else {
        alert('error');
    }
});

// open-close drawer
document.getElementById('open-drawer').addEventListener('click', (e) => {
    e.preventDefault();
    const drawer = document.querySelector('.drawer');

    if(drawer.style.left === '-200px') {
        drawer.style.left = '0';
    }else {
        drawer.style.left = '-200px';
    }
});

async function getPosters() {
    const response = await fetch('/api/poster/get-poster', {
        method: 'POST',
    }); 

    if(response.ok) {
        const result = await response.json();
        const container = document.querySelector('.photo-container');
        container.innerHTML = ``;

        result.forEach(item => {
            const photoDiv = document.createElement(`div`);
            photoDiv.classList.add('photo-box');
            photoDiv.innerHTML = `
                <input type="hidden" value="${item.uuid}" id="${item.uuid}">
                <div class="photo-box">
                <img class="photo" src="" alt="">
                <div class="photo-info">
                    <p>${item.date}</p>
                    <p>${item.feeling}</p>
                </div>
                <div class="description">
                    ${item.content}
                </div>
                <div class="photo-divider"></div>                
            </div>
            `;

            container.appendChild(photoDiv);
        });

    } else {
        alert(`error`);
    }
}

// add pic
document.getElementById('addpic').addEventListener('click', () => {
    window.location.href = '/pages/add-pic.html';
});