import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 7,
    },
    header: {
        flex: 2,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 230,
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        margin: 10,
        color: "#898989",
        textAlign:'left',
        marginBottom: 10,
    },
    body: {
        flex: 3,
    },
    stopCardBox: {
        flex:1,
        height:160,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth-(screenWidth/13)
    },
    stopCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:130,
        flex:0.95,
        flexDirection:'row'
    },
    stopCardLine: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#e5e5e5',
        borderRightWidth: 1,
    },
    stopCardPlace: {
        flex: 2,
    },
    stopCardPlaceText: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    stopCardPlaceNextPassageLabel: {
        fontSize: 12,
        marginLeft: 10,
    },
    stopCardPlaceNextPassage: {
        flexDirection:'row',
    },
    stopCardLineDirection: {
        fontSize: 10,
    },    
    stopCardLineNumber: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    stopCardLineIcon: {
        width:30,
        height:30,
        marginBottom:5,
    },
    stopCardPlaceNextPassageTextHighLight: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    stopCardPlaceNextPassageText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#8A8A8A'
    },
    stopJourneyCard: {
        flex:1,
        height:170,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth-(screenWidth/13)
    },
    journeyCard: {
        flexDirection:'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        height:140,
        flex:0.95,
    },
    journeyCardTop: {
        flex: 3,
        marginLeft: 20,
        marginRight: 20,
        // marginBottom: 20,
        marginTop: 20,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    journeyCardBottom: {
        flex: 2,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    journeyCardTopRow: {
        flexDirection:'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    journeyCardTopRowImg: {
        height: 20,
        width: 20,
    },
    journeyCardTopRowTxt: {
        marginLeft: 10,
        fontSize: 15,
    },
    journeyCardBottomImg: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    journeyCardBottomImgDot: {
        width: 3,
        height: 3,
        marginRight: 5,
    },
    busCard: {
        flexDirection: 'row',
        borderRadius: 2,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        marginRight: 5,
    },
    busCardImgBus: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    busCardTxt: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    mapCardBox: {
        flex:1,
        height:75,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth
    },
    mapCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 5,
        flex:0.9,
        flexDirection:'row'
    },
    home: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    input: {
      color: "#666666",
      fontWeight: 'bold',
      fontSize: 18,
      padding: 10,
      flex:0.8,
    },
    ImageStyle: {
      margin: 10,
      paddingLeft: 5,
      resizeMode : 'contain',
      alignItems: 'center',
      maxHeight:20,
      flex:0.1,
    },
    searchBar: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
      //android
      elevation: 7,
      flex:0.9,
      flexDirection:'row'
    },
  });