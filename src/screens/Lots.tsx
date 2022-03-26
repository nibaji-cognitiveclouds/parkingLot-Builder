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
import { style } from "../styles/screens";
import { lotDetailsType } from "../types/components";
import { lotsPropsType } from "../types/screens";

const Lots: FC<lotsPropsType> = (props) => {
	const [lotsList, setLotsList] = useState<lotDetailsType[]>([]);
	const [currentLot, setCurrentLot] = useState<number>(0);
	const [freeLotsList, setFreeLotsList] = useState<lotDetailsType[]>(lotsList);
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
		setReg("");
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
		<SafeAreaView testID="lots" style={style.container2}>
			{/* Add Modal */}
			<Modal visible={showAddModal} animationType="slide">
				<View style={style.modal}>
					<Text>Add Vehicle to P{currentLot}</Text>
					<TextInput
						placeholder="Enterv reg. number"
						placeholderTextColor={"grey"}
						onChangeText={(text) => {
							setReg(text);
						}}
						style={style.input}
					/>

					<View style={style.buttonRow}>
						<Button
							disabled={reg.length == 0}
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
				animationType="slide"
			>
				<View style={style.modal}>
					<Text>Pay and Remove Vehicle from P{currentLot}</Text>
					<Text>Total hours: {hrs}</Text>
					<Text>Total Amount:{amnt}</Text>

					<View style={style.buttonRow}>
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

			<Snackbar
				visible={showSnack}
				onDismiss={() => setShowSnack(false)}
				style={style.snack}
			>
				<Text style={style.snackText}>the parking is full</Text>
			</Snackbar>

			<TouchableOpacity
				onPress={() => handleAdd(true)}
				style={style.parkingArea}
			>
				<FlatList
					data={lotsList}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								setCurrentLot(item.id);
								item.free ? handleAdd(false) : handleRemove();
							}}
						>
							<View
								style={{
									...style.item,
									backgroundColor: item.free ? "green" : "red",
								}}
							>
								<Text style={style.itemText}>P{item.id}</Text>
								<Text style={style.itemText}>
									{item.free ? "Free" : `Occupied by ${item.reg}`}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Lots;
