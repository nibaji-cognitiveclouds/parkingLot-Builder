/** @format */

import React, { FC, useEffect, useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Snackbar } from "react-native-paper";

const Lots: FC<any> = (props) => {
	const [lotsList, setLotsList] = useState<
		{
			id: number;
			reg: string;
			free: boolean;
			start: Date;
		}[]
	>([]);
	const [currentLot, setCurrentLot] = useState<number>(0);
	const [freeLotsList, setFreeLotsList] = useState<
		{
			id: number;
			reg: string;
			free: boolean;
			start: Date;
		}[]
	>(lotsList);
	const [reg, setReg] = useState<string>("");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
	const [showSnack, setShowSnack] = useState<boolean>(false);

	const [hrs, setHrs] = useState<number>(0);
	const [amnt, setAmnt] = useState<number>(0);

	useEffect(() => {
		drawLots();
	}, []);

	useEffect(() => {
		setFreeLotsList(lotsList.filter((lot) => lot.free));
	}, [lotsList]);

	function drawLots() {
		let lotsArray = [];
		for (let i = 0; i < props.route.params.lots; i++) {
			lotsArray.push({
				id: i,
				reg: "",
				free: true,
				start: new Date(0, 0, 0),
			});
		}
		setLotsList(lotsArray);
	}

	function getRandom() {
		const randomNum = Math.floor(Math.random() * freeLotsList.length);
		setCurrentLot(freeLotsList[randomNum].id);
	}

	function handleAdd(random: boolean) {
		if (freeLotsList.length > 0) {
			if (random) {
				getRandom();
			}
			if (currentLot >= 0) {
				setShowAddModal(true);
			}
		} else {
			setShowSnack(true);
			setTimeout(() => {
				setShowSnack(false);
			}, 2000);
		}
	}

	function handleRemove() {
		!lotsList[currentLot].free && setShowRemoveModal(true);
	}

	function calculateHrsAmt() {
		const timeDiffms = Math.abs(
			lotsList[currentLot].start.getTime() - new Date().getTime()
		);
		const timeDiffHrs = Math.floor(timeDiffms / (1000 * 60 * 60));
		setHrs(timeDiffHrs);

		if (timeDiffHrs <= 2) {
			setAmnt(10);
		} else {
			setAmnt(10 + (timeDiffHrs - 2) * 10);
		}
	}

	return (
		<SafeAreaView testID="lots">
			{/* Add Modal */}
			<Modal visible={showAddModal}>
				<View>
					<Text>Add Vehicle to P{currentLot}</Text>
					<TextInput
						placeholder="Enterv reg. number"
						placeholderTextColor={"grey"}
						onChangeText={(text) => {
							setReg(text);
						}}
					/>

					<View style={{ flexDirection: "row" }}>
						<Button
							title="Add"
							onPress={() => {
								if (reg.length) {
									setLotsList(
										lotsList.map((lot) => {
											return lot.id == currentLot
												? {
														...lot,
														free: false,
														reg: reg,
														start: new Date(),
												  }
												: lot;
										})
									);
									setShowAddModal(false);
								}
							}}
						/>
						<Button
							title="Cancel"
							onPress={() => {
								setShowAddModal(false);
							}}
						/>
					</View>
				</View>
			</Modal>
			{/* Remove Modal */}
			<Modal
				visible={showRemoveModal}
				onShow={() => {
					calculateHrsAmt();
				}}
			>
				<View>
					<Text>Pay and Remove Vehicle from P{currentLot}</Text>
					<Text>Total hours: {hrs}</Text>
					<Text>Total Amount:{amnt}</Text>

					<View style={{ flexDirection: "row" }}>
						<Button
							title="Remove"
							onPress={() => {
								setLotsList(
									lotsList.map((lot) => {
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
								setAmnt(0);
								setHrs(0);
								setShowRemoveModal(false);
							}}
						/>
						<Button
							title="Cancel"
							onPress={() => {
								setAmnt(0);
								setHrs(0);
								setShowRemoveModal(false);
							}}
						/>
					</View>
				</View>
			</Modal>

			<Snackbar visible={showSnack} onDismiss={() => setShowSnack(false)}>
				<View>
					<Text>the parking is full</Text>
				</View>
			</Snackbar>

			<TouchableOpacity onPress={() => handleAdd(true)}>
				<FlatList
					data={lotsList}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={{ flexDirection: "row" }}
							onPress={() => {
								setCurrentLot(item.id);
								item.free ? handleAdd(false) : handleRemove();
							}}
						>
							<Text>P{item.id}</Text>
							<Text>{item.free ? "Free" : `Occupied by ${item.reg}`}</Text>
						</TouchableOpacity>
					)}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Lots;
