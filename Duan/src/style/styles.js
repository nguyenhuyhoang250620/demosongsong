import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: 'white',
        padding: 8,
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      main: {
        marginHorizontal: 16,
      },
      titleNotification: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
      },
      mainItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        marginVertical: 12,
      },
      inforItemLeft: {
        paddingRight: 16,
      },
      inforItemRight: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 16,
      },
    
      txtContentNotification: {
        fontSize: 17,
        fontWeight: '500',
      },
      txtcreateAtNotification: {
        fontSize: 14,
        fontWeight: '300',
        color: '#9A9A9A',
      },
      footer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
      },
})