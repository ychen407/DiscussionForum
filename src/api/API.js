function getCurrentTime(){
        var m = new Date();
        var dateString =
            m.getUTCFullYear() + "/" +
            ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);
        
        return dateString;
}
function makeNewPost ( info) {
    console.log(info)
    fetch('http://localhost:8080/new',{
        method:'POST',headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
        },body : JSON.stringify({
            title: info.title,
            content: info.content,
            user_id: info.author,
            created: getCurrentTime(),
        })
    })
};
function login(username,password){
    var url = new URL("http://localhost:8080/login"),
    params = {"username" : username,"password" : password}
    url.search = new URLSearchParams(params).toString();
    fetch(url,{method:"POST"  })
    .then(response => response.json())
    .then(result=> console.log(result))
}
export { makeNewPost, login};