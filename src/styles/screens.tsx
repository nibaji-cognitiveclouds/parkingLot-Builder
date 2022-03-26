/** @format */

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	input: {
		padding: 5,
		borderColor: "grey",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
	},
	parkingArea: {
		padding: "10%",
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderRadius: 10,
		marginHorizontal: 10,
		marginVertical: 15,
		padding: 20,
	},
	itemText: {
		color: "white",
	},
	modal: {
		top: "30%",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
		alignItems: "center",
	},
	snack: {
		bottom: 5,
		backgroundColor: "red",
	},
});
