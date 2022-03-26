/** @format */

import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";
import { style } from "../styles/screens";

const Home: FC = () => {
	const [lots, setLots] = useState<number>(0);

	const navigation = useNavigation();

	return (
		<SafeAreaView testID="home" style={style.container}>
			<TextInput
				placeholder="Enter number of Parking Lots"
				placeholderTextColor={"grey"}
				keyboardType="numeric"
				onChangeText={(text) => setLots(Number(text))}
				style={style.input}
			/>
			<Button
				title="Submit"
				onPress={() => {
					navigation.navigate("Lots", { lots: lots });
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;
