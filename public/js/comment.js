
async function addCommentHandler(event) {
    event.preventDefault();

    const text = document.querySelector('textarea[name="comment-text"]').value.trim();

    const painting_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                painting_id, 
                text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }    
}

document.querySelector(".comment-form").addEventListener("submit", addCommentHandler);