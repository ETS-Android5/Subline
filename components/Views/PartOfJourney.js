import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList, AsyncStorage, Easing } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';
import FileLoader from './FileLoader.js';
import BusIcon from '../Elements/BusIcon'

const IconLoader = new FileLoader();

class PartOfJourney extends React.Component {

    constructor() {
        super();
        this.state = {
            showOrHideDropDown: {
                display:'none'
            }
        }
    }

    loadIcon(section){
        let icon = IconLoader.getIconBySection(section);
        console.log("Icon Loaded");
        return icon;
    }

    getHoursFromISO(dateFromResponse){
        console.log("Start convert Date");
        var hours = dateFromResponse.split("T");
        var hoursTab = hours[1].split("");
        var formatHours = hoursTab[0]+hoursTab[1]+":"+hoursTab[2]+hoursTab[3];
        return formatHours;
    }

    convertSecondsToMinutes(seconds){
        var minutes = Math.floor(seconds / 60);
        return minutes;
    }

    toggleDisplayStopAreas() {
        var value = this.state.showOrHideDropDown.display == 'none' ? 'flex' : 'none'
        this.setState({
            showOrHideDropDown: {
                display:value,
            }
        });
        console.log(this.state.showOrHideDropDown.display) 

    }

    displayAllStops(){
        if(this.props.sectionData.stop_date_times){
            return(
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={()=>this.toggleDisplayStopAreas()} style={{ flexDirection: 'row', marginTop: 10, height:30, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#898989', fontSize: 14 }}>{this.props.sectionData.stop_date_times.length} arrêts</Text>
                        <Image style={{ width: 7, height: 7, marginLeft: 5 }} source={require('../../assets/icons/sort-down-grey.png')} />
                    </TouchableOpacity>
                    <View style={[this.state.showOrHideDropDown,{marginLeft: 10, marginRight: 10}]}>
                        <FlatList style={{flex:1}} listKey={(item, index) => index.toString()} data={this.props.sectionData.stop_date_times} renderItem={({item})=> 
                            {
                                return(
                                    <View style={{ marginTop: 2, paddingBottom: 2 }}>
                                        <Text style={{ fontSize: 14, color: "#898989" }}>{item.stop_point.name}</Text>
                                    </View>
                                )
                            }
                        }keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            )
        }
        else{
            return(
                <View>
                </View>
            )
        }
    }

    render() {

        if(this.props.sectionData.type == "waiting"){
            return(
                <View>
                    
                </View>
            )
        }
        else if(this.props.sectionData.type == "public_transport"){
            return(
                <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                        { (this.props.sectionData.display_informations !== undefined && (this.props.sectionData.display_informations.physical_mode === 'Bus' || this.props.sectionData.display_informations.commercial_mode === 'Bus')) ?
                            <BusIcon lineName={this.props.sectionData.display_informations.label} style={{ height: 25 }} /> 
                            :
                            <Image style={{ height: 25, width: 25 }} source={this.loadIcon(this.props.sectionData)} />
                        }
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.departure_date_time)}</Text>
                            <View style={{ flexDirection: 'column', flex: 3 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.from.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/arrow-direction.png')} />
                                    <Text style={{ fontSize: 12, color: "#898989", marginLeft: 5 }}>{this.props.sectionData.display_informations.direction}</Text>
                                </View>
                            </View>
                        </View>
                        {this.displayAllStops()}
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.arrival_date_time)}</Text>
                            <View style={{ flexDirection: 'column', flex: 3 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.to.name}</Text>
                            </View>
                        </View>
                    </View>
                )
        }
        else{
            return (
                <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ height: 25, width: 25 }} source={this.loadIcon(this.props.sectionData)} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.departure_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.from.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/arrow-direction.png')} />
                                <Text style={{ fontSize: 12, color: "#898989", marginLeft: 5 }}>{this.props.sectionData.to.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.arrival_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.to.name}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

}
export default PartOfJourney;