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