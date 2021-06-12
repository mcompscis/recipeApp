import React from 'react';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const HomePage = () => {

	const history = useHistory();

	return (
		// <button />
		<div>
			<Button variant="contained" onClick={() => history.push('/recipes')}>Get Recipes</Button>
		</div>
		// <Box />
	);
};

export default HomePage;