function todoItemStatusSwitcher(todo, success, error) {
    const newStatus = todo.status === 'todo'? 'done' : 'todo';
    fetch('http://localhost:82/API/update-todo-status.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: todo.id, status: newStatus})
    }) 
    .then(response => {
        if(!response.ok) {
            throw `Error Occured: Status ${response.status}`
        }
        return response.json();
    })
    .then(json => {
        if(json.error) {
            throw json.error;
            return; 
        }
        success();
    })
    .catch(err => {
        error(err);
    });
    
}


export default todoItemStatusSwitcher;