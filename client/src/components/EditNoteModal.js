import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Input
} from 'reactstrap';

class EditNoteModal extends Component {
	state = {
		title: 'title',
		text: 'text'
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidUpdate(prevState) {
		if (
			this.props.noteToEdit &&
			this.props.noteToEdit !== prevState.noteToEdit
		) {
			this.setState({
				title: this.props.noteToEdit.title,
				text: this.props.noteToEdit.text
			});
		}
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.props.modal} onClick={this.toggle}>
					<ModalHeader>Edit Note</ModalHeader>
					<ModalBody>
						<Label for="title">Title</Label>
						<Input
							value={this.state.title || ''}
							name="title"
							type="text"
							onChange={this.onChange}
						/>
						<Label for="text">Text</Label>
						<Input
							value={this.state.text || ''}
							name="text"
							type="text"
							onChange={this.onChange}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={() =>
								this.props.updateNote(this.state.title, this.state.text)
							}
							color="info"
						>
							Save
						</Button>
						<Button onClick={this.props.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default EditNoteModal;
