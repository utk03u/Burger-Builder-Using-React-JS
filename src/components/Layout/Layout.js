import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: true
    }
sideDrawerCloseHandler= ()=>{
    this.setState({showSideDrawer: false});
}
    render(){
    return (
        <React.Fragment>
        <SideDrawer open = {this.state.showSideDrawer}closed = {this.sideDrawerCloseHandler}/>
        <Toolbar/>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
    </React.Fragment>
    );
    
} 
}
export default Layout;