import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    historyTitleFrame: {
        backgroundColor: '#eee',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        maxHeight: 100,
        padding: 15,
        justifyContent: 'center',
        width : width-50,
      },
      row:{
        display: 'flex',
        flexDirection: 'row',
      },
      historyTitle: {
        color: 'black',
        textAlign: 'center',
        fontFamily : bold,
        fontSize : 15,
      },
      header:{
        justifyContent : 'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        
        paddingHorizontal: 20
      },
      historyList: {
        backgroundColor: '#fff',
        //flex: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        justifyContent: 'center',
        textAlign : 'center'
      },
      historyText: {
        fontFamily : plane,
      },
      frameButton: {
        backgroundColor: '#ddd',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1,
        justifyContent: 'center',
      },
      histFrame : {
        flex:1,
        width : width
      },
      innerContainer : {
        display: 'flex',
        justifyContent : 'center'
         
      },
      inner : {
        width: width/5,
        textAlign: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
      }
  
  })

  export default styles;