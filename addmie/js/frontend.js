function strtoint(s){
  return parseInt(s);
}
function like(id){
  var element=document.getElementById('like'+id);
  element.classList.toggle('fas')
  element.classList.toggle('far')
  element.classList.toggle('red')
  liked(id);
  var value=document.getElementById('like'+id+'value')
  
  if(element.classList.contains('fas')){
    value.textContent=strtoint(value.textContent)+1
  }
  else{
    value.textContent=strtoint(value.textContent)-1
  }
}
function comment(id){
  const element=document.getElementById('comment'+id);
  window.location.href='/post?&id='+id+'#comments'
  
}
function share(id){
  const element=document.getElementById('share'+id);

}
function save(id){
  const element=document.getElementById('save'+id);
  element.classList.toggle('fas')
  element.classList.toggle('far')
  element.classList.toggle('gold')
  saved(id);
  var value=document.getElementById('save'+id+'value')
  
  if(element.classList.contains('fas')){
    value.textContent=strtoint(value.textContent)+1
  }
  else{
    value.textContent=strtoint(value.textContent)-1
  }
}
function dot(id)
{
  hide('menu'+id);
  
}
function hide(id){
  var popup = document.getElementById(id);
  popup.classList.toggle("hide");
  //console.log('hiding')
}
function togglebutton(id){
  var element=document.getElementById(id)
  element.classList.toggle('fa-toggle-off')
  element.classList.toggle('fa-toggle-on')
}