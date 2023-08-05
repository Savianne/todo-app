function getAllMyTodos(success, error) {
    fetch('/API/get-my-todo-list.php', {method: 'POST'})
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
            success(data.todo_list);
        }
    })
    .catch(err => {
        if(err === 'unauthenticate') {
            window.location.reload();
        } else error(err);
    })
}

export default getAllMyTodos;