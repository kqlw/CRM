
let btn_getDetalis = document.getElementById("btn_getDetalis")

let inputArea_detailsDateFrom = document.getElementById("inputArea_detailsDateFrom")
let inputArea_detailsDateTo = document.getElementById("inputArea_detailsDateTo")
let phoneNumber = document.getElementById("hidden_PhoneNumber")

let table_financeHistory = document.getElementById("table_financeHistory")

function dateFormatter(d)
{
    const date = new Date(d);

    const options = {
    day: 'numeric',       // день числами (12)
    month: 'long',        // месяц полностью (марта)
    year: 'numeric',      // год (2025)
    hour: '2-digit',      // часы (06)
    minute: '2-digit',    // минуты (00)
    timeZone: 'UTC'       // указываем UTC,
    }
    
    const formatter = new Intl.DateTimeFormat('ru-RU', options);

    return formatter.format(date)
};






btn_getDetalis.onclick = function() 
{
    table_financeHistory.innerHTML = 
                `
                <tr>
                    <th class="table_head">Дата</th>
                    <th class="table_head">Услуга</th>
                    <th class="table_head">Стоимость</th>
                </tr>
                `

    
    url = `getDetalis/?phoneNumber=${phoneNumber.value}&dateFrom=${inputArea_detailsDateFrom.value}&dateTo=${inputArea_detailsDateTo.value}`
    

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Возвращаем промис с данными
    })
    .then(responseData => {
        responseData.data.forEach(element => {
            table_financeHistory.innerHTML += 
                `
                <tr>
                    <td>${dateFormatter(element.date)}</td>
                    <td>${element.name}</td>
                    <td>${element.cost}р</td>
                </tr>
                `
            
        });


    })
    .catch(error => {
        console.error('Error:', error);
    });
}
