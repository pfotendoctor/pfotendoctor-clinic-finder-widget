import { h, JSX, render } from "preact";
import { DefaultHome } from "./components/home/Home";
import { Nested } from "./components/nested/Nested";
import { Page } from "./components/page/Page";
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

			render(<DefaultHome />, appRoot.shadowRoot);
		},
	},
};

export function router(location: Location): JSX.Element {
	const path = location.pathname.replace(/\/$/, "");

	const route: { content: () => JSX.Element } = routes[path];

	return route ? route.content() : <NotFound />;
}
