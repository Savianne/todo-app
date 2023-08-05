function getUserInfo(success, error) {
    fetch('/GoogleAuth/user-info.php', {method: 'POST'})
    .then(response => {
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

        success(data.user_info);
    })
    .catch(err => {
        if(err === 'unauthenticate') return window.location.reload();
        error(err);
    })
}

export default getUserInfo;