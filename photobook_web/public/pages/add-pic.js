<<<<<<< HEAD

=======
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
function loadFile(input) {
    const file = input.files[0];
    const box = document.getElementById('img-container');
    box.innerHTML = '';

    const newImage = document.createElement('img');
    newImage.setAttribute('class', 'img');
    newImage.src = URL.createObjectURL(file);

    newImage.style.width = '70%';
    newImage.style.height = '70%';
    newImage.style.objectFit = 'contain';
    newImage.style.width = '100%';

    box.appendChild(newImage);
}

<<<<<<< HEAD
=======

>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
document.getElementById('add-btn').addEventListener('click', async (e) => {
    const formData = new FormData();
    
    // 이미지 데이터
    const imgInput = document.getElementById('photo');
<<<<<<< HEAD
    formData.append('files', imgInput.files[0]);
=======
    formData.append('img', imgInput.files[0]);
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
    
    // 감정 데이터
    const feeling = document.getElementById('feeling').innerText;
    formData.append('feeling', feeling);

    // 작성글 데이터
    const content = document.getElementById('pic-content').value;
    formData.append('content', content);

    const responseData = await fetch('/api/poster/add-poster', {
        method: 'POST',
<<<<<<< HEAD
        body: formData,
=======
        formData,
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
    });
    
    if(responseData.ok) {
        window.location.href = '/index.html';
    } else {
        alert('error');
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
