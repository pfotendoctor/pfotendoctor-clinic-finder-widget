import { h, JSX, render } from "preact";
import { DefaultHome } from "./components/home/Home";

window.ClinFinder = function (idElement, param1, param2) {
	let config = { idElement, param1, param2 };
	render(<DefaultHome idElement={idElement} param1={param1} param2={param2} />, document.body);
	return this;
};
