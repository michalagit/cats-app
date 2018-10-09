import React from 'react';
import { Segment, Header, HeaderContent, Icon } from 'semantic-ui-react';

const ErrorMsg = (props) => {
    let error = {
        code: props.errorCode? props.errorCode : 'Unknown',
        msg: props.errorMsg? props.errorMsg : 'Unknown'
    }
    
    return (
        <Segment inverted color="red" textAlign="center">
            <Header as="h1" > 
                <HeaderContent><Icon name="exclamation circle"/>Something went wrong :(</HeaderContent>
            </Header>
            <Header as="h2" content={`Error: ${error.code}`}/>
            <Header as="h2" content={`Msg: ${error.msg}`}/>
        </Segment>
    )
}

export default ErrorMsg;