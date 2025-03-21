

let header_btn_basicInf = document.getElementById("header_btn_basicInf");
let header_btn_finance = document.getElementById("header_btn_finance");
let header_btn_help = document.getElementById("header_btn_help");


let pages = document.getElementsByClassName("pages")
let page_basicInformation = document.getElementById("page_basicInformation");
let page_finance = document.getElementById("page_finance");
let page_help = document.getElementById("page_help");


function header_btn_click(page)
{
    Array.from(pages).forEach(element => {
        element.style.display = "none"
    });

    page.style.display = "block"
}



header_btn_help.onclick = function() {header_btn_click(page_help)}
header_btn_finance.onclick = function() {header_btn_click(page_finance)}
header_btn_basicInf.onclick = function() {header_btn_click(page_basicInformation)}




