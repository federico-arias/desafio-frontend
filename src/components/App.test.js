import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";
import { act } from "react-dom/test-utils";

const fakeResponse = [
	{
		name: "Servipag Líder Arica",
		online: true,
		lines: {
			a: { waiting: 10, elapsed: 100 },
			b: { waiting: 10, elapsed: 100 }
		}
	}
];

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("hace una petición HTTP", async () => {
	jest.spyOn(window, "fetch").mockImplementationOnce(() =>
		Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve(fakeResponse)
		})
	);
	await act(async () => {
		render(<App />, container);
	});
	expect(window.fetch.mock.calls.length > 0).toBe(true);
});

test("calcula promedios y sumas", async () => {
	jest.spyOn(window, "fetch").mockImplementationOnce(() =>
		Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve(fakeResponse)
		})
	);
	await act(async () => {
		render(<App />, container);
	});
	const avg = document.querySelector(".zq__card__footer__elapsed")
		.textContent;
	const sum = document.querySelector(".zq__card__footer__waiting")
		.textContent;
	expect(avg).toBe("01:40");
	expect(sum).toBe("20");
});

