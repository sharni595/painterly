const upload = document.getElementById('uploadButton');
const form = document.getElementById('form');

const paintingPost = (paintingObj) => {

    const title = paintingObj.title;
    const image_url = paintingObj.image_url;
    const description = paintingObj.description;
    fetch('/painting', {
        method: 'POST',
        body: {
            title,
            image_url,
            description
        },
        header: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log(paintingObj);
                return alert(`Error: ${response.statusText}`);
            }
            console.log("-------------");
            return response.json()

        })
        .then(imageData => {
            console.log(imageData + ' Text');
        })
        .catch(err => {
            console.log(`Error: ${err}`);
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
        description
    }

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
            paintingObj.image_url = imageData.result.secure_url;
            console.log(paintingObj.image_url)
            paintingPost(JSON.stringify(paintingObj));
        })

    return false

})

