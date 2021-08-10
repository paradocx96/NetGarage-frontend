import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Error404 extends Component {
    render() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <h1>404</h1>
                <Link to={'/'}>Homepage</Link>
            </div>
        );
    }
}

export default Error404;
