const upload = document.getElementById('uploadButton');
const form = document.getElementById('form');
var imageUrl = '';

const paintingPost = (paintingObj) => {
    fetch('/api/painting', {
        method: 'POST',
        body: paintingObj
    })
        .then(response => {
            if (!response.ok) {
                return alert(`Error: ${response.statusText}`);
            }
            return response.json()
        })
        .then(imageData => {
            console.log(imageData);
            imageUrl = imageData.result.secure_url;
        })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('fileupload').files[0];

    const paintingObj = {
        title,
        image_url: '',
        description,
        user_id: ''
    }

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
            paintingObj.image_url = imageData.result.secure_url;
            paintingPost(paintingObj);
        })

    return false
})

