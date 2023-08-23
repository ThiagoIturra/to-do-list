const localStorageKey = 'to-do-list-key';

function validateExistTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('new-task-input').value;
    let exist = values.find(x => x.name == inputValue);
    return !exist ? false : true;
}

function newTask() {
    let input = document.getElementById('new-task-input');
    input.style.border = '';
    if(!input.value) {
        input.style.border = '1px solid var(--error)';
        alert('Digite uma tarefa para incluir na sua lista!');
    }
    else if(validateExistTask()) {
        input.style.border = '1px solid var(--error)';
        alert('Já existe essa tarefa adicionada á sua lista!')
    }
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        ShowTask()
    }
    input.value = ''
}

function ShowTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id="to-do-list-btn" onClick='removeTask("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg></button></li>`
    }
}

function removeTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.find(x =>x.name == data);
    values.splice(index,1);
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    ShowTask()
}

ShowTask()