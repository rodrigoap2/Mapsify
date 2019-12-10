import { createStackNavigator } from 'react-navigation';

import TelaLogin from './telaLogin'
import TelaCadastro from './telaCadastro'
import TelaMapas from './telaMapas'

export default createStackNavigator({
	TelaLogin,
	TelaCadastro,
	TelaMapas
},{
	navigationOptions: {
		headerStyle: {
			backgroundColor: "#212121"
		},
		headerTintColor: "#ffffff",
		headerTitleStyle: {
	        textAlign: 'center',
	        flexGrow:1,
	        alignSelf:'center'
        },
	}
})