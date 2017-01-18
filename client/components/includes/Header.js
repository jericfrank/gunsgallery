import React from "react";
import { connect } from "react-redux";
import { searchUploads , retriveUploads , emptyUploads } from "../../actions/uploadsActions";
import _ from "lodash";

class Header extends React.Component {
    constructor() {
        super();
        

        this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange(e){
        e.preventDefault();
        const { uploads } = this.props;
        
        
        if(e.target.value.length > 3){
            this.props.dispatch( searchUploads(e.target.value) );
        }

        if(e.target.value.length == 0){
            
            this.props.dispatch(emptyUploads());
            this.props.dispatch(retriveUploads(0));
            
        }
    }

    render() {

        return <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"><span><img width="15px" src="/favicon.png"/> Guns</span> Gallery</a>
                        </div>


                        <div>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a>
                                        <input type="text" onChange={this.handleChange} className="form-control input-xs" placeholder="Search keyword.." />
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
    }
}

Header = connect((store) => {
    return {
        uploads: store.uploads,
    }
})(Header)

export default Header;