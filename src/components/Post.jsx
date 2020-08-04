import React from 'react';
import { useState, useEffect  } from 'react';
export default function Post(props){
    const [content,setContent] = useState(null) ;
    console.log("http://localhost:8080/posts/"+props.match.params.id)
    useEffect(()=>{
        fetch("http://localhost:8080/posts/"+props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => {setContent(JSON.stringify(result));
                ;}
            );
        },[]
    );

    return(
        <h3>
            {content}
        </h3>
    );

}