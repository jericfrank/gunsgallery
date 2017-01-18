import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";

import Loader from "halogen/PulseLoader";

const style = {
	dropzone: {
		"width": "100%",
		"borderStyle": "dashed",
		"borderWidth": "1px",
		"textAlign": "center",
		"lineHeight": "200px"
	}
}
class RecordsUpload extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	loading: false,
	    	progress: ''
	    }

	    this.onDrop = this.onDrop.bind(this);
	}
	
	componentDidMount() {
	}

    componentWillUnmount() {
    }

    onDrop (files) {
    	if(this.state.loading){

    		return false;
    	}

      	files.forEach((file)=> {

            var data = new FormData();
	          	data.append('file', file);

            var config = {
	            	onUploadProgress: (progressEvent) => {
	              		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )

	              		this.setState({ progress: percentCompleted });
	            	}
	          	}

	        this.setState({ loading: true });

          	axios.post('/api/upload', data, config )
            	.then( (res) => {
            		this.setState({ loading: false });
            		this.setState({ progress: '' });

            		this.props.dispatch({type: "ADD_UPLOADS", payload: res.data });
            	})
            	.catch( (err) => {
            		console.log(err )
            		
            	});

        });
    }

	render() {
		const dropzone = <Dropzone style={style.dropzone} accept="image/*" disableClick={this.state.loading} multiple={true} ref="dropzone" onDrop={this.onDrop}>
                	
                	{ (!this.state.loading) ? <p>click/drop to <i className="fa fa-upload"></i> upload image</p> : <Loader color="#3F3E3C" size="16px" margin="4px"/> }
    			</Dropzone>

		return	<div className="col-md-3 col-sm-6 col-xs-12">
					<div className="post-container">
						<div className="post-desc">
							{ dropzone }
						</div>
					</div>
				</div>
	}
}

export default connect()(RecordsUpload);