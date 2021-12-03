window.onload = function (){
    setupFormSubmit();
    customSelect();
    document.addEventListener('click', closeAllSelect);

}

function setupFormSubmit () {
    const formNode = document.querySelector('#form');
    //attach on submit
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
                console.log('things are happening...');
            }
        }

        //provides details to ajax request and sends data.
        xhttp.open('POST', '/elsewhere');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(formattedData));
    })
}


function appendUserData(data, userDataDiv){
    //user has not yet submitted
    if(userDataDiv == undefined){
        let div = document.createElement('div');
        div.classList.add('form-data', 'visuallyhidden');

        for(let key in data){
            let p = document.createElement('p');
            p.innerText = `${key}: ${data[key]}`;
            div.appendChild(p);
        }
        const mainDiv = document.querySelector('#main-div');

        //visual transition
        formNode.classList.add('visuallyhidden');    
        formNode.addEventListener('transitionend', function(e) {
            formNode.classList.add('hidden');

            mainDiv.appendChild(div);

            setTimeout(() => {
                const dataForm = document.querySelector('.form-data')
                dataForm.classList.remove('visuallyhidden')
            }, 100);

        }, {
            capture: false,
            once: true,
            passive: false
            });

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

function customSelect() {
    const selectDiv = document.getElementsByClassName('select-div')[0];
    const selectElem = selectDiv.getElementsByTagName('select')[0];
    
    //create a div that will act as the selected item
    let newSelectDiv = document.createElement('div');
    newSelectDiv.setAttribute('class', 'select-selected');
    //assigns option HTML to the div and appends
    newSelectDiv.innerHTML = selectElem.options[selectElem.selectedIndex].innerHTML;
    selectDiv.appendChild(newSelectDiv);

    //creates one hidden div that will act as the group of unselected options
    let optionListDiv = document.createElement('div');
    optionListDiv.setAttribute('class', 'select-items select-hide');

    //for each existing option that isn't already selected, create a div to represent that option
    for(let j = 1; j < selectElem.length; j++){
        let optionItem = document.createElement('div');
        optionItem.innerHTML = selectElem.options[j].innerHTML;
        
        //add click event to new option item that assigns for real select
        optionItem.addEventListener('click', function(e){
            let currentlySelected = this.parentNode.previousSibling;
            for(let i = 0; i < selectElem.length; i++){
                if(selectElem.options[i].innerHTML === this.innerHTML){
                    //real selected index is moved to clicked item if its html matches
                    selectElem.selectedIndex = i;
                    currentlySelected.innerHTML = this.innerHTML;
                    let y = document.getElementsByClassName('same-as-selected');
                    for(let k = 0; k < y.length; k++){
                        console.log(y);
                        y[k].removeAttribute('class');
                    }
                    this.setAttribute('class', 'same-as-selected');
                    break;
                }
            }
            currentlySelected.click();
        });
        optionListDiv.appendChild(optionItem);
    }
    selectDiv.appendChild(optionListDiv);
    newSelectDiv.addEventListener('click', function(e){
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(element){
    const selectItems = document.getElementsByClassName('select-items');
    const selectedItem = document.getElementsByClassName('select-selected');
    let array = [];

    for(let i = 0; i < selectedItem.length; i++){
        if(element === selectedItem[i]){
            array.push(i);
        }else {
            selectedItem[i].classList.remove('select-arrow-active');
        }
    }
    for (let i = 0; i < selectItems.length; i++){
        if(array.indexOf(i)){
            selectItems[i].classList.add('select-hide');
        }
    }
}



