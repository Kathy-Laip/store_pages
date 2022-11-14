if (typeof document !== "undefined") {
    const form = document.getElementById('form');
    if(document.querySelector('[name="login"]') != null){
        var log = document.querySelector('[name="login"]').innerHTML;
    }
    if(document.querySelector('[name="pas"]') != null){
        var pas = document.querySelector('[name="pas"]').innerHTML;
    }
    if(document.querySelector('[name="surname"]') != null){
        var surname = document.querySelector('[name="surname"]').innerHTML;
        // form.addEventListener('submit', getFormValue);
        // function getFormValue(event) {
        //     event.preventDefault(); 
        // }
    }
    const data = {
        login: log,
        password: pas,
        surname: surname
    }
    
    console.log(data)
}
