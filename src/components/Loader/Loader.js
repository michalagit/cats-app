import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const LoaderComponent = (props) => {
    return (
        <Segment id="loader">
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
        </Segment>
    )
}

export default LoaderComponent;