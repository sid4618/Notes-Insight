// console.log("hello");
showNotes();

// Automatic heading written
const heading = document.getElementById("heading");
const str = "Welcome to Note-Insight";
let idx = 1;
setInterval(write, 200);
heading.addEventListener("load", write());
function write() {
  heading.innerText = str.slice(0, idx);
  idx++;
  if (idx > str.length) {
    idx = 1;
    //PASUE DE YAHA PR THODI DER KAAA
  }
}
// if user click at clear all notes then clear the local
function clear() {
  localStorage.clear();
  showNotes();
}
let clearBtn = document.getElementById("clearNotes");
clearBtn.addEventListener("click",clear);



// if user add a note and title,add it to local storage
function add(e) {
  let addTxt = document.getElementById("addTxt");

  // for title
  let addTitle = document.getElementById("title");
  let titles = localStorage.getItem("titles");

  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }
  titleObj.push(addTitle.value);
  localStorage.setItem("titles", JSON.stringify(titleObj));
  // console.log(
  //   titles
  // );
  addTitle.value = "";

  // for note
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notes);

  // showing of notes
  // showTitles();
  showNotes();
}
let addBtn = document.getElementById("addBtn");
6;
addBtn.addEventListener("click",add);

// // function to show titles from localStorage
// function showTitles() {
//   let titles=localStorage.getItem('titles');
//   if(titles==null){
//     titlesObj=[];
//   }
//   else{
//     titlesObj=JSON.parse(titles);
//   }

// }

// function to show wlwments from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let titles = localStorage.getItem("titles");
  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }
  // console.log(titleObj);
  // let titleArray=Array.from(titleObj);
  // console.log(titleArray);
  let html = "";
  notesObj.forEach(function (ele, ind) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titleObj[ind]}</h5>
                        <p class="card-text"> ${ele}</p>
                        <button id="${ind}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add" button present in above section to add a note `;
  }
}

// function to delete a notes
function deleteNote(ind) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// searching operation



let search = document.getElementById("searchTxt");
search.addEventListener("input", function (){
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    //searching by title keywords
    let titleTxt = element.getElementsByTagName("h5")[0].innerText;
    // searching by note keywords
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else if (titleTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

    // console.log(cardTxt);
  });
});


// speech to text

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'hello': function() {
      console.log("Hello");
    },
    'add title *tag':function(variable) {
      console.log(variable);
      let title=document.getElementById("title");
      title.value=variable;
    
    },
    'add note *tag':function(variable){
      console.log(variable);
      let note=document.getElementById("addTxt");
      note.value=variable;
    },
    'add':function(){
      console.log("add ho gaya");
      add();
    },
    'clear': function() {
       clear();
    },
    'delete *tag': function(variable) {
      console.log("delete ho gaya");
      deleteNote(variable);
    }
    
    
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
