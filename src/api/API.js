
function makeNewPost ( info) {
    var token = JSON.parse(localStorage.getItem("token"));
    return fetch('http://springboot-democh.herokuapp.com/new',{
        method:'POST',headers:{
            'Token' : token,
            'Accept':'application/json',
            'Content-Type': 'application/json',
        },body : JSON.stringify({
            title: info.title,
            content: info.content,
            user_id: info.author
        })
    })
};
function login(username,password){
    var url = new URL("http://springboot-democh.herokuapp.com/login");
    var params = {"username" : username,"password" : password};
    url.search = new URLSearchParams(params).toString();
    return(fetch(url,{method:"POST"  })
            .then(response => response.json()))
}
export { makeNewPost, login};