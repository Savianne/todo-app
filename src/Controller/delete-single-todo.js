function deleteSingleTodo(id, success, error) {
    fetch('/API/delete-single-todo.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(response => {
        console.log(response)
        if(!response.ok) {
            throw `Error Occured: Status ${response.status}`
        }
        return response.json();
        
    })
    .then(data => {
        if(data.error) {
            throw data.error;
            return;
        }

        success();
    })
    .catch(err => {
        if(err === 'unauthenticate') return window.location.reload();
        error(err);
    });
}
    
    export default deleteSingleTodo;