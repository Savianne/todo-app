function addNewTodo(title, success, error) {
    fetch('/API/add-new-todo.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title})
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

export default addNewTodo;