import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }
sideDrawerCloseHandler= ()=>{
    this.setState({showSideDrawer: false});
}

sideDrawerToggleHandler = () =>{
    this.setState((prevState) => {
        
            return {showSideDrawer: !this.state.showSideDrawer}
        });
}
    render(){
    return (
        <React.Fragment>
        <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
        <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
    </React.Fragment>
    );
    
} 
}
export default Layout;