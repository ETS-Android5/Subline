import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';
import { BackButton } from '../Elements/buttons'

const APIManager = new APIHandler();



class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: { places: null },
            search: '',
            savedParams: this.props.navigation.getParam('savedParams', { destination: null, departure: null })
        };
        this.placeholder = this.props.navigation.getParam('placeholder', 'Votre destination');
        this.typename = this.props.navigation.getParam('type');
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var departure = {
                    id: position.coords.longitude + ";" + position.coords.latitude,
                    name: "Ma position"
                }
                this.setState({ departure: departure });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    async AutoCompleteResearch() {
        var data = { stop_areas: null, address: null }
        if (this.typename != "line") {
            try {
                data.stop_areas = await APIManager.getPlaces(this.state.search, 'stop_area')
                data.address = await APIManager.getPlaces(this.state.search, 'address')
            }
            catch (e) {
                console.error(e);
            }

        } else {
            try {
                data = await APIManager.getLines(this.state.search)
            }
            catch (e) {
                console.error(e);
            }
        }
        if (!(typeof data.stop_areas === "undefined" && typeof data.address === "undefined")) {
            this.setState({ locations: data })
        }

    }

    async sendFirstInputData(id, name) {
        try {
            params = {
                departure: {
                    id: this.state.departure.id,
                    name: this.state.departure.name,
                },
                destination: {
                    id: id,
                    name: name,
                },
            };
            this.props.navigation.navigate('DisplayJourneysPage', {
                departure: this.state.departure,
                destination: params.destination,
                savedParams: params
            });
        }
        catch (e) {
            console.error(e);
        }


    }

    sendDepartureData(id, name) {
        params = {
            destination: this.state.savedParams.destination,
            departure: {
                id: id,
                name: name,
            }
        };
        this.redirectWithPreviousParams(params);
    }

    sendDestinationData(id, name) {
        params = {
            destination: {
                id: id,
                name: name,
            },
            departure: this.state.savedParams.departure,
        };
        this.redirectWithPreviousParams(params);
    }

    redirectWithPreviousParams(params) {
        this.props.navigation.replace('DisplayJourneysPage', {
            destination: params.destination,
            departure: params.departure,
            savedParams: params,
        });
    }

    async sendLineData(item) {
        params = {
            line: {
                id: item.id,
                name: item.name,
                bgColor: '#' + item.bgColor,
                color: '#' + item.color,
                stopList: await APIManager.getStopAreas(item.id)
            },
        };
        console.log('aha')
        console.log(JSON.stringify(params, null, 4))
        this.redirectToListOfStopWithPreviousParams(params);
    }

    redirectToListOfStopWithPreviousParams(params) {
        this.props.navigation.replace('ListOfStopPage', {
            line: params.line,
        });
    }

    async selectPlace(item) {
        if (this.typename == "firstInput") {
            this.sendFirstInputData(item.id, item.name);
        }
        else if (this.typename == "departure") {
            this.sendDepartureData(item.id, item.name);
        }
        else if (this.typename == "destination") {
            this.sendDestinationData(item.id, item.name);
        }
        else if (this.typename == "line") {
            this.sendLineData(item);
        }
    }

    changeView(page, parameters) {
        // setTimeout(function () {
        this.props.navigation.navigate(page, parameters)
        // }.bind(this), 100)
    }

    render() {
        // console.log(this.state.locations)
        return (
            <View style={[styles.container]}>
                <ScrollView keyboardShouldPersistTaps='always' horizontal={false} contentContainerStyle={{ flexGrow: 1 }} style={{ width: screenWidth }}>
                    <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#000', width: 500, }}>
                        <BackButton navigation={this.props.navigation} />
                    </View>
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -25 }}>
                            <View style={styles.searchBar}>
                                {this.state.search.length === 0 ?
                                    <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                    :
                                    <TouchableNativeFeedback onPress={() => this.setState({ search: '' })}>
                                        <Image source={require('../../assets/icons/close.png')} style={styles.ImageStyle} />
                                    </TouchableNativeFeedback>
                                }
                                <TextInput value={this.state.search} onChangeText={(input) => this.setState({ search: input }, () => this.AutoCompleteResearch())} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder={this.placeholder} autoFocus />
                            </View>
                        </View>
                        {(this.state.locations.places !== null && this.state.search !== '') ?
                            <View>
                                <Text style={styles.title}>Arrêts / Gares</Text>
                                <View style={styles.resultCardBox}>
                                    <View style={[styles.card, styles.resultCard]}>
                                        <FlatList style={{ flex: 1, flexDirection: 'column' }} data={this.state.locations.stop_areas.places} keyboardShouldPersistTaps={'handled'} ItemSeparatorComponent={() => <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, }} />} renderItem={({ item }) =>
                                            <TouchableNativeFeedback onPress={() => this.selectPlace(item)}>
                                                <View style={styles.resultItem}>
                                                    <Text style={styles.resultItemText}>{item.name} </Text>
                                                </View>
                                            </TouchableNativeFeedback>}
                                            keyExtractor={(item, index) => index.toString()} />
                                    </View>
                                </View>
                                <Text style={styles.title}>Adresses</Text>
                                <View style={styles.resultCardBox}>
                                    <View style={[styles.card, styles.resultCard]}>
                                        <FlatList style={{ flex: 1, flexDirection: 'column' }} data={this.state.locations.address.places} keyboardShouldPersistTaps={'handled'} ItemSeparatorComponent={() => <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, }} />} renderItem={({ item }) =>
                                            <TouchableNativeFeedback onPress={() => this.selectPlace(item)}>
                                                <View style={styles.resultItem}>
                                                    <Text style={styles.resultItemText}>{item.name} </Text>
                                                </View>
                                            </TouchableNativeFeedback>}
                                            keyExtractor={(item, index) => index.toString()} />
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                {/* <Text style={{ margin: 10, color: "#898989", fontSize: 60, fontWeight:"bold" }}>:(</Text> */}
                                <Text style={{ margin: 10, color: "#A9A9A9", fontSize: 30, marginTop: 50 }}>Aucun résultat :(</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default SearchPage;