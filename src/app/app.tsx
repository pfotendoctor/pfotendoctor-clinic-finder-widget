import { h, JSX, render } from "preact";
import { DefaultHome } from "./components/home/Home";

declare global {
	interface Window {
		ClinicFinder: any;
	}
}

window.ClinicFinder = function (idElement, param1, param2) {
	let config = { param1, param2 };
	console.log(idElement, param1, param2);
	render(<DefaultHome idElement={idElement} param1={param1} param2={param2}/>, document.body);
	return this;
};
