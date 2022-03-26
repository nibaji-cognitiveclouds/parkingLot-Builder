/** @format */

import { render } from "@testing-library/react-native";
import Home from "../src/screens/Home";

jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: jest.fn(),
	};
});

describe("Home", () => {
	it("renders without crash", () => {
		render(<Home />);
	});

	it("matches snapshot", () => {
		const tree = render(<Home />);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("has component with req TestId", () => {
		const tree = render(<Home />);
		expect(tree.findByTestId("home")).toBeTruthy();
	});

	it("has 2 children", () => {
		const tree = render(<Home />);
		//@ts-ignore
		expect(tree.toJSON().children.length).toBe(2);
	});
});
