import React from "react";
import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import Masonry from "react-masonry-component";
import Lightbox from 'react-image-lightbox';
import Loader from "halogen/PulseLoader";

import Header from "./includes/Header";
import Footer from "./includes/Footer";

import RecordsWrapper from "./records/RecordsWrapper";
import RecordsUpload from "./records/RecordsUpload";

import { retriveUploads } from "../actions/uploadsActions";

class Layout extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	records: {},
	    	photoIndex: 0,
            isOpen: false,
            loading: false
	    }

	    this.handleScroll = this.handleScroll.bind(this);
	}
	
	componentDidMount() {
    	this.props.dispatch(retriveUploads(0));
    	window.addEventListener('scroll', this.handleScroll);
	}

    componentWillUnmount() {
    }

	handleScroll(e) {
		let target = e.target || e.srcElement
	    let scrollTop = target.body.scrollTop

	    if ((window.innerHeight + scrollTop) >= document.body.offsetHeight) {
	        if(!this.state.loading){
	        	this.handleIncrement();
	        }
	    }

	}

	handleIncrement(){
		const { uploads } = this.props;

		this.setState({ loading: true });

		this.props.dispatch(retriveUploads( uploads.data.length )).then(
			(res)=>{
				this.setState({ loading: false });
			},
			(err)=>{
				this.setState({ loading: false });
			}
		);
	}

	handleOpenLightBox(index){

		this.setState({ isOpen: true , photoIndex: index });
	}

	render() {
		const { photoIndex, isOpen } = this.state;
		const { uploads } = this.props;
		let images = [];

		const data = _.map(uploads.data, (data, index)=>{

			images = [...images, `/uploads/${data.filename}`];
			return  <RecordsWrapper handleOpenLightBox={this.handleOpenLightBox.bind(this, index)} key={data._id} data={data}/>;
        });
		
		const nofile = <div className="col-md-3 col-sm-6 col-xs-12">
							<h2>No image found.</h2>
						</div>

		return 	<div>
					{isOpen &&
	                    <Lightbox
	                        mainSrc={images[photoIndex]}
	                        nextSrc={images[(photoIndex + 1) % images.length]}
	                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
	 
	                        onCloseRequest={() => this.setState({ isOpen: false })}
	                        onMovePrevRequest={() => this.setState({
	                            photoIndex: (photoIndex + images.length - 1) % images.length,
	                        })}
	                        onMoveNextRequest={() => this.setState({
	                            photoIndex: (photoIndex + 1) % images.length,
	                        })}
	                    />
	                }

					<Header />

						<div id="content">
							<div className="container">
								<div className="row">
									<Masonry>
										<RecordsUpload />
										{ data }

										{
											(this.state.loading) ? <div className="col-xs-12">
																		<Loader color="#3F3E3C" size="20px" margin="4px"/>
																	</div> : null
										}

										{ (uploads.data.length == 0) ? nofile : null }
									</Masonry>
								</div>
							</div>
						</div>


					<Footer />
				</div>
	}
}

Layout = connect((store) => {
	return {
    	uploads: store.uploads,
  	}
})(Layout)

export default Layout;