import React from 'react';

const NotFound = ({ staticContext }) => {
    if (staticContext) {
        staticContext.notFound = true;
    }
    return (
        <div>Not found</div>
    );
}

export default {
    component: NotFound
}