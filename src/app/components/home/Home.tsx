import { Component, h, JSX } from "preact";
import { Counter } from "../counter/Counter";

export interface HomeProps {
	idElement: string;
	param1: string;
	param2: string;
}

interface HomeState {
	title: string;
}

export const Home: Function<HomeProps, HomeState> = (props) => {
	console.log("HOME");
	return <div style={{ color: "red" }}>{props.title}</div>;
};

export const DefaultHome = (): JSX.Element => <Home title="Clinic Finder V1" />;
