// Global variables

let tasks=[];
const numberOfTaskFromApi = 10;
let apiUrl = 'https://jsonplaceholder.typicode.com/todos/';
const tasksSection = document.getElementById('tasks');
let inputData = document.getElementById('input');
const numberOfTask = document.getElementById('numberOfTask');

// get tasks data from API 

for(let i=0;i<numberOfTaskFromApi;i++){
    apiUrl = `https://jsonplaceholder.typicode.com/todos/${i+1}`;
    fetch(apiUrl)
         .then(response => response.json())
         .then(json => {
            tasks.push(json);
            displayInfo();
         })
         .catch(error => alert(error));
}


// function defination for load task 
function  loadTasks(){

    tasksSection.innerHTML = "";    

    if(tasks.length===0){
        window.alert('There is no task, please add some task..')
        return;
    }


    for(let i=0;i<tasks.length;i++){
        const {section,p,deleteBtn,checkbox} = createSection();
        p.innerText = tasks[i].title;
        //console.log(tasks[i].completed);
        if(tasks[i].completed){
            p.setAttribute('class','marked')
        }

        tasksSection.appendChild(section);
    }

}

// function defination to create task section HTML elements
function createSection(){
    const section = document.createElement('section');
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.setAttribute('onclick','markedAsDone(this)');
    const p = document.createElement('p');
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('onclick','deleteTask(this)')
    const nameBtn = document.createTextNode('Delete');
    deleteBtn.appendChild(nameBtn);

    section.appendChild(checkbox);
    section.appendChild(p);
    section.appendChild(deleteBtn);

    return {section,p,deleteBtn,checkbox};
}

// function definaton to add task
function addTask(){
    const data = inputData.value;
    inputData.value="";
    if(!isValid(data)){
        return;
    }
    if(!checkConstraints(data)){
        return;
    }
    tasks.push({
        title:data,
        completed:false
    });
    displayInfo();
    loadTasks();
    
}

// function def to display how many task we have
function displayInfo(){
    numberOfTask.innerText = `You have ${tasks.length} tasks.`
}

// function def to check input given by user is valid or not
function isValid(text){
    if(text=="" || text.length<6){
        window.alert('Please Check Your Input, You should enter at least 6 character..');
        return false;
    }else{
        return true;
    }
}

// function def. to delete task using button named delete
function deleteTask(e){
    const text = e.parentElement.childNodes[1].innerText;
    let index = findIndex(text,tasks,'title')
    if(index >= 0){
        tasks.splice(index,1);
        loadTasks();
        displayInfo();
    }else{
        window.alert('Something went wrong!!!');
        
    }
}

// function defination to check if this task is already in the list
function checkConstraints(text){
    let index =  findIndex(text,tasks,'title')
    if(index==-1){
        return true;
    }else{
        window.alert('This task is already on your list!!!')
        return false;
    }
}

// function defination to marked when user click the check button 
function markedAsDone(e){
    if(e.checked){
        e.parentElement.childNodes[1].setAttribute('class','marked');
    }else{
        e.parentElement.childNodes[1].setAttribute('class','unmarked');
    }
    
}

// function defination to find index inside the object array accroding to specified text

function findIndex(text,objArr,key){
    let index = -1;

    for(let i=0;i<objArr.length;i++){
        console.log(objArr[i][key])
        if(objArr[i][key] === text){
            index = i
        }
    }
    
    return index;
}

