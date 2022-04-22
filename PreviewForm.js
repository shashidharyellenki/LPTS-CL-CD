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


let count=1;
function developeblock(e){
   document.getElementById('exp').innerHTML+=
   `<div class="row" id="counter${count}">
    <h3 class="pt-3">Work Experience ${++count}</h3>

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


