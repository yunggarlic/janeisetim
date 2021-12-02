const formNode = document.querySelector('#form');

function sendData(e){
    
    const form = document.querySelector('#form');
    const formData = new FormData(form);

    console.log(formData);
}

formNode.addEventListener('submit', sendData);
