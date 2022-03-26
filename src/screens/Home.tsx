/** @format */

import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";

const Home: FC = () => {
	const [lots, setLots] = useState<number>(0);

	const navigation = useNavigation();

	return (
		<SafeAreaView testID="home">
			<TextInput
				placeholder="Enter number of Parking Lots"
				placeholderTextColor={"grey"}
				keyboardType="numeric"
				onChangeText={(text) => setLots(Number(text))}
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
