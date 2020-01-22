import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ filter }) => {
	const handleChange = ({ target: { value } }) => filter(value);
	return (
		<div className="zq__search-bar">
			<div className="zq__search-bar__input">
				<input
					type="text"
					onChange={handleChange}
					placeholder="Buscar sucursal"
				/>
			</div>
		</div>
	);
};

export { SearchBar };
