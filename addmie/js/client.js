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
function viewpost(id){
    hide('menu'+id);
    window.location.href='/post?&id='+id;
}
function report(id){
    hide('menu'+id);
    window.location.href='/report'
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
function messagethispostuser(id,username,friend,secret){
    hide('menu'+id);
    window.location.href='/'+username+'/direct/new/'+friend+'?&secret='+secret;
}

function changeusersettings(user){
    var a=document.getElementById('secret'+user);
    var b=document.getElementById('date'+user);
    var c=document.getElementById('notifications'+user);
        if(a.classList.contains('fa-toggle-on')){a=true}else {a=false}
        if(b.classList.contains('fa-toggle-on')){b=true}else {b=false}
        if(c.classList.contains('fa-toggle-on')){c=true}else {c=false}
    settingsobject={
        secret:a,
        dates:b,
        notifications:c
    }
    $.post( "/ajax/changesettings", settingsobject , (object)=>{

    });
}

