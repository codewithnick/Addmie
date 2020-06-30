function like(id){
  const element=document.getElementById('like'+id);
  element.classList.toggle('fas')
  element.classList.toggle('far')
  element.classList.toggle('red')
  liked(id);
}
function comment(id){
  const element=document.getElementById('comment'+id);
  
}
function share(id){
  const element=document.getElementById('share'+id);

}
function save(id){
  const element=document.getElementById('save'+id);
  element.classList.toggle('fas')
  element.classList.toggle('far')
  element.classList.toggle('gold')
}