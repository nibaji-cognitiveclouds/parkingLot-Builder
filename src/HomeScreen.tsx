import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View, Modal, SafeAreaView, Alert } from 'react-native'

const HomeScreen: React.FC = () => {
    const [numberOfParkingLots, setNumberOfParkingLots] = React.useState<number>(0)
    const [currentLot, setCurrentLot] = React.useState<number | null>(null)
    const [carReg, setCarReg] = React.useState<null | string>(null)
    const [addModalVisible, setAddModalVisible] = React.useState<boolean>(false)
    const [removeModalVisible, setRemoveModalVisible] = React.useState<boolean>(false)
    const [totalHours, setTotalHours] = React.useState<number>(0)
    const [totalCost, setTotalCost] = React.useState<number>(0)

    const [parkingLot, setParkingLot] = React.useState<Array<{ id: number; free: boolean; car: null | string, start: Date }>>([])

    const getParkingLots = () => {
        let theParkingLot: { id: number; free: boolean; car: null | string, start: Date }[] = []
        for (let i = 0; i < numberOfParkingLots; i++) {
            theParkingLot.push(
                {
                    id: i,
                    free: true,
                    car: null,
                    start: new Date(0, 0, 0),
                }
            )
        }
        setParkingLot(theParkingLot)
    }

    const amount = (hrDiff: number) => {
        if (hrDiff <= 2) {
            return 10
        } else {
            return 10 + ((hrDiff - 2) * 10)
        }
    }

    React.useEffect(() => {
        getParkingLots()
        if (parkingLot.length > numberOfParkingLots) {
            setParkingLot(parkingLot.filter(item => {
                item.id < numberOfParkingLots
            }))
        }
    }, [numberOfParkingLots])

    return (
        <SafeAreaView>
            <ScrollView >
                {parkingLot.length > 0 ? <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 30,
                        flex: 1,
                    }}
                >

                    {/* Add car modal */}
                    <Modal
                        visible={addModalVisible}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => { setAddModalVisible(false) }}

                    >
                        <View
                            style={{
                                height: "20%",
                                top: "33%",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                elevation: 10,
                                padding: 20,
                                margin: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{ color: "red", top: "-30%" }} onPress={() => { setAddModalVisible(false); setCurrentLot(null) }}>X</Text>
                            <TextInput
                                placeholder='Car Reg number'
                                placeholderTextColor={"grey"}
                                onSubmitEditing={(event) => {
                                    if (currentLot !== null) {
                                        setParkingLot(parkingLot.map(item => { return item.id === currentLot ? { ...item, free: false, car: event.nativeEvent.text, start: new Date() } : item }))
                                        // parkingLot[currentLot].car = event.nativeEvent.text
                                        setAddModalVisible(false)
                                        // parkingLot[currentLot].free = false
                                    }
                                    setCarReg(event.nativeEvent.text)
                                }}
                                style={{
                                    borderColor: "black",
                                    borderWidth: .5,
                                    borderRadius: 5,
                                    width: "80%",
                                    padding: 10,
                                }}
                            />
                        </View>
                    </Modal>
                    {/* Remove car Modal */}
                    <Modal
                        visible={removeModalVisible}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => { setRemoveModalVisible(false) }}
                        onShow={() => {
                            if ((currentLot !== null) && parkingLot[currentLot].start !== new Date(0, 0, 0)) {
                                const currentDate = new Date()
                                const timeDiff = Math.abs(currentDate.getTime() - parkingLot[currentLot]?.start?.getTime())
                                const hrDiff = Math.ceil(timeDiff / (1000 * 60 * 60))
                                setTotalHours(hrDiff)
                                setTotalCost(amount(hrDiff))
                            }
                        }}

                    >
                        <View
                            style={{
                                height: "20%",
                                top: "33%",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                elevation: 10,
                                padding: 20,
                                margin: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text>Pay and Remove the car with reg.no <Text style={{ color: "brown" }}>{carReg}</Text> ?</Text>
                            <Text>Total Payable Hours : <Text style={{ color: "green" }}>{totalHours}</Text></Text>
                            <Text>Total payable amount : <Text style={{ color: "green" }}>$ {totalCost}</Text></Text>

                            <View
                                style={{
                                    flexDirection: "row-reverse",
                                    marginTop: 20,
                                    width: "30%",
                                    justifyContent: "space-around"
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "red",
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                    onPress={() => {
                                        if (currentLot !== null) {
                                            setParkingLot(parkingLot.map(item => { return item.id === currentLot ? { ...item, free: true, car: null, start: new Date(0, 0, 0) } : item }))
                                            setRemoveModalVisible(false)
                                        }
                                        setCarReg(null)
                                        Alert.alert("Payment Success", "You have successfully paid the amount", [
                                            {
                                                text: "OK",
                                                style: "default"
                                            }
                                        ])
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setRemoveModalVisible(false); setCurrentLot(null) }}
                                    style={{
                                        backgroundColor: "green",
                                        padding: 5,
                                        borderRadius: 5,
                                    }}>
                                    <Text style={{ color: "white" }} >No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {
                        parkingLot.map((lot, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { lot.free ? setAddModalVisible(true) : setRemoveModalVisible(true); setCurrentLot(lot.id) }}
                                    key={index}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: .5,
                                        borderRadius: 5,
                                        justifyContent: "space-between",
                                        width: "100%",
                                        padding: 10,
                                        margin: 10,
                                        backgroundColor: lot.free ? "green" : "red",
                                        flexDirection: "row",
                                    }}>
                                    <Text
                                        style={{
                                            color: "white"
                                        }}
                                    >
                                        P{lot.id}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "white"
                                        }}
                                    >
                                        {lot.free ? "Free" : `Occupied by ${lot.car}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                    : <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 30
                        }}
                    >
                        <TextInput
                            placeholder='Enter number of parking lots'
                            placeholderTextColor={'grey'}
                            keyboardType='numeric'
                            onSubmitEditing={(event) => { setNumberOfParkingLots(parseInt(event.nativeEvent.text)) }}
                            onEndEditing={(e) => setNumberOfParkingLots(parseInt(e.nativeEvent.text))}
                            style={{
                                borderColor: "black",
                                borderWidth: .5,
                                borderRadius: 5,
                                width: "80%",
                                padding: 10
                            }}
                        />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen