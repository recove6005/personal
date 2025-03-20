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

// add pic
async function addPic() {

}

document.getElementById('addpic').addEventListener('click', () => {

});

// get photo infos
async function getPhotoInfos() {
    // infos

    // photo image

}

// 