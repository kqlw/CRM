
let btn_TopUpBalance = document.getElementsByClassName("btn_TopUpBalance")
let WindowTopUpBalance = document.getElementById("WindowTopUpBalance")

let btn_windowTopUpBalance_accept = document.getElementById("btn_windowTopUpBalance_accept")

let btn_windowTopUpBalance_cancel = document.getElementById("btn_windowTopUpBalance_cancel")

let inputArea_bankCard_number = document.getElementById("inputArea_bankCard_number")
let inputArea_bankCard_Value = document.getElementById("inputArea_bankCard_Value")




Array.from(btn_TopUpBalance).forEach(element => {
    element.onclick = function()
    {
        if(WindowTopUpBalance.style.display == "flex")
        {
            WindowTopUpBalance.style.display = "None"
            console.log("None");
            
        }
        else
        {
            WindowTopUpBalance.style.display = "flex"
            console.log("flex");

        }

    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




btn_windowTopUpBalance_cancel.onclick = function()
{
    WindowTopUpBalance.style.display = "None"
}

btn_windowTopUpBalance_accept.onclick = function()
{   

    
    // console.log(inputArea_bankCard_number.value);
    
    url = "http://127.0.0.1:8000/lk/topUpBalance"

    const csrftoken = getCookie('csrftoken');


    let data = 
    {
        phoneNumber: "79008001010",
        value: inputArea_bankCard_Value.value
    }

    console.log(inputArea_bankCard_Value.value);
    

    fetch(url, {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify(data)

    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();

    }).then(responseData => {
        console.log(responseData)
    })



    WindowTopUpBalance.style.display = "None"
    location.reload(true);

}
