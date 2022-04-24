 //selecting all the dom items from document
 const searchfield = document.querySelector('#search');
 const filtersearch=document.querySelector('#filter');


 

 //feteches data from the json file.... and returns a promise using .then to read the promise
 async function fetchdata(){
     const search = await fetch('./data.json');
     const data = await search.json();
     return data;
     
 }
 //displaying the contents to the dispaly (not filtering... static display)
 function display(){
     fetchdata().then(response=>{
    displayData(response)
          })
     }


 async function filtering(searchvalue){ 
     //when the searchfeild is empty we render all the cards from json file
     if(searchvalue.length === 0){
         display();
     }
     const search = await fetch('./data.json');
     const data = await search.json();
    let matches = data.filter(matchdata=>{
         const regx= new RegExp(`${searchvalue}`,'gi');
         return  matchdata.bio.match(regx);
     })
     displayData(matches);
     
 };

 async function searchBar(searchvalue){
      //when the searchfeild is empty we render all the cards from json file
      if(searchvalue.length === 0){
         display();
     }
     const search = await fetch('./data.js');
     const data = await search.json();
    let matches = data.filter(matchdata=>{
         const regx= new RegExp(`${searchvalue}`,'gi');
         return  matchdata.name.match(regx);
     })
     displayData(matches);
 }
     // helping funciton
   function displayData(args){
     let card = document.getElementById('students');
     card.innerHTML=''    
     for(let i=0; i<args.length; i++){         
         card.innerHTML+=`
         <div class="box" >
                <div class="imgbox">
                 <img src="${args[i].image}" alt="Card image cap">
                </div>
                <div class="card-body" >
                  <h4 class="card-text">${args[i].name}</h4>
                  <h6 class="card-text">${args[i].email}</h6>
                  <h6 class="card-text"> ${args[i].bio}</h6>
                  <button  onclick="progress('${args[i].name}')">View details</button>                  
                </div>
         </div>`
     }
    }

 searchfield.addEventListener('input',()=>{
     console.log(searchfield);
     searchBar(searchfield.value);
 }); 
 filtersearch.addEventListener('click',()=>{
     filtering(filtersearch.value);
 });
