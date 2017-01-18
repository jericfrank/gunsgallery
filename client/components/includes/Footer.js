import React from "react";

export default class Footer extends React.Component {
    constructor() {
        super();

    }
  
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
    
        return <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Copyright &copy; 2017 All Right Reserved. Develop by <a href="#">Jeric Frank Sasil</a></p>

                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">

                            </div>
                        </div>
                    </div>
                </div>
    }
}