

let text = decodeURIComponent(window.location.search).replace(/\+/g, ' ');
let message = text.substring(text.indexOf('=')+1, 30); 
let site = window.location.href.split('?')[0];  


let messageSave = function(message){   //передача данных для записи
    let i = localStorage.length+1;     // ключ
    let a = false;                            
    if (message){

        let b =  message+','+ a+','+ i;  // значение
        localStorage.setItem(i,b);
        window.location.replace(site);  //перезагрузка на начальную страницу, чтобы избавиться от "хвоста" при случайном нажетии Enter       
    }    
}

let showMessage = function(){         // создание   дивов
    let listBox = document.querySelector('.listbox');

        for(let i = 1; i <= localStorage.length; i++){
            let code = localStorage.getItem(i).split(',');
            let message = code[0];

            let boxdiv = document.createElement('div');
            boxdiv.classList.add('div');
            listBox.appendChild(boxdiv);

            let input = document.createElement('input');
            input.classList.add('input');
            input.setAttribute('type', 'checkbox');                      
            input.setAttribute('onchange', 'changeCheck()');
            boxdiv.appendChild(input); 

            let list = document.createElement('div');
            list.classList.add('message');
            list.innerHTML = message; 
            boxdiv.appendChild(list); 
            
            if(code[1] == 'true') { // проверка наличия птички при обновлении
                input.setAttribute('checked', 'checked');
                list.style.textDecoration = 'line-through';
                list.style.color = '#a1887f'; 
            } 
                                  
        }
           
}     

let changeCheck = function() { //реакция на onchange

    let a = document.querySelectorAll('.input');
    let b = document.querySelectorAll('.message');

    for(let i = 1; i <= localStorage.length; i++) {
    let code = localStorage.getItem(i).split(',');

        if(a[i-1].checked == true) {
            b[i-1].style.textDecoration = 'line-through'; 
            b[i-1].style.color = '#a1887f'; 
            code[1] = true;
            code = code.join(',');
            localStorage.setItem(i,code);

                           
        }
        else {
            b[i-1].style.textDecoration = 'none';
            b[i-1].style.color = '#3e2723'; 
            code[1] = false;
            code = code.join(',');
            localStorage.setItem(i,code);                               
        }        
    }
    
}

let givProm = function () { // редактирование записи
    let c = document.querySelectorAll('.message');
    
    for(let i=0; i < localStorage.length; i++) {
        c[i].addEventListener('mouseup', function() {
        let d = localStorage.getItem(i+1).split(',');
        let e = prompt('Редактирование', d[0]);
       
        d[0] = e;
        d = d.join(','); 
        localStorage.setItem(i+1, d);
        window.location.replace(site);
        
        })
    }    
    
}

let clearAll = function () {//очистка страницы и записи
    
    let a = document.querySelectorAll('.div');
    for(i = 0; i < localStorage.length; i++) {
        a[i].remove();   
    }
    
   localStorage.clear();

}
let clear = document.querySelector('.button');
    clear.addEventListener('click', clearAll); 
 

messageSave(message);
showMessage();  
givProm();











