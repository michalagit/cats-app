import React from 'react';
import { Header } from 'semantic-ui-react'
import ImgListElement from '../ImgList/ImgListElement';
import LoaderComponent from '../Loader/Loader';

const CatMap = (props) => {
    let lat = props.lat? props.lat : ""
    let lon = props.lon? props.lon : ""

    if (props.loading ) {
        return (
                <div id="gallery-list">
                    <LoaderComponent />
                </div>
        )
    }

    return (
        <div id="cat-map">
            <Header as="h2" content={`Your coordinates ${lat}, ${lon}`} textAlign="center"/>
            <Header as='h3' content="Map of cat photos near you"  textAlign="center"/>
            <div id="gallery-list" className="clearfix">
              
                {props.photos.length > 0? 
                props.photos.map((element,index) => {

                    let imgSrc = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
                    return <ImgListElement 
                        key={element.id} 
                        imgSrc={imgSrc} 
                        date={element.datetaken}
                        title={element.title}
                        desc={element.description._content}
                        author = {element.ownername}
                        authorId={element.owner}
                        clicked={() => false }/>
                }) : null
                }
                { props.pagination? <LoaderComponent /> : null}
            </div>
        </div>
    )

}

export default CatMap