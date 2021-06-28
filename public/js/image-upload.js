const upload = document.getElementById('uploadButton');
const form = document.getElementById('form');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const paintingObj = {
        title,
        description,
        image_url: ''
    }

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
            return response.json();
        })
        .then(imageData => {
            paintingObj.image_url = imageData.result.secure_url;
            return paintingPost(paintingObj);
        })

    return false

})

function paintingPost(paintingObj) {
    const title = paintingObj.title;
    const image_url = paintingObj.image_url;
    const description = paintingObj.description;
    fetch('/api/painting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            image_url,
            description
        })
    })
        .then(response => {
            if (response.ok) {
                document.location.reload();
                return response.json();
            } else {
                return alert(`Error: ${response.statusText}`);
            }
        })
        .then(() => {
            console.log('Success!')
        })
        .catch(err => {
            console.log(err);
        })
}