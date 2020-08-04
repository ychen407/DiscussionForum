import React, { Fragment }  from 'react';
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Content from '../components/Content'

export default function Home(){
    return(
        <Fragment>
            <Header/>
            <SearchBar/>
            <Content/>
        </Fragment>
    );
}