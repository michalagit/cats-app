import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react'
const ImgListElement = (props) => {



    return (
        <Segment onClick={props.clicked.bind(this, props.authorId, props.imgSrc)}>
            <div className="img-list__element__photo">
                <img alt="some-img" src={props.imgSrc} />
            </div>
           <div className="img-list__element__captions">
            <h3>{props.title}</h3>
            <h4>{props.desc}</h4>
            <h3>{props.author? `Autor: ${props.author}`: null}</h3>
            <h3>{props.views? `Views: ${props.views}`: null}</h3>
            <h3>Data: {props.date}</h3>
           </div>
            

        </Segment>
    )
}
export default ImgListElement