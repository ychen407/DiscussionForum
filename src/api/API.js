function makeNewPost (info) {
    var token = JSON.parse(localStorage.getItem("token"));
    return fetch('http://springboot-democh.herokuapp.com/new',{
        method:'POST',headers:{
            'Token' : token,
            'Accept':'application/json',
            'Content-Type': 'application/json',
        },body : JSON.stringify({
            title: info.title,
            content: info.content,
            username: info.author
        })
    })
};
function submitReply(info){
    var token = JSON.parse(localStorage.getItem("token"));
    return fetch('http://springboot-democh.herokuapp.com/new/reply',{
        method:'POST',headers:{
            'Token' : token,
            'Accept':'application/json',
            'Content-Type': 'application/json',
        },body : JSON.stringify({
            content: info.content,
            post_id:info.replyTo
        })
    })
}
function login(username,password){
    var url = new URL("http://springboot-democh.herokuapp.com/login");
    var params = {"username" : username,"password" : password};
    url.search = new URLSearchParams(params).toString();
    return(fetch(url,{method:"POST"  })
            .then(response => response.json()))
}
function signup(username,password){
    var url = new URL("http://springboot-democh.herokuapp.com/register");
    var params = {"username" : username,"password" : password};
    url.search = new URLSearchParams(params).toString();
    return(fetch(url,{method:"POST"  })
            .then(response => response.json()))
}

async function getPostDetail(id){
    try{
        let res = await fetch("http://springboot-democh.herokuapp.com/posts/"+id)
        let detail = await res.json();
        return detail;
    }catch{
        alert("Something went wrong.")
    }
}
export { makeNewPost, login, signup,getPostDetail,submitReply};