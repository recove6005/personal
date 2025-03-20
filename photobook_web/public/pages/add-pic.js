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


document.getElementById('add-btn').addEventListener('click', async (e) => {
    const formData = new FormData();
    
    // 이미지 데이터
    const imgInput = document.getElementById('photo');
    formData.append('img', imgInput.files[0]);
    
    // 감정 데이터
    const feeling = document.getElementById('feeling').innerText;
    formData.append('feeling', feeling);

    // 작성글 데이터
    const content = document.getElementById('pic-content').value;
    formData.append('content', content);

    const responseData = await fetch('/api/poster/add-poster', {
        method: 'POST',
        formData,
    });
    
    if(responseData.ok) {
        window.location.href = '/index.html';
    } else {
        alert('error');
    }
});