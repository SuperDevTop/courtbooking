import React from 'react';
// import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from "../layout/LoadingOverlay";

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
}) => {
    if (isAuthenticated && loading) {
        // return <Spinner />
        return <LoadingOverlay text='loading' color='success'/>
    }

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