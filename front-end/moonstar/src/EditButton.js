import React from 'react';
import { Link } from 'react-router-dom';

const EditButton = ({ tasks }) => (
	<Link to={`/edit-project/${tasks.id}`}>Edit</Link>
);

export default EditButton;
