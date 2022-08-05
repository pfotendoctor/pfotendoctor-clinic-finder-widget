import { Component, h, JSX } from "preact";

export interface HomeProps {
	idElement: string;
	param1: string;
	param2: string;
}

export const Home = (props:HomeProps) => {
	console.log("HOME");
	return <div style={{ color: "red" }}>
		<div>{props.idElement}</div>
		<div>{props.param1}</div>
		<div>{props.param2}</div>
	</div>;
};

export const DefaultHome = (props:HomeProps): JSX.Element => <Home idElement={props.idElement} param1={props.param1} param2={props.param2} />;
