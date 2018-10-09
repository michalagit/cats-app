import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as service from '../../service/service'

import { Container, Header, Divider, Responsive, Button, ButtonContent, Icon } from 'semantic-ui-react'
import ImgList from '../../components/ImgList/ImgList'
import MenuComponent from '../../components/Menu/Menu';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import CatMap from '../../components/CatMap/CatMap';
import ErrorMsg from '../../components/Error/ErrorMsg';
import UserPhotos from '../../components/UserPhotos/UserPhotos';

import './galleryApp.css';

class GalleryApp extends Component {


  imgClickedHandler = (user_id, img) => {

    if (this.props.activePage === "User Photos") {
      return this.props.loadData(this.props.user_id, img)

    }

    this.props.loadData(user_id, img);
    this.props.onMenuClick('User Photos')

    service.GET_GALLERY_OF(user_id, 1)
    .then((response) => this.props.getGallery(response.data) )
    .catch( error => this.props.errorHandler(error))
  }


  
  menuClickHandler = (view) => {
    switch(view){
      case('Main'):
        this.props.loadData();
        this.props.onMenuClick(view);
        if (!this.props.searchPhrase !== 'cats'){
          service.GET_GALLERY('cats', 1)
          .then(response => this.props.getGallery(response.data))
          .catch(error => this.props.errorHandler(error))
          break;
        }
        service.GET_GALLERY(this.props.searchPhrase,  1)
        .then(response => this.props.getGallery(response.data))
        .catch(error => this.props.errorHandler(error))
        break;
      case('Search'):
        this.props.onMenuClick(view);
        break;
      case('Cat Map'):
        this.props.loadData();
        this.props.onMenuClick(view);
        service.GET_COORDS().then(response => {
          this.props.getCoords(response)
          service.GET_GALLERY("cat", 1, 'relevance', this.props.coords.lat, this.props.coords.lon).then(response => this.props.getGallery(response.data)).catch(error => this.props.errorHandler(error))
          
        })
        break;
      default:
        this.props.loadData();
        this.props.onMenuClick('Main');
        service.GET_GALLERY('cats')
        .then(response => this.props.getGallery(response.data))
        .catch(error => this.props.errorHandler(error))  
    }
  
  }
  inputChangeHandler = (event) => {
      this.props.searchPhraseUpdate(event.target.value)
  }

  searchHandler = () => {
    this.props.loadData();
    service.GET_GALLERY(this.props.searchPhrase, 1, this.props.sortedBy)
    .then(response => this.props.getGallery(response.data))
    .catch(error => this.props.errorHandler(error))
  }

  clearHandler = () => {
    this.props.clearGallery();
  }

  scrollHandler = () => {
    let listHeight = document.getElementById('gallery-list').offsetHeight;
    if (window.innerHeight + window.scrollY < 2500 ) {
      this.props.showButton(false);
    }
    if (window.innerHeight + window.scrollY > 2500 ) {
      this.props.showButton(true);
    }
    if (
      (window.innerHeight + window.scrollY) >= (listHeight - 600) && this.props.photos.length && !this.props.pagination
    ) {
      this.props.paginate(true);
      switch(this.props.activePage){
        case('User Photos'): 
        service.GET_GALLERY_OF(this.props.user_id, this.props.paginationPage, this.props.sortedBy)
        .then(response => {
        this.props.paginate(false, response.data)
        })
        .catch(error => {
        this.props.paginate(false)
        this.props.errorHandler(error)
        })
        break;
        case('Cat Map'):
        service.GET_GALLERY('cat', this.props.paginationPage, 'relevance', this.props.coords.lat, this.props.coords.lon)
        .then(response => {
        this.props.paginate(false, response.data)
        })
        .catch(error => {
        this.props.paginate(false)
        this.props.errorHandler(error)
        })
        break;
        default: 
        service.GET_GALLERY(this.props.searchPhrase, this.props.paginationPage, this.props.sortedBy)
        .then(response => {
        this.props.paginate(false, response.data)
        })
        .catch(error => {
        this.props.paginate(false)
        this.props.errorHandler(error)
        })
      }
      
      
    }
  }

  goTopHandle = () => {
    window.scrollTo(0,0)
    this.props.showButton(false)
  }

  sortHandle = (event, target) => {
    this.props.loadData();
    this.props.sortPhotos(target.value)
    switch(this.props.activePage){
      case('Main'):
        service.GET_GALLERY(this.props.searchPhrase, 1, target.value)
        .then(response => this.props.getGallery(response.data))
        .catch( error => this.props.errorHandler(error))
        break;
      case('Search'):
        service.GET_GALLERY(this.props.searchPhrase, 1, target.value)
        .then(response => this.props.getGallery(response.data))
        .catch( error => this.props.errorHandler(error))
        break;
      case('User Photos'):
        service.GET_GALLERY_OF(this.props.searchPhrase, 1, target.value)
        .then(response => this.props.getGallery(response.data))
        .catch( error => this.props.errorHandler(error))
        break;
      default: 
      return false
    }
  }

  componentDidMount() {
    
   switch(this.props.activePage) {
     case('Main'): 
      service.GET_GALLERY(this.props.searchPhrase, 1, 'relevance')
        .then(response => {
        this.props.getGallery(response.data)
      })
        .catch(error => {
        this.props.errorHandler(error)
      })
      break;
      default:

      service.GET_GALLERY('cats')
        .then(response => {
        this.props.getGallery(response.data)
      })
        .catch(error => {
        this.props.errorHandler(error)
      })
   }
    window.addEventListener('scroll', this.scrollHandler, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler, false);
  }



  render() {

    let pageContent = null;
    let buttonStyles = {
      display: 'none',
      position: 'fixed',
      bottom: '25%',
      opacity: '0.6'
    }
    if (this.props.activePage === "Main") {
      pageContent = <ImgList 
                      onItemClick={this.imgClickedHandler}
                      loading={this.props.loading}
                      pagination={this.props.pagination}
                      options = {this.props.sortOptions}
                      sortedBy={this.props.sortedBy}
                      onSortChange={this.sortHandle}
                      photos={this.props.photos} />
    } else if (this.props.activePage === "User Photos"){
      pageContent = <UserPhotos
                      mainImg = {this.props.clickedImg}
                      loading={this.props.loading}
                      pagination = {this.props.pagination}
                      photos={this.props.photos} 
                      options={this.props.sortOptions}
                      onItemClick={this.imgClickedHandler}
                      sortedBy={this.props.sortedBy}
                      onSortChange={this.sortHandle}/>
    } else if (this.props.activePage === "Search") {
      pageContent = <SearchComponent 
                      changed={this.inputChangeHandler}
                      inputValue={this.props.searchPhrase}
                      onSearch={this.searchHandler}
                      onClear = {this.clearHandler}
                      result={this.props.photos}
                      onItemClick = {this.imgClickedHandler}
                      options = {this.props.sortOptions}
                      sortedBy={this.props.sortedBy}
                      onSortChange={this.sortHandle}
                      loading={this.props.loading} />
    } else if (this.props.activePage === "Cat Map") {
      pageContent = <CatMap
                      loading={this.props.loading}
                      photos = {this.props.photos}
                      lat = {this.props.coords.lat}
                      lon = {this.props.coords.lon}
                      onItemClick = {this.imgClickedHandler}
                      pagination = {this.props.pagination} /> 
    } else if (this.props.activePage === "Error") {
      pageContent = <ErrorMsg errorCode={this.props.error.code} errorMsg={this.props.error.msg} />
    }
   
    if (this.props.buttonDisplay){
      buttonStyles.display = "block"
    }


    return (
      <Container className="app-container">
        <Header as="h1" textAlign="center" content="Gallery App" onClick={this.menuClickHandler}/>
        <MenuComponent activePage={this.props.activePage} clicked={this.menuClickHandler} />
        <Header as="h2" textAlign="center" content={this.props.activePage}/>
        <Divider/>
        <Button animated="vertical" color="grey" style={buttonStyles}  onClick={this.goTopHandle}>
          <ButtonContent visible><Icon name="angle double up"/></ButtonContent>
          <ButtonContent hidden><Icon name="angle double up"/></ButtonContent>
        </Button>
        <div className="content-wrapper">
          {pageContent}
        </div>
        
      </Container>
    );
  }
}



const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    photos: state.photos,
    error: state.error,
    searchPhrase: state.searchPhrase,
    loading: state.loading,
    pagination: state.pagination,
    paginationPage: state.paginationPage,
    user_id: state.usefulData,
    clickedImg: state.clickedImg,
    buttonDisplay: state.buttonDisplay,
    sortOptions: state.sortOptions,
    sortedBy: state.sortedBy,
    coords: state.coords
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMenuClick: (page) => dispatch({ type: 'CHANGE_VIEW', page }),
    getGallery: (data) => dispatch({ type: 'GET_GALLERY', data }),
    errorHandler: (error)=> dispatch({ type: 'ERROR', error }),
    searchPhraseUpdate: (phrase) => (dispatch({ type: 'INPUT_UPDATE', phrase })),
    loadData: (...data) => (dispatch({ type: 'LOAD', data })),
    clearGallery: () => (dispatch({ type: 'CLEAR' })),
    paginate: (bool, data) => (dispatch({ type: 'PAGINATE', bool, data })),
    showButton: (bool) => ( dispatch ({ type: 'GO_TOP_BUTTON', bool})),
    sortPhotos: (order) => ( dispatch ( {type: "SORT", order})),
    getCoords: (coords) => dispatch( {type: 'COORD', coords})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryApp);
