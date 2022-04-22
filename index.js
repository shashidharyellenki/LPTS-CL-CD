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
     const search = await fetch('./data.json');
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


//  progress
// let testdata = $.getJSON({ url: "../json/data.json", async: false, });
// testdata = JSON.parse(testdata.responseText);

function progress(args){
    localStorage.setItem("selectedStudent",args);
    location.href="../learners_progress_page.html";
}



let specialization='';
let technicalProgress='';
let tindex=0;
let softskillsProgress='';
//Event listener to load content
document.addEventListener('DOMContentLoaded',()=>{
    //Asynchronous function to fetch json data from data.json
    async function Fetch(){
        const data = await fetch("./data.json");
        const students = await data.json();
        // console.log('this is Course');
        return students;
    }
    //Asynchronous function to fetch json data from learningpath.json
    async function fetchCourse(){
        // console.log('entry to fetchCourse');
        const data1= await fetch("./learningpath.json");
        const courses= await data1.json();
        // console.log('this is fetchCourse',courses);
        return courses;   
    }
    //This code block displays image and name of student on header and loads chart data as well
    Fetch().then(res=>{
        for (const key in res) { 
                if(res[key].name === localStorage.getItem("selectedStudent")){
                    specialization=res[key].course;
                    technicalProgress=res[key].tprogress;
                    console.log('tech progress ---',technicalProgress);
                    softskillsProgress=res[key].softskillsprogress;
                    console.log('softskills progress----',softskillsProgress);
                    document.querySelector('#studentImage').innerHTML=`<img class="rounded-circle ms-4 me-2"
                style="width:60px;height:60px;" src="${res[key].image}">`;
                    document.querySelector('#studentName').innerHTML+=res[key].name+'\'s progress';
                    chartData(res[key]);
                    chartData2(res[key]);
            }
        }   
    });
    //This code block is used to display course names and their status
    fetchCourse().then(course=>{
        // var i=0; 
        console.log(specialization,'--------');
        var techbox=document.querySelector('#ThreeLevelTechnicalBox');
        var softbox=document.querySelector('#ThreeLevelSoftskillsBox');
        var scolor='4px solid green';
        var tcolor='4px solid green';
        for(const key in course[0][specialization]){
            courseName=course[0][specialization][key];
            console.log(courseName,technicalProgress[courseName].status,'important***');          
            if(technicalProgress[courseName].status==='pending'){
                tcolor='4px solid orange';}
            if(technicalProgress[courseName].status==='incomplete'){ 
                tcolor='4px solid #808080';}
            techbox.innerHTML+=`
            <h4 data-bs-toggle="modal" style="border-left:${tcolor};cursor:pointer;padding:0.7rem 0.5rem;background-color:antiquewhite;" data-bs-target="#exampleModal">${courseName}</h4>`;
        }
        for(const key in course[1]['Softskills']){
            courseName=course[1]['Softskills'][key];
            if(softskillsProgress[courseName].status==='pending'){
                scolor='4px solid orange';
            }
            if(softskillsProgress[courseName].status==='incomplete'){ 
                scolor='4px solid #808080';}
            console.log('this is fetchCourse function^&*%',courseName);
            softbox.innerHTML+=`
            <h4 data-bs-toggle="modal" style="border-left:${scolor};cursor:pointer;padding:0.7rem 0.5rem;background-color:antiquewhite;" data-bs-target="#exampleModal">${courseName}</h4>`;
        }
    });

    
    //This code block displays technical courses marks chart
    function chartData(obj){
        var mychart = document.getElementById('myChart').getContext('2d');
        const labels = obj.Technical;
        const data = obj.marks;
        var result = new Chart(mychart,{
        type:'bar',
        data:{
            title:"Progress",
            labels,
            datasets:[{
                label:"progress",
                data,
                backgroundColor:["#58508d","#ff6361","#bc5090","#00818a", "#f6c667"
                  ],
                pointBackgroundColor:"#33539e",
                barThickness:30         
                }],                                
             },
            options: {
                scales:{
                    x:{
                        title:{
                            display: true,
                            text:"Courses",
                            color:"black"
                        }
                    },
                    y:{
                        title:{
                            display: true,
                            text:"Marks Secured",
                            color:"black"
                        }                       
        
                    }
                },
                plugins: {               
                    title: {
                        display: true,
                        color:"black",
                        text: 'Progress',
                        padding: {                           
                            bottom: 30
                        },
                        font: {
                            family: 'nunito',
                            size: 28
                        }                      
                    },
                    legend: {
                        display: false,
                     } } } 
        });
        // let line = document.querySelector('.line');
        // let bar = document.querySelector('.bar');
        // line.addEventListener('click',()=>{
        // result.config.type="line";
        // result.update();
        // });
        // bar.addEventListener('click',()=>{
        //     result.config.type="bar";
        //     result.update();
        //     });
        // let doughnut = document.querySelector('.dougnut');
        // doughnut.addEventListener('click',()=>{
        // result.config.type="doughnut";
        // result.update();
        // });
    }
    //This code block displays softskills courses marks chart
    function chartData2(obj){
        var mychart2 = document.getElementById('myChart2').getContext('2d');
        const labels = obj.Softskills;
        const data = obj.softskillsMarks;
        let result = new Chart(mychart2,{
            type:'bar',
            data:{
                labels,
                datasets:[{
                    label:"progress",
                    data,
                    backgroundColor:["#58508d","#ff6361","#bc5090","#00818a", "#f6c667"
                      ],
                    pointBackgroundColor:"#33539e",
                    barThickness:30             
                    }],                                
                 },
            options: {
                scales:{
                    x:{
                        title:{
                            display: true,
                            text:"Courses",
                            color:"black",
                        }
                    },
                    y:{
                        title:{
                            display: true,
                            text:"Marks Secured",
                            color:"black"
                        }                             
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Progress',
                        color:"black",
                        padding: {
                            top:15,
                            bottom: 10
                        },
                        font: {
                            family: 'nunito',
                            size: 28
                        }
                    },
                    legend: {
                        display: false,
                        } } } 
        });
        // let line2 = document.querySelector('.line2');
        // let doughnut2 = document.querySelector('.dougnut2');
        // let bar2 = document.querySelector('.bar2');
        // line2.addEventListener('click',()=>{
        //     result.config.type="line";
        //     result.update();
        //     });
        // bar2.addEventListener('click',()=>{
        // result.config.type="bar";
        // result.update();
        // });
        // doughnut2.addEventListener('click',()=>{
        // result.config.type="doughnut";
        // result.update();
        // });
    }
});

let learningpath = $.getJSON({ url: "./courses.json", async: false, });
learningpath = JSON.parse(learningpath.responseText);

const techEvent= document.querySelector('#ThreeLevelTechnicalBox');
console.log(techEvent)
// console.log(techEvent.innerHTML,'techEvent.innerHTML******');
techEvent.addEventListener('click',modal);

const softskillsEvent=document.querySelector('#ThreeLevelSoftskillsBox');
console.log(softskillsEvent.innerHTML,'softskillsEvent.innerHTML******');
softskillsEvent.addEventListener('click',modal);

let color='green';
let num=0;
//This code block adds accordions and list items to accordion in modal body
function modal(selected){ 
    num+=1;
    console.log('you clicked block',num,'times');
    let course=selected.target.textContent;
    let element=selected.target;
    console.log(element,'clicked','*******');
    document.querySelector('#exampleModalLabel').innerHTML=`${course}`;
    var i=0; 
    for(const key in learningpath){ 
        if(learningpath[key].courseName===course){                    
            accordion=document.querySelector('#accordionFlushExample');
            accordion.innerHTML=``;
            for(const c in learningpath[key].modules){
                i+=1;
                const module=learningpath[key]['modules'][c];
                if(course in technicalProgress){
                    if(technicalProgress[course].status==='completed'){
                        color='green';            
                    }
                    else if(technicalProgress[course].status==='incomplete'){
                        color='red;display:none';            
                    }
                    else{
                        if(technicalProgress[course].module[module].status==='completed'){
                        color='green';
                        }
                        else{
                            color='red;display:none'; 
                        }
                    }
                }
                if(course in softskillsProgress){
                    if(softskillsProgress[course].status==='completed'){
                        color='green';            
                    }
                    else if(softskillsProgress[course].status==='incomplete'){
                        color='red;display:none';            
                    }
                    else{
                        if(softskillsProgress[course].module[module].status==='completed'){
                        color='green';
                        }
                        else{
                            color='red;display:none'; 
                        }
                    }
                }
                // if(technicalProgress.module===module || softskillsProgress.module===module){
                //     color='red;display:none';
                // }
                accordion.innerHTML+=`
                                                    <div class="accordion-item">
                                                    <h2 class="accordion-header" id="flush-heading${i}">
                                                    <div class="row" >
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">                                                           
                                                                <div class="col-1"><i class="material-icons" style="color:${color};padding-bottom:6px">done</i></div>
                                                                <div class="col-10"><li style="list-style-type:none;">${learningpath[key]['modules'][c]}</li></div>                                                            
                                                    </button>
                                                    </div>
                                                    </h2>
                                                    <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        <ol id="flush-collapse-ol${i}">
                                                        </ol>
                                                    </div>
                                                    </div>
                                                </div>`;                               
                for(const task in learningpath[key].tasks[module]){
                    const v ='flush-collapse-ol'+i;
                    listElement=document.getElementById(v);                  
                    if(course in technicalProgress){
                        if(technicalProgress[course].status==='pending'){
                            if(technicalProgress[course].module[module].status==='pending'){
                                console.log(typeof(task),task,')))))))');
                                if(task==='0'){
                                    color='green';
                                }
                                if(technicalProgress[course].module[module].task===learningpath[key].tasks[module][task]){
                                    console.log('hurrah','======');
                                    color='red;display:none';
                                    console.log(color,"=======")
                                }
                            }                               
                        }
                    }
                    if(course in softskillsProgress){
                        if(softskillsProgress[course].status==='pending'){
                            if(softskillsProgress[course].module[module].status==='pending'){
                                if(task==='0'){
                                    color='green';
                                }
                                if(softskillsProgress[course].module[module].task===learningpath[key].tasks[module][task]){
                                    console.log('hurrah','======');
                                    color='red;display:none';
                                    console.log(color,"=======")
                                }
                            }
                        }
                    }                                    
                    listElement.innerHTML+=`
                    <div class="row">
                    <div class="col-1"><i class="material-icons" style="color:${color};font-size:18px;">done</i></div>
                    <div class="col-10"><li style="list-style-type:none;">${learningpath[key].tasks[module][task]}</li></div>
                    </div>
                    `;
                }
            }
        }
    }
    
}



// module.exports=testProgress()
/**
 * // testing code snippet for jest frame work
const testProgress =()=>{
    let tempArray=[]
    for(let i=0; i<testdata.length; i++){
        tempArray.push(testdata[i].name)
    }
let answer = tempArray.includes(localStorage.getItem("selectedStudent").split(",")[0])   
    return answer
}
 */

// tags
const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');

let tags = [];

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = 'close';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.target.value.split(',').forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input.value = '';
    }
});
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})

input.focus();

let count=0;
function developeblock(e){
   document.getElementById('exp').innerHTML+=
   `<div class="row" id="counter${count}">
    <h5 class="pt-3">Work Experience ${++count}</h5>

                <div class="col-sm-6">
                    <label>Position<span>*</span></label>
                    <input type="text" id="" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Organization<span>*</span></label>
                    <input type="text" id="Organization" class="form-control">
                </div>
                <div class="col-sm-6 py-3">
                    <label>From:<span>*</span></label>
                    <input type="date" id="From" class="form-control">
                </div>
                <div class="col-sm-6 py-3">
                    <label>To:<span>*</span></label>
                    <input type="date" id="From" class="form-control">
                </div>
                
     </div>`
        }
        console.log(count)
function removeblock(){
    count--;
    document.getElementById(`counter${count}`).remove()
}

// preview
const Fname = document.querySelector('#Fname');
const Lname = document.querySelector('#Lname');
const Mail = document.querySelector('#Email');
const textareaBio = document.querySelector('#textarea-Bio');
const textareaTag = document.querySelector('#textarea-Tag');
const school = document.querySelector('#school');
const Board = document.querySelector('#Board');
const Graduation = document.querySelector('#Graduation');
const GraduationUniversity = document.querySelector('#Graduation-university');
const postgrad = document.querySelector('#postgrad');
const postgradUniversity = document.querySelector('#postUniversity');
const FB = document.querySelector('#FB');
const Insta = document.querySelector('#Insta');
const Git = document.querySelector('#Git');
const Linkedin = document.querySelector('#Linkedin');
const preview = document.querySelector('#preview');
const Tags = document.querySelector('#textarea-Tag');

let list = [Fname, Lname, Mail, textareaBio,textareaTag,school, Board, Graduation, GraduationUniversity,postgrad,postUniversity, FB, Insta, Linkedin, Git];
list.forEach(item=>{
    item.addEventListener('blur',(e)=>{
        
        let id = (item.id);

        if(id === 'Fname'){
           localStorage.setItem("Fname", item.value)
        }
        if(id === 'Lname'){
            localStorage.setItem("Lname", item.value)
        }
        if(id === 'Email'){
            localStorage.setItem("Mail", item.value)
        }
        if(id === 'textarea-Bio'){
            localStorage.setItem("textareaBio", item.value)
        }
        if(id === 'textarea-Tag'){
            localStorage.setItem("Tag", item.value)
        }
        if(id === 'school'){
            localStorage.setItem("school", item.value)
        }
        if(id === 'Board'){
            localStorage.setItem("Board", item.value)
        }
        if(id === 'Graduation'){
            localStorage.setItem("Graduation", item.value)
        }
        if(id === 'Graduation-university'){
            localStorage.setItem("GraduationUniversity", item.value)
        }
        if(id === 'postgrad'){
            localStorage.setItem("postgrad", item.value)
        }
        if(id === 'postUniversity'){
            localStorage.setItem("postUniversity", item.value)
        }
        if(id === 'FB'){
            localStorage.setItem("FB", item.value)
        }
        if(id === 'Insta'){
            localStorage.setItem("Insta", item.value)
        }
        if(id === 'Linkedin'){
            localStorage.setItem("Linkedin", item.value)
        }
        if(id === 'Git'){
            localStorage.setItem("Git", item.value)
        }
preview.innerHTML=`
                <h5><b>Personal Details</b></h5>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">First Name<span>*</span></label>
                    <p>${localStorage.getItem('Fname')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Last Name<span>*</span></label>
                    <p>${localStorage.getItem('Lname')}</p>
                </div>
            
                <div class="col-sm-12 col-md-6">
                    <label class="form-label">Email<span>*</span></label>
                    <p>${localStorage.getItem('Mail')}</p>
                </div>
                <div class="col-sm-12 col-md-6">
                    <label class="form-label">Short Bio<span>*</span></label>
                    <p>${localStorage.getItem('textareaBio')}</p>
                </div >
                <div class="col-sm-12 col-md-6">
                    <label class="form-label">Tags<span>*</span></label>
                    <p>${localStorage.getItem('Tag')}</p>
                </div >
                <div style="border-bottom:3px solid #eee"></div>
                <h5><b>Acadamics</b></h5>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">School<span>*</span></label>
                    <p>${localStorage.getItem('school')}</p>
                </div>

                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Board<span>*</span></label>
                    <p>${localStorage.getItem('Board')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Graduation<span>*</span></label>
                    <p>${localStorage.getItem('Graduation')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">University<span>*</span></label>
                    <p>${localStorage.getItem('GraduationUniversity')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Post Graduation<span>*</span></label>
                    <p>${localStorage.getItem('postgrad')}</p>
                </div>
                <div class="col-sm-12 col-md-3" >
                    <label class="form-label">Post Graduation/University<span>*</span></label>
                    <p>${localStorage.getItem('postUniversity')}</p>
                </div>
                <div style="border-bottom:3px solid #eee"></div>
                <h5><b>Social Handles</b></h5>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Instagram<span>*</span></label>
                    <p>${localStorage.getItem('Insta')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">GitHub<span>*</span></label>
                    <p>${localStorage.getItem('Git')}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Facebook<span>*</span></label>
                    <p>shashi </p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <label class="form-label">Linkedin<span>*</span></label>
                    <p>${localStorage.getItem('Linkedin')}</p>
                </div>
                `
    })
})




// Addblocks


let countt=1;
function developeblock(e){
   document.getElementById('exp').innerHTML+=
   `<div class="row" id="counter${countt}">
    <h3 class="pt-3">Work Experience ${++countt}</h3>

                <div class="col-sm-6">
                    <label>Position<span>*</span></label>
                    <input type="text" id="" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Organization<span>*</span></label>
                    <input type="text" id="Organization" class="form-control">
                </div>
                <div class="col-sm-6 py-3">
                    <label>From:<span>*</span></label>
                    <input type="date" id="From" class="form-control">
                </div>
                <div class="col-sm-6 py-3">
                    <label>To:<span>*</span></label>
                    <input type="date" id="From" class="form-control">
                </div>
                
     </div>`
        }
        console.log(count)
function removeblock(){
    count--;
    document.getElementById(`counter${count}`).remove()
}



// tags


function changetab(){
var sel = document.querySelector('#nav-Acadamic-Details-tab')
bootstrap.Tab.getOrCreateInstance(sel).show()
}
function previoustab(){
    var sel = document.querySelector('#nav-personal-Details-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function nexttab(){
    var sel = document.querySelector('#nav-Social-Handles-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function previoustab1(){
    var sel = document.querySelector('#nav-Acadamic-Details-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function nexttab1(){
    var sel = document.querySelector('#nav-Work-Experience-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function previoustab2(){
    var sel = document.querySelector('#nav-Social-Handles-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function nexttab2(){
    var sel = document.querySelector('#nav-Work-submit-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()
}
function previoustab3(){
    var sel = document.querySelector('#nav-Work-Experience-tab')
    bootstrap.Tab.getOrCreateInstance(sel).show()

}


