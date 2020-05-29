<div class='my-posts-container'>
    <div>
         <%-include('friends.ejs',{friend:postobj.username});%> 
    </div>
    <div> 
        <%=postobj.caption%> 
    </div>
    <span>
        <div>likes:<%=postobj.likes%></div>
        <div>posted on:<%=postobj.creationdate%></div>
    </span>
</div>
