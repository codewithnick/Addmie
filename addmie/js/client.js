$(document).ready(
)
function addfriend(friendname){
    $.ajax({
        url:'/ajax/addfriend',
        data :{text:friendname},
        contentType :"text"
    })
    location.reload();
}
function removefriend(friendname){
    $.ajax({
        url:'/ajax/removefriend',
        data :{text:friendname},
        contentType :"text"
    })
    location.reload();
}
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
function liked(id){
    
    var jqxhr =$.post( "/ajax/like", { id:id} , (object)=>{    });
}
function saved(id){
    
    var jqxhr =$.post( "/ajax/save", { id:id} , (object)=>{    });
}
function viewpost(id){
    hide('menu'+id);
    window.location.href='/post?&id='+id;
}
function report(id){
    hide('menu'+id);
    window.location.href='/report'
}
function reportuser(id){
    hide('profilemenu');
    window.location.href='/report'
}
function copypostlink(id){
    hide('menu'+id);
}
function copyuserlink(id){
    hide('profilemenu');
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
    $.post( "/ajax/blockthispostuser", {blockthispostuserid:id} , (object)=>{

    });
}
function blockthisuser(id){
    hide('profilemenu');
    $.post( "/ajax/blockuser", {blockthisuserid:id} , (object)=>{

    });
    location.reload()
}
function unblockthisuser(id){
    hide('profilemenu');
    $.post( "/ajax/unblockuser", {unblockthisuserid:id} , (object)=>{
    });
    location.reload()
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
function postcomment(username,postid){
    var comment=$('#commenttext');
    var commentobject={
        comment:comment.val().trim(),
        username:username,
        postid:postid
    }
    
    $.post( "/ajax/newcomment", commentobject , ()=>{
        window.location.href='/post?&id='+postid
    });
    var value=document.getElementById('comment'+postid+'value')
    value.textContent=strtoint(value.textContent)+1

}

