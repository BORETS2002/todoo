const Elform = document.querySelector(".form")
const Elinput = document.querySelector(".input")
const ElList = document.querySelector(".list")
const Elitem = document.querySelector(".item")
const ElBtnFrom = document.querySelector(".btn-gaz")

const Elall = document.querySelector(".all")
const Elcopmleted = document.querySelector(".copmleted")
const Eluncopmleted = document.querySelector(".uncopmleted ")
const qop = new DocumentFragment()

const Templste = document.querySelector(".template").content;
ElBtnFrom.textContent = "check"

let initialId = 0;



function renderArray (todo , list)  {
  ElList.innerHTML  = "";
  const complateArray = todo.filter(function (item){
    // console.log(item.title );
    return item.iscompleted
  })    
 
  Elcopmleted.textContent = complateArray.length
  Eluncopmleted.textContent = todo.length - complateArray.length;
  Elall.textContent = todo.length;

  //domga Chizish
    todo.forEach(function(item , i ) {
    const elTemp = Templste.cloneNode(true);
 

    elTemp.querySelector(".text").textContent = item.title;
    elTemp.querySelector(".btn-del").dataset.id  = item.id;
    elTemp.querySelector(".btn-add").dataset.id  = item.id;
    elTemp.querySelector(".chek").dataset.id  = item.id;   
    qop.appendChild(elTemp);

    if(item.iscompleted == true){   
// console.log("ssdfafaefaesfsaefdasfdsf");
 
      // elTemp.querySelector(".chek").checked = true;
      // elTemp.querySelector(".text").textContent = "bosildi"
    }

    list.appendChild(qop)
}); //domga Chizish
}


const localTodo = JSON.parse(window.localStorage.getItem("todos"))
let todos  = localTodo || []
renderArray(todos , ElList);

let editingId;
let iscompleted;

Elform.addEventListener("submit", (evt)=> {
  evt.preventDefault()
  const ElinputValue = Elinput.value;
 
  if ( ElBtnFrom.textContent == "check"  ) {
   
    todos.push({
        id:++initialId,
        title:ElinputValue,
        iscompleted:false
        });
  Elform.reset()
  window.localStorage.setItem("todos", JSON.stringify( todos))
     renderArray(todos,ElList);
      }
  else if ( ElBtnFrom.textContent == "edit" ){
    const obj = {
      id:editingId,
      title:Elinput.value,
      iscompleted,
    };
    const findIndexTodo = todos.findIndex((todo) => todo.id === obj.id );
    todos.splice(findIndexTodo , 1 , obj);
    window.localStorage.setItem("todos", JSON.stringify( todos))
    renderArray(todos, ElList)
    ElBtnFrom.textContent = "check";
    Elform.reset()

  }

   
})


  ElList.addEventListener("click", function(evt){

  if (evt.target.matches(".btn-del")){
    const DeldataId = Number(evt.target.dataset.id - 1) 
    const returtnId =  todos.findIndex(function(todo){
  return  todo.id  === DeldataId 
 })
   todos.splice(returtnId + 1, 1)
   window.localStorage.setItem("todos", JSON.stringify( todos))
  renderArray(todos , ElList);
}

if (evt.target.matches(".chek")){
const DeldataId = Number(evt.target.dataset.id)
const returtnId =  todos.find(function(todo){
  return  todo.id   === DeldataId 
 }) 
 
 returtnId.iscompleted = !returtnId.iscompleted
 console.log(returtnId);
 window.localStorage.setItem("todos", JSON.stringify( todos))
  renderArray(todos , ElList);
}


if (evt.target.matches(".btn-add")){
  const Add = Number(evt.target.dataset.id ) ;
  const returtnId =  todos.find(function(todo){
    console.log(todo.id );
    return  todo.id  === Add ;
   })
   editingId = returtnId.id ;
   iscompleted = returtnId.iscompleted;
   Elinput.value = returtnId.title;
   ElBtnFrom.textContent = "edit"
  }
  

  })