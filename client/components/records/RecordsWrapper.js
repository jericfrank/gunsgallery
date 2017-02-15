import React from "react";
import { connect } from "react-redux";

import { removeUploads } from "../../actions/uploadsActions";

class RecordsWrapper extends React.Component {
	constructor() {
	    super();

	    this.handleRemove = this.handleRemove.bind(this);
	}
	
	componentDidMount() {
	}

    componentWillUnmount() {
    }

    handleRemove(e){
    	e.preventDefault();
    	const { data } = this.props;
    	this.props.dispatch(removeUploads(data));
    }

	render() {
		const { data , handleOpenLightBox } = this.props;

		return  <div className="col-md-3 col-sm-6 col-xs-12">
					<div className="post-container">

						<div className="post-option">
							<ul className="list-options">
								<li><a href="#" onClick={this.handleRemove}><i className="fa fa-trash"></i> <span>Remove</span></a></li>
								<li><a style={{cursor: "pointer"}} onClick={handleOpenLightBox}><i className="fa fa-arrows-alt"></i> <span>Fullscreen</span></a></li>
							</ul>
						</div>

						<div className="post-image">
							<img style={{cursor: "pointer"}} onClick={handleOpenLightBox} src={`/uploads/${data.filename}`} className="img-responsive" alt={`/uploads/${data.filename}`} />
						</div>
						<div className="post-desc">
                			 <p>{ data.originalname }</p>
              			</div>
					</div>

				</div>
	}
}

RecordsWrapper = connect()(RecordsWrapper)

export default RecordsWrapper;
