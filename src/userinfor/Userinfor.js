import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    AsyncStorage,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    BackHandler
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import ImageCropPicker from 'react-native-image-crop-picker';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WhiteSpace } from '@ant-design/react-native';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
const goods = [
    {
        title: '账户管理',
        img: require('../assets/设置.png'),
    },
    {
        title: '收货地址',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的信息',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的订单',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的二维码',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的积分',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的收藏',
        img: require('../assets/设置.png'),
    }
]
const goods1 = [
    {
        title: '居家维修保养',
        img: require('../assets/设置.png'),
    },
    {
        title: '出行接送',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的受赠人',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的住宿优惠',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的活动',
        img: require('../assets/设置.png'),
    },
    {
        title: '我的发布',
        img: require('../assets/设置.png'),
    }
]

export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:require('../assets/头像.png'),
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('source')
        .then(res=>{
            if(res!=null){
                this.setState({
                    imageUrl: {uri:res},
                });
            }else{
                this.setState({
                    imageUrl:require('../assets/头像.png')
                })
            }
        })
    }
    componentDidUpdate(){
        AsyncStorage.getItem('source')
        .then(res=>{
            if(res!=null){
                this.setState({
                    imageUrl: {uri:res},
                });
            }else{
                this.setState({
                    imageUrl:require('../assets/头像.png')
                })
            }
        })
    }
    takephoto=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {  
                const source = { uri: response.uri };
                AsyncStorage.setItem('source',source.uri)
                AsyncStorage.getItem('source')
                .then(res=>{
                    this.setState({
                        imageUrl: {uri:res},
                    });
                })
            }
        });
    }
    exit=()=>{
        AsyncStorage.removeItem('user')
        Actions.login();
    }
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.header}>
                    
                <Button onPress={()=>{this.takephoto()}}>
                <Image 
                    style={{width:200,height:200,borderColor:'black',borderWidth:1,borderRadius:100}} 
                    source={this.state.imageUrl}
                />
                </Button>

                <Text style={{color:'white',fontSize:30*s}}>
                    BINNU DHILLON
                </Text>
                </View>
                <View style={{height:110*s,borderBottomColor:'black',borderBottomWidth:1,backgroundColor:'white'}}>
                    <Image
                      source={require('../assets/人.png')}
                      style={{marginLeft:10*s}}>
                    </Image>
                    <Text style={{color:'black',marginTop:-70*s,marginLeft:100*s,fontSize:25*s}}>我的个人中心</Text>
                </View>
                <FlatList 
                    style={{backgroundColor: 'white'}}
                    data={goods}
                    numColumns={3}
                    
                    renderItem={({item})=>(
                        <Button onPress={()=>Actions.mypush()}>
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:80*s,width:100*s}}
                            />
                            <Text
                                style={{fontSize:20*s}}
                            >{item.title}</Text>
                        </View>
                        </Button>
                    )}
                />
                <View style={{top:20*s}}>
                <View style={{height:110*s,borderBottomColor:'black',borderBottomWidth:1,backgroundColor:'white'}}>
                    <Image
                      source={require('../assets/笔.png')}
                      style={{marginLeft:10*s}}>
                    </Image>
                    <Text style={{color:'black',marginTop:-70*s,marginLeft:100*s,fontSize:25*s}}>E族活动</Text>
                </View>
                <FlatList 
                    style={{backgroundColor: 'white'}}
                    data={goods1}
                    numColumns={3}
                    renderItem={({item})=>(
                        <Button onPress={()=>Actions.mypush()}>
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:80*s,width:100*s}}
                            />
                            <Text
                                style={{fontSize:20*s}}
                            >{item.title}</Text>
                        </View>
                        </Button>
                    )}
                />
                </View>
                <View style={{height:130*s,justifyContent: 'center',alignItems:'center'}}>
                    <Text onPress={()=>{this.exit()}} style={{color:'white',fontSize:25*s,}}>
                        BINNU DHILLON | 退出
                    </Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    fabu:{
        height: 60*s,
        width: 500*s,
        backgroundColor: 'red',
        marginLeft: 80*s,
        marginBottom: 20*s,
    },
    header:{
        height: 500*s,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        backgroundColor: '#f23030',
        alignItems:'center'
    },
    search:{
        width: 520*s,
        left: 20*s,
        height: 50*s,
        borderRadius: 25,
        backgroundColor:'#fbb8b8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nav:{
        height: 73*s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    good:{
        width: 185*s,
        height: 120*s,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 12*s,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems:'center'
    }
})
// npm run android 或者 react-native run-android,在模拟器或者真机上装的
// 是测试版本的安装包，不要每天装一次，以后只需要执行 npm start起服务即可，
// 然后点开 App，服务界面就会编译文件

// adb reverse tcp:8081 tcp:8081

// 执行 ./gradlew，打包出一个签名好的可用于发布的版本的安装包，不用调试
// 手机调试：
// 1、打开开发者选项（选一种方式连接手机）
// 2、测试： adb devices
// 3、react-native run-android
// 拔掉数据后，再接入的时候，不用再装，还是执行npm start，
// adb reverse tcp:8081 tcp:8081
// 点卡 App 即可
