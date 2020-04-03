import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image, 
	BackHandler,ToastAndroid,AsyncStorage
} from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';

import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
import Mypush from './src/userinfor/Mypush';

console.disableYellowBox = true;

const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	useEffect(()=>{
		AsyncStorage.getItem('isInstall')
        .then(res=>{
            if(res){
                setInstall(false);
            }
        })
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	},[])
	let afterInstall = ()=>{
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}

	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
						{/* <Scene key="root"> */}
							<Tabs 
								key='tabbar'
								hideNavBar
								activeTintColor="red"
								inactiveTintColor="blue"
								tabBarStyle={{backgroundColor:'#ccc'}}
							>
								{/* 首页 */}
								<Scene key='homepage'
								title='首页'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
											name="home"
										/>
									}
								>
									<Scene key='home' hideNavBar={true} component={Home}/>
								</Scene>
								{/* 消息栏 */}
								<Scene key='msg'
								title='分类'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
											name="file"
										/>
									}
								>
									<Scene key="goods" hideNavBar={true} component={Goods}/>
								</Scene>
								{/* 文档栏 */}
								<Scene key='doc'
								title='个人中心'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
											name='message'
										/>
									}
								>
									<Scene key="userinfor" hideNavBar component={Userinfor}/>
									<Scene key="mypush" hideNavBar component={Mypush}/>
								</Scene>
							</Tabs>
						{/* </Scene> */}
					</Drawer>
					{/* <Scene key='light' component={Mybox}/> */}
					
				</Lightbox>
				<Scene key='login' initial={!isLogin} component={Login} />
					<Scene key='register' component={Register} />
				{/* <Scene key="login" component={ShowMyName}/>
				<Scene key="login1" component={Login}/> */}
			</Modal>
			{/* <Scene component={Message}/> */}
			</Overlay>
		</Router>
	);
};

export default App;