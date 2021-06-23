const upload = document.getElementById('uploadButton');
const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = document.getElementById('fileupload').files[0];
    const formData = new FormData();
    formData.append('photo', file)

    fetch('/api/upload', {
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

    return false
})