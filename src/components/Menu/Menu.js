import React from 'react';

import { Menu, MenuItem } from 'semantic-ui-react'

const MenuComponent = (props) => {

    let menuStyles = {
        fontSize: '25px',
        width: '25%',
        padding: 0
    }
    return (
        <Menu >
            <MenuItem active={props.activePage === "Main"} icon="image" style={menuStyles} onClick={props.clicked.bind(this, 'Main')}/>
                   
            <MenuItem active={props.activePage === "Search"} icon="search" style={menuStyles} onClick={props.clicked.bind(this, 'Search')}/>

            <MenuItem active={props.activePage === "Cat Map"} icon="map" style={menuStyles} onClick={props.clicked.bind(this, 'Cat Map')}/>
            <MenuItem active={props.activePage === "Main"} icon="map" style={menuStyles} onClick={props.clicked.bind(this, 'Main')}/>

        </Menu>
    )
}

export default MenuComponent