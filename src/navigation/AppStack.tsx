/** @format */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

import Home from "../screens/Home";
import Lots from "../screens/Lots";

const AppStack: FC = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Lots" component={Lots} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
