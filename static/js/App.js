import React from "react";
import { Button } from 'reactstrap';
import axios from "axios";
import $ from 'jquery';
import '../css/App.css';

class App extends React.Component {

	constructor(props) {

		super(props);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			image_url: '../dist/images/init.png',
			submitBtn_status: false,
			downloadBtn_status: false
		}
	}

	handleDownload() {

		const link = document.createElement('a');
		let href_str = this.state.image_url.split('/');
		let filename = href_str[href_str.length - 1];
		link.href = this.state.image_url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	async handleSubmit() {

		let head_url = $('#head_url').val();
		let body_url = $('#body_url').val();

		const { data } = await axios('http://localhost:5000/image', {
			method: 'POST',
			data: {
				head_url: head_url,
				body_url: body_url
			}
		});

		this.setState({
			image_url: '../dist/images/' + data,
			downloadBtn_status: true
		})
		console.log("response: ", data)
	}

	async handleChangeHeadURL() {

		let head_url = $('#head_url').val();
		let body_url = $('#body_url').val();

		if (head_url && body_url) {

			this.setState({
				submitBtn_status: true
			})
		} else {

			this.setState({
				submitBtn_status: false
			})
		}

	}

	async handleChangeBodyURL() {

		let head_url = $('#head_url').val();
		let body_url = $('#body_url').val();

		if (head_url && body_url) {

			this.setState({
				submitBtn_status: true
			})
		} else {

			this.setState({
				submitBtn_status: false
			})
		}
	}

	render() {

		return (
			<React.Fragment>
				<div className="app-container container">
					<h4>Welcome to React + Python APP!</h4>
					<div className="input-url">
						<label htmlFor="head_url">Head URL</label>
						<input type="text" className="form-control" name="head_url" id="head_url" required onChange={this.handleChangeHeadURL.bind(this)} />
						<label htmlFor="body_url">Body URL</label>
						<input type="text" className="form-control" name="body_url" id="body_url" required onChange={this.handleChangeBodyURL.bind(this)} />
					</div>
					<div className="image-container">
						<img src={this.state.image_url} alt="combined" width="450" />
					</div>
					<div className="btn-container">
						<Button onClick={this.handleSubmit} color="info" disabled={this.state.submitBtn_status ? false : true} >
							Submit
        				</Button>
						<Button onClick={this.handleDownload} color="primary" disabled={this.state.downloadBtn_status ? false : true}>
							Download
        				</Button>
					</div>
				</div>
			</React.Fragment >
		)
	}
}

export default App