const file = document.getElementById('fileupload').value;
const upload = document.getElementById('uploadButton')
const formData = new FormData();

formData.append('photo', file)

upload.addEventListener('submit', () => {

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                return alert(`Error: ${response.statusText}`);
            }
            return response.json()
        })
        .then(imageData => {
            console.log(imageData);
        })
})
