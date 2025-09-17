function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


let sms_password = 0

let btn_GetPassword = document.getElementById('btn_GetPassword')
let login = document.getElementById('login')


let btn_authorization = document.getElementById('btn_authorization')
let inputArea_password = document.getElementById('inputArea_password')


btn_authorization.onclick = function()
{
    

    const currentUrl = "http://127.0.0.1:8000/admin_authorization";

        const csrftoken = getCookie('csrftoken');

        let data = {
            login: login.value,
            password: inputArea_password.value
        }

        console.log(data);
        
        fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok)
            {
                window.location.href = "http://127.0.0.1:8000/admin/lk"

                console.log(response);
                
            }
        })
    
}