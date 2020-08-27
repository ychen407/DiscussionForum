import React from 'react';
import { useState, useEffect  } from 'react';
export default function Post(props){
    const [content,setContent] = useState(null) ;
    useEffect(()=>{
        fetch("http://springboot-democh.herokuapp.com/posts/"+props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => {setContent(JSON.stringify(result));
                ;}
            );
        }
    );

    return(
        <h3>
            {content}
        </h3>
    );

}