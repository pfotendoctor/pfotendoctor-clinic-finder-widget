import { h, JSX, render } from "preact";
import { DefaultHome } from "./components/home/Home";
import { NotFound } from "./NotFound";

type TRoute = {
	content: () => JSX.Element;
};

const routes: { "": { content: (idElement, param1, param2) => void } } = {
	"": {
		content: (idElement, param1, param2) => {
			let config = { param1, param2 };
			const appRoot = document.querySelector("#app");
			appRoot.attachShadow({
				mode: "open",
			});

			render(<DefaultHome  idElement={idElement} param1={param1} param2={param2}/>, appRoot.shadowRoot);
		},
	},
};

export function router(location: Location): JSX.Element {
	const path = location.pathname.replace(/\/$/, "");

	const route: { content: () => JSX.Element } = routes[path];

	return route ? route.content() : <NotFound />;
}
