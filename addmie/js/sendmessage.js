$(document).ready(
    message=''
);
function getmessagefrominput(){
    var message =$('#message');
    var value = message.val().trim();
    message.val('');
    return value;
}
    
function appendmessage(message){
    var messagecontainer =document.getElementById('messages');
    //console.log(messagecontainer);
    var mymessage= document.createElement("div")
    mymessage.setAttribute('class','sentmessagecontainer')
    var newmessage= document.createElement("p")
    newmessage.setAttribute('class','sent')
    newmessage.textContent=message;
    mymessage.appendChild(newmessage);
    messagecontainer.appendChild(mymessage);
}
function sendmessage(username,friend,secret){
    var message=getmessagefrominput();
    //console.log(secret)
    //console.log('{from:'+username+',to:'+friend+',message:'+message+'}')
    if(message!=null && message!=''){        
        var jqxhr =$.post( "/ajax/newmessage", { from:username,to:friend,message:message,secret:secret } , (object)=>{
            //call back function
            appendmessage(message);
            window.location.replace('/'+username+'/direct/inbox/'+object.convoid);
        });
    }  
}

function sendmessageagain(username,friend,result){
    var message=getmessagefrominput();
    if(message!=null && message!=''){        
        var jqxhr =$.post( "/ajax/appendmessage", { convoid:result,message:message } , (object)=>{
            //call back function
            appendmessage(message);
        });
    }  
}

function deleteconversation(id){
    hide('menu'+id)
}
function blockuser(id){
    hide('menu'+id)
}
function muteuser(id){
    hide('menu'+id)
}
function hide(id){
    var popup = document.getElementById(id);
    popup.classList.toggle("hide");
    //console.log('hiding')
  }