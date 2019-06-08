import React from 'react';
import {
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Container,
	Button
} from 'reactstrap';

const NotesList = props => (
	<Container>
		<ListGroup>
			<ListGroupItem color="info">
				<ListGroupItemHeading>NOTES</ListGroupItemHeading>
			</ListGroupItem>
			{props.notes.map(note => {
				return (
					<ListGroupItem key={note._id}>
						<ListGroupItemHeading>{note.title}</ListGroupItemHeading>
						<ListGroupItemText>{note.text}</ListGroupItemText>
						<div style={{ float: 'right' }}>
							<Button onClick={() => props.editNote(note._id)}>Edit</Button>
							<Button
								style={{ marginLeft: '10px' }}
								color="danger"
								onClick={() => props.deleteNote(note._id)}
							>
								&times;
							</Button>
						</div>
					</ListGroupItem>
				);
			})}
		</ListGroup>
		<p />
	</Container>
);

export default NotesList;
