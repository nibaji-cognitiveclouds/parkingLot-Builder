/** @format */

import React from "react";
import {
	Button,
	FlatList,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	Modal,
	SafeAreaView,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { styles } from "../styles/screen";

const Home: React.FC = () => {
	const [totalLots, setTotalLots] = React.useState<number>(0);
	const [text, setText] = React.useState<number>(0);

	const [lotsDetails, setLotsDetails] = React.useState<
		{
			id: number;
			free: boolean;
			reg: string;
			start: Date;
		}[]
	>([]);
	const [currentLot, setCurrentLot] = React.useState<number>(0);
	const [freeLots, setFreeLots] = React.useState(lotsDetails);

	const [addModal, setAddModal] = React.useState<boolean>(false);
	const [removeModal, setRemoveModal] = React.useState<boolean>(false);
	const [showSnackBar, setShowSnackBar] = React.useState<boolean>(false);
	const [reg, setReg] = React.useState<string>("");

	const [amount, setAmount] = React.useState<number>(0);
	const [hrs, setHrs] = React.useState<number>(0);

	React.useEffect(() => {
		setTheLotsDetails();
	}, [totalLots]);

	React.useEffect(() => {
		setFreeLots(
			lotsDetails.filter((lot) => {
				return lot.free;
			})
		);
	}, [lotsDetails]);

	function setTheLotsDetails() {
		const lotsarray = [];
		for (let i = 0; i < totalLots; i++) {
			lotsarray.push({
				id: i,
				free: true,
				reg: "",
				start: new Date(0, 0, 0),
			});
		}
		setLotsDetails(lotsarray);
	}

	function handleAdd(random?: boolean) {
		if (random) {
			if (freeLots.length) {
				const randomNumber = Math.floor(Math.random() * freeLots.length);
				freeLots[randomNumber].free && setCurrentLot(freeLots[randomNumber].id);
				currentLot != undefined && setAddModal(true);
			} else setShowSnackBar(true);
		} else {
			currentLot != undefined && setAddModal(true);
		}
	}

	function handleRemove() {
		currentLot != undefined && setRemoveModal(true);
	}

	function calculatehrsAndAmt(timeIn: Date) {
		const totalHrs = Math.abs(
			(timeIn.getTime() - new Date().getTime()) / (1000 * 60 * 60)
		);
		setHrs(totalHrs);
		if (Math.floor(totalHrs) <= 2) {
			setAmount(10);
		} else {
			setAmount(10 + Math.floor(totalHrs - 2) * 10);
		}
	}

	return (
		<SafeAreaView>
			<View style={styles.screen}>
				<Snackbar
					visible={showSnackBar}
					onDismiss={() => setShowSnackBar(false)}
					action={{
						label: "Ok",
						onPress: () => {
							setShowSnackBar(false);
						},
					}}
					style={styles.snackBar}
				>
					<View>
						<Text>No lot is free</Text>
					</View>
				</Snackbar>
				{/* Add Modal */}
				<Modal visible={addModal} animationType={"slide"}>
					<View style={styles.modal}>
						<Text>Add a Vehicle</Text>
						<TextInput
							placeholder="Enter a Reg. Id"
							placeholderTextColor={"black"}
							onChangeText={(text) => {
								setReg(text);
							}}
							style={styles.textInput}
						/>
						<View style={styles.buttonRow}>
							<Button
								title="Cancel"
								onPress={() => {
									freeLots.length && setCurrentLot(freeLots[0].id);
									setAddModal(false);
								}}
							/>
							<Button
								title="Add"
								onPress={() => {
									setLotsDetails(
										lotsDetails.map((lot) => {
											return lot.id == currentLot
												? { ...lot, free: false, reg: reg, start: new Date() }
												: lot;
										})
									);
									freeLots.length && setCurrentLot(freeLots[0].id);
									setAddModal(false);
								}}
							/>
						</View>
					</View>
				</Modal>

				{/* Remove Modal */}
				<Modal
					visible={removeModal}
					onShow={() => {
						currentLot != undefined &&
							calculatehrsAndAmt(lotsDetails[currentLot].start);
					}}
					animationType={"slide"}
				>
					<View style={styles.modal}>
						<Text>Remove {reg}</Text>
						<Text>Total time : {hrs} hours</Text>
						<Text>Total amount : ${amount}</Text>
						<View style={styles.buttonRow}>
							<Button
								title="Cancel"
								onPress={() => {
									freeLots.length && setCurrentLot(freeLots[0].id);
									setRemoveModal(false);
								}}
							/>
							<Button
								title="Remove"
								onPress={() => {
									setLotsDetails(
										lotsDetails.map((lot) => {
											return lot.id == currentLot
												? {
														...lot,
														free: true,
														reg: "",
														start: new Date(0, 0, 0),
												  }
												: lot;
										})
									);
									freeLots.length && setCurrentLot(freeLots[0].id);
									setRemoveModal(false);
								}}
							/>
						</View>
					</View>
				</Modal>

				{totalLots == 0 ? (
					<View>
						<TextInput
							testID="parkingLotsTotal"
							placeholder="Enter number of Parking Lots"
							placeholderTextColor={"black"}
							keyboardType={"numeric"}
							onChangeText={(text) => {
								setText(Number(text));
							}}
							style={styles.textInput}
						/>
						<Button
							title="Submit"
							onPress={() => {
								text > 0 && setTotalLots(text);
							}}
						/>
					</View>
				) : (
					<TouchableOpacity
						onPress={() => {
							handleAdd(true);
						}}
					>
						<FlatList
							data={lotsDetails}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											// while (currentLot == undefined) {
											setCurrentLot(item.id);
											// }
											item.free ? handleAdd() : handleRemove();
										}}
										style={{
											...styles.lot,
											backgroundColor: item.free ? "green" : "red",
										}}
									>
										<Text style={{ color: "white" }}>
											{"PL" + Number(item.id + 1)}
										</Text>
										<Text style={{ color: "white" }}>
											{item.free ? "Free" : `Occupied by ${item.reg}`}
										</Text>
									</TouchableOpacity>
								);
							}}
						/>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Home;
