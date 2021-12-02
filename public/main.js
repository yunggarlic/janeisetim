const formNode = document.querySelector('#form');

formNode.addEventListener('submit', (e) => {
    //stops page refresh
    e.preventDefault();

    //extracts form data
    const data = new FormData(formNode);
    const formattedData = {};
    for (var [key, value] of data.entries()) { 
        formattedData[key] = value;
      }
    
    //create AJAX request, sets up listener
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            let userDataDiv = document.querySelector('.form-data');

            appendUserData(data, userDataDiv);
        }else {
            console.log('something went wrong');
        }
    }

    //provides details to ajax request and sends data.
    xhttp.open('POST', '/elsewhere');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(formattedData));
})


function appendUserData(data, userDataDiv){
    //user has not yet submitted
    if(userDataDiv == undefined){
        let div = document.createElement('div');
        div.classList.add('form-data');
        for(let key in data){
            let p = document.createElement('p');
            p.innerText = `${key}: ${data[key]}`;
            div.appendChild(p);
        }
        const body = document.querySelector('body');
        body.appendChild(div);
    }else {
        //destroy p tags, re-add with new data 
        userDataDiv.innerHTML = '';
        for(let key in data){
            let p = document.createElement('p');
            p.innerText = `${key}: ${data[key]}`;
            userDataDiv.appendChild(p);
        }
    }
}