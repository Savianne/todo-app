function updateTodoTitle(todo, success, error) {
    fetch('/API/update-todo-title.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({...todo})
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw `Error Occured: Status ${response.status}`;
            return;
        }
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

export default updateTodoTitle;