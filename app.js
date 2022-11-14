if (typeof document !== "undefined") {
    const form = document.getElementById('form');
    if(document.querySelector('[name="login"]') != null){
        var lg = document.querySelector('[name="login"]').value;
    }
    if(document.querySelector('[name="pas"]') != null){
        var pas = document.querySelector('[name="pas"]').value;
    }
    if(document.querySelector('[name="surname"]') != null){
        var surname = document.querySelector('[name="surname"]').value;
    }
    // form.addEventListener('submit', getFormValue);
    //     function getFormValue(event) {
    //         event.preventDefault(); 
    //     }
}

const data = {
    login: lg,
    password: pas,
    surname: surname
}

console.log(data)
