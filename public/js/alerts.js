let divAlert = document.querySelectorAll('.div-alert');
let btnAlert = document.querySelectorAll('.btn-close');

btnAlert.forEach((btn,i) => {
    btn.addEventListener('click', () => {
        divAlert[i].remove()
    })
})