import React, { useState } from "react";
import { Oficina } from "./Oficina.js";
import { SearchBar } from "./SearchBar.js";
import { useFetch } from "../fetch.js";

import "./App.scss";
import logo from "../assets/logo.png";

function App() {
	// El servidor de Heroku esta definido en packages.json
	// en el campo proxy.
	const officesRequest = useFetch([], "/desafio-frontend");
	const [filter, setFilter] = useState("");
	const offices = officesRequest.data
		// Transforma el JSON para obtener los datos
		// relevantes y suma los tiempos de espera y personas.
		.map(o => ({
			...o,
			data: Object.keys(o.lines)
				.map(k => o.lines[k])
				.reduce(suma, { waiting: 0, elapsed: 0, n: 0 })
		}))
		// Excluye objetos cuyos nombres no coincidan con el campo
		// de búsqueda.
		.filter(
			o =>
				filter === "" ||
				new RegExp(tilde(filter), "i").test(tilde(o.name))
		)
		.map((office, key) => (
			<Oficina
				key={key}
				name={office.name}
				waiting={office.data.waiting}
				elapsed={office.data.elapsed / office.data.n}
				isOnline={office.online}
			/>
		));

	return (
		<div className="App">
			<header className="zq__header">
				<img
					alt="logo de la empresa"
					className="zq__header__logo"
					src={logo}
				/>
			</header>
			<SearchBar filter={setFilter} />
			<div className="zq__wrapper">
				{offices.length === 0 &&
					officesRequest.isOngoing && <p>Cargando...</p>}
				{offices.length === 0 &&
					!officesRequest.isOngoing && (
						<p>No hay resultados.</p>
					)}
				{offices}
			</div>
		</div>
	);
}

// Quita los tildes en vocales para
// facilitar la búsqueda.
const tilde = string =>
	[
		[/úü/i, "u"],
		[/á/i, "a"],
		[/é/i, "e"],
		[/í/i, "i"],
		[/ó/i, "o"]
	].reduce((str, arr) => str.replace(arr[0], arr[1]), string);

const suma = (acc, line) => ({
	waiting: acc.waiting + line.waiting,
	elapsed: acc.elapsed + line.elapsed,
	n: acc.n + 1
});

export default App;
