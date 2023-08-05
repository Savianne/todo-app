function deleteCompleted(success, error) {
    fetch('/API/delete-completed.php', {method: 'POST'})
    .then(response => {
        if(!response.ok) {
            throw `Error Occured: Status ${response.status}`
        }
        return response.json();
    })
    .then(data => {
        if(data.error) {
            throw data.error;
        } else {
            success();
        }
    })
    .catch(err => {
        if(err === 'unauthenticate') {
            window.location.reload();
        } else error(err);
    })
}

export default deleteCompleted;