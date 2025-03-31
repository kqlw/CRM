
let header_exit_btn = document.getElementById("header_exit_btn")


header_exit_btn.onclick = function()
{
    let isExit = confirm("Вы дейтсвитель хотите выйти из ЛК?")

    if(isExit)
    {
        url = "http://127.0.0.1:8000/lk/exit"

        fetch(url).then(request => {
            if(request.ok)
            {
                return response.json()                
            }
        }).then(responseData => {
            console.log(responseData);
            window.location.href = "http://127.0.0.1:8000"
        })

    }  
}