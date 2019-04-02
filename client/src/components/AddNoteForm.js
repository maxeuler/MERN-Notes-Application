import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddNoteForm extends Component {
	state = {
		title: '',
		text: ''
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Form className="form">
				<FormGroup>
					<Label for="title">Title</Label>
					<Input
						type="text"
						name="title"
						value={this.state.title}
						onChange={this.onChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="text">Text</Label>
					<Input
						type="textarea"
						name="text"
						value={this.state.text}
						onChange={this.onChange}
					/>
				</FormGroup>
				<Button
					disabled={this.state.title.length === 0}
					onClick={() => this.props.addNote(this.state.title, this.state.text)}
				>
					Add
				</Button>
			</Form>
		);
	}
}

export default AddNoteForm;
