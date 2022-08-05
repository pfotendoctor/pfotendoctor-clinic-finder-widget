import { h, JSX, render } from "preact";
import { DefaultHome } from "./components/home/Home";

window.MyWidget = function (idElement, param1, param2) {
	let config = { param1, param2 };
	console.log(idElement, param1, param2);
	render(<DefaultHome config={config} />, document.body);
	return this;
};
