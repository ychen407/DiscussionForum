import Editor from 'mui-rte';
import React,{useState} from 'react'

export default function RichText(props){
    return(
        <Editor defaultValue = {props.content} toolbar={false} inlineToolbar='false' readOnly="true"/>
    )
}