import React from 'react';
import ImgListElement from '../ImgList/ImgListElement';
import LoaderComponent from '../Loader/Loader'
import { Header, Input, Icon, Button, ButtonContent, Select } from 'semantic-ui-react';

const SearchComponent = (props) => {
    let componentStyles={
        textAlign: 'center'
    }
    let inputStyles = {
        width: '80%',
        maxWidth: '400px'
    }
    let buttonStyles = {
        display: 'block',
        width: '80%',
        maxWidth: '400px',
        margin: '15px auto 5px auto'
    }

    // let sortedBy = props.sortedBy? props.sortedBy : ''
    let selectValue = props.options.filter((option) => option.value === props.sortedBy)
   
    const selectBar = props.result.length? 
            <div>
                <Header as="h2" content={`Sorted by: ${selectValue[0].text}`} textAlign='center' style={{marginTop: '20px'}} />
                <Select options={props.options} className='order-dropdown' value={selectValue[0].value} onChange={props.onSortChange}  /> 
            </div> :
            null

    
    const searchResults = props.loading? 
        <div id="user-gallery">
            <div id="gallery-list">
                <LoaderComponent />
            </div>
        </div> : 
        <div id="gallery-list" className="clearfix">
           
            
            {props.result.map(element=> {
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
        </div>
    
    return (
        <div id="search-page" style={componentStyles}>
            <Header as="h2" content="Looking for something?" textAlign="center"/>
            <Input placeholder="Just type..." className="big" style={inputStyles} onChange={props.changed} value={props.inputValue}/>
            <div>
                <Button animated color="green" style={buttonStyles} onClick={props.onSearch}>
                    <ButtonContent visible>Search</ButtonContent>
                    <ButtonContent hidden><Icon name="search"/></ButtonContent>
                </Button>
                <Button animated color="red" style={buttonStyles} onClick={props.onClear}>
                    <ButtonContent visible>Clear</ButtonContent>
                    <ButtonContent hidden><Icon name="ban"/></ButtonContent>
                </Button>
            </div>
            { selectBar }
            {searchResults}
            
        </div>
    )

}

export default SearchComponent