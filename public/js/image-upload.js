const upload = document.getElementById('uploadButton');
const form = document.getElementById('form');

async function paintingPost(title, image_url, description) {
    console.log('This is before sent: ' + title, image_url, description);
    // const title = paintingObj.title;
    // const image_url = paintingObj.image_url;
    // const description = paintingObj.description;
    const response = await fetch('/api/painting', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            image_url: image_url,
            description: description
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const file = document.getElementById('fileupload').files[0];
    //console.log(paintingObj)

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

            //the respond object is whats holding the secure url, not imageData.
            //but for some reason, it wont pull that url with the below syntax

            //document.location.reload();
        })
        .then(imageData => {
            console.log(imageData);
            //console.log(paintingObj)
            const image_url = imageData.result.secure_url;
            return paintingPost(title, image_url, description);
        })

    return false

})

