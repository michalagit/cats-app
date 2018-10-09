import React from 'react';
import ImgListElement from '../ImgList/ImgListElement'
import LoaderComponent from '../Loader/Loader';
import { Header, Select } from 'semantic-ui-react';

const UserPhotos = (props) => {

    let componentStyles = {
        textAlign: 'center'
    }
    
    if (props.loading) {
        return (
            <div id="user-gallery" style={componentStyles}>
                <Header as="h2" content = {props.photos[0].ownername}/>
                <div id="gallery-list">
                    <LoaderComponent />
                </div>
            </div>
        )
        
    }
    let selectValue = props.options.filter((option) => option.value === props.sortedBy)
    return (
        <div id="user-gallery" style={componentStyles}>
            <Header as="h2" content = {props.photos[0].ownername}/>
            <div id="gallery-list" className="clearfix">
                <Header as="h2" content={`Sorted by: ${selectValue[0].text}`} textAlign="center" style={{marginTop: '20px'}} />
                <Select placeholder="Sort by..." options={props.options} className='order-dropdown' value={selectValue[0].value} onChange={props.onSortChange} />
                {props.photos.length > 0? 
                props.photos.map((element,index) => {

                    let imgSrc = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
                    return <ImgListElement 
                        key={element.id} 
                        imgSrc={imgSrc} 
                        date={element.datetaken}
                        title={element.title}
                        desc={element.description._content}
                        views={element.views}
                        authorId={element.owner}
                        clicked={() => false }/>
                }) : null
                }
                { props.pagination? <LoaderComponent /> : null}
            </div>
        </div>
    )

}
export default UserPhotos