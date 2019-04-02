import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import AddNoteForm from './components/AddNoteForm';
import NotesList from './components/NotesList';
import EditNoteModal from './components/EditNoteModal';

class App extends Component {
	state = {
		notes: [],
		modal: false,
		noteToEdit: {},
		showForm: false
	};

	constructor(props) {
		super(props);
		this.addNote = this.addNote.bind(this);
		this.toggle = this.toggle.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.toggleShowForm = this.toggleShowForm.bind(this);
	}

	componentDidMount() {
		axios
			.get('/api/notes')
			.then(res => this.setState({ notes: [...this.state.notes, ...res.data] }))
			.catch(err => console.log(err));
	}

	addNote = (title, text) => {
		if (title.length === 0) return;
		axios
			.post('/api/notes', { title, text })
			.then(
				res =>
					console.log(res.data) ||
					this.setState({
						notes: [res.data, ...this.state.notes],
						showForm: false
					})
			)
			.catch(err => console.log('Heeey' + err));
	};

	deleteNote = id => {
		axios
			.delete(`/api/notes/${id}`)
			.then(res =>
				this.setState({
					notes: [...this.state.notes.filter(note => note._id !== id)]
				})
			)
			.catch(err => console.log(err));
	};

	toggle = id => {
		const note = this.state.notes.find(note => note._id === id);

		this.setState({ modal: !this.state.modal, noteToEdit: note ? note : {} });
	};

	updateNote = (title, text) => {
		axios
			.post(`/api/notes/${this.state.noteToEdit._id}`, { title, text })
			.then(res =>
				this.setState({
					notes: this.state.notes.map(note => {
						if (note._id === this.state.noteToEdit._id) note = { ...res.data };
						return note;
					}),
					noteToEdit: {},
					modal: !this.state.modal
				})
			);
	};

	toggleShowForm = () => this.setState({ showForm: !this.state.showForm });

	render() {
		let form = this.state.showForm ? (
			<AddNoteForm addNote={this.addNote} />
		) : (
			''
		);

		return (
			<div className="App">
				<Header />
				<Container>
					<Button
						onClick={this.toggleShowForm}
						style={{ margin: '20px 0' }}
						color="info"
					>
						New Note
					</Button>
					{form}
					<EditNoteModal
						modal={this.state.modal}
						toggle={this.toggle}
						noteToEdit={this.state.noteToEdit}
						updateNote={this.updateNote}
					/>
				</Container>
				<NotesList
					notes={this.state.notes}
					deleteNote={this.deleteNote}
					editNote={this.toggle}
				/>
			</div>
		);
	}
}

export default App;
