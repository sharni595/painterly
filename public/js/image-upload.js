const upload = document.getElementById('uploadButton');
const form = document.getElementById('form');
var imageUrl = '';


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('fileupload').files[0];

    let paintingObj = {
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
            //console.log(imageData);
            paintingObj.image_url = imageData.result.secure_url;
            console.log(paintingObj.image_url)
            return paintingPost(paintingObj);
        })

    return false
    
})

function paintingPost(paintingObj) {
    const title = paintingObj.title;
    const image_url = paintingObj.image_url;
    const description = paintingObj.description;
    fetch('/api/painting', {
        method: 'post',
        body: {
            title, 
            image_url,
            description
        },
        // header: {
        //     'Content-Type': 'application/json'
        // }
    })
        .then(response => {
            if (response.ok) {
                console.log("-------------");
                return response.json()
            } else{
                console.log(paintingObj);
                return alert(`Error: ${response.statusText}`);
            }
        })
        .then(imageData => {
            console.log("hello");
        })
}