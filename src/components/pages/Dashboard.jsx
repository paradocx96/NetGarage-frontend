import React, {Component} from 'react';
import NavigationBarDashboard from "../layouts/Navigation/NavigationBarDashboard";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavigationBarDashboard/>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;