import React from 'react';
// import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
    component: Component,
    auth: {isAuthenticated, loading}
}) => {
    // alert(loading)
    // if (loading) {
    //     return <Spinner />
    // }
    if (isAuthenticated) {
        return <Component />
    }

    return <Navigate to='/login' />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps) (PrivateRoute);