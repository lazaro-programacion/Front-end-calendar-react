import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PublicRoutes = ({
    isLogedIn,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={(props) => (
                (!isLogedIn) ? (<Component {...props} />) : (<Redirect to='/' />)
            )}
        />


    )
}

PublicRoutes.propTypes = {
    isLogedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}