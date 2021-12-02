const formNode = document.querySelector('#form');

function sendData(e){
    e.preventDefault();
    const form = document.querySelector('#form');
    const formData = new FormData(form);
    
}

formNode.addEventListener('submit', sendData);

formNode.addEventListener('formdata', (e) => {
    const data = e.formData;
    const formattedData = {};
    for (var [key, value] of data.entries()) { 
        formattedData[key] = value;
      }
    
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            const body = document.querySelector('body');
            let div = document.createElement('div');
            for(let key in data){
                let p = document.createElement('p');
                p.innerText = `${key}: ${data[key]}`;
                div.appendChild(p);
                

            }
            body.appendChild(div);
        }else {
            console.log('something went wrong');
        }
    }

    xhttp.open('POST', '/elsewhere');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(formattedData));
})
