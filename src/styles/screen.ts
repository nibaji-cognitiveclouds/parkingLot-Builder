/** @format */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	screen: {
		margin: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	snackBar: {
		backgroundColor: "blue",
		zIndex: 10,
		position: "absolute",
		bottom: 0,
	},
	modal: {
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	textInput: {
		width: "80%",
		padding: 10,
		borderColor: "grey",
		borderWidth: 1,
		borderRadius: 5,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	lot: {
		flexDirection: "row",
		padding: 20,
		margin: 20,
		justifyContent: "space-between",
		width: "90%",
		borderRadius: 10,
	},
});
