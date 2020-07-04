$(document).ready(
)
function addfriend(friendname){
    $.ajax({
        url:'/ajax/addfriend',
        data :{text:friendname},
        contentType :"text",
    })

}
function liked(id){
    
    var jqxhr =$.post( "/ajax/like", { id:id} , (object)=>{    });
}