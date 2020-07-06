$(document).ready(
)
function addfriend(friendname){
    $.ajax({
        url:'/ajax/addfriend',
        data :{text:friendname},
        contentType :"text"
    })

}
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
function liked(id){
    
    var jqxhr =$.post( "/ajax/like", { id:id} , (object)=>{    });
}
function report(id){
    hide('menu'+id);
}
function copypostlink(id){
    hide('menu'+id);
}
function editthispost(id){
    hide('menu'+id);
}
function removepost(id){
    hide('menu'+id);
    $.ajax(
        {
            url:'/ajax/removepost',
            data :{id:id},
            contentType :"text"
        },

 
            //call back removes element from front end
            removeElement(id)
        
    );
}
function blockthispostuser(id){
    hide('menu'+id);
}
function messagethispostuser(id){
    hide('menu'+id);
}
function changeusersettings(user){
    var a=document.getElementById('secret'+user);
    var b=document.getElementById('date'+user);
    var c=document.getElementById('notifications'+user);
    
    console.log(user)
        a=(a)=>{if(a.classList.includes('fa-toggle-on')){return true}else {return false}},
        b=(b)=>{if(b.classList.includes('fa-toggle-on')){return true}else {return false}},
        c=(c)=>{if(c.classList.includes('fa-toggle-on')){return true}else {return false}}
    settingsobject={
        secret:a,
        date:b,
        notifications:c
    }
    $.post( "/ajax/changesettings", settingsobject , (object)=>{

    });
}

