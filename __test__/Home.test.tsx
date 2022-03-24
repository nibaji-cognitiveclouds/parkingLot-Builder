/** @format */
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import Home from "../src/screen/Home";

describe("<App />", () => {
	it("matches snapshot", () => {
		const tree = renderer.create(<Home />).toJSON();
		//@ts-ignore
		expect(tree).toMatchSnapshot();
	});

	it("has 1 child", () => {
		const tree = render(<Home />).toJSON();
		//@ts-ignore
		expect(tree.children.length).toBe(1);
	});

	it("has required input component", () => {
		const tree = render(<Home />);
		//@ts-ignore
		expect(tree.findByTestId("parkingLotsTotal")).toBeTruthy();
	});
});
