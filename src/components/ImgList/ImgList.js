import React from 'react';
import ImgListElement from './ImgListElement'
import LoaderComponent from '../Loader/Loader';
import { Header, HeaderContent, Select } from 'semantic-ui-react'
import './ImgList.css';




const ImgList = (props) => {

    if (props.loading) {
        return (
            <div id="gallery-list" className="clearfix">
                <LoaderComponent />
            </div>
        )
        
    }
    
    
    let selectValue = props.options.filter((option) => option.value === props.sortedBy)

    if (!props.loading && props.photos) {
        return (
            <div id="gallery-list" className="clearfix">
                <Header as="h2" content={`Sorted by: ${selectValue[0].text}`} textAlign="center" style={{marginTop: '20px'}} />
                <Select placeholder="Sort by..." options={props.options} className='order-dropdown' value={selectValue[0].value}   onChange={props.onSortChange} />
                
                {props.photos.map((element,index) => {
                    let imgSrc = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
                    return <ImgListElement 
                        key={element.id} 
                        imgSrc={imgSrc} 
                        date={element.datetaken}
                        title={element.title}
                        desc={element.description._content}
                        author={element.ownername}
                        authorId={element.owner}
                        clicked={props.onItemClick}/>
                })}
                { props.pagination? <LoaderComponent /> : null}  
            </div>
        )
    } 
    return null
}

export default ImgList