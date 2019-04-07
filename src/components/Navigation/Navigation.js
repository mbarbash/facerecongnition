import React from 'react';

const styles = {
	display:'flex', 
	justifyContent:'flex-end'
}

const Navigation = () => {
	return (
		<nav style={styles}>
			<p className="f3 link dim black underline pa3 pointer">Sign Out</p>
		</nav>
	);

}

export default Navigation;