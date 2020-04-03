import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Button,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WhiteSpace ,Carousel} from '@ant-design/react-native';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: '居家维修保养',
        img: require('../assets/a.png'),
        img1: require('../assets/b.png')
    },
    {
        title: '住宿优惠',
        img: require('../assets/a.png'),
        img1: require('../assets/b.png')
    },
    {
        title: '出行接送',
        img: require('../assets/a.png'),
        img1: require('../assets/b.png')
    },
    {
        title: '',
        img: require('../assets/a.png'),
        img1: require('../assets/b.png')
    }
]

export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            tits: []
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                    <Icon name='search' style={{
                        color:'white',
                    }}/>
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            style={{
                                width: 490*s,
                                height: 50*s,
                                padding: 0,
                                paddingLeft: 10,                
                            }}
                        />  
                        <Image source={require('../assets/车.png')}
                    style={{marginLeft:20*s}}></Image>
                    </View>
                </View>
                <View>
                    <Carousel
                        autoplay
                        infinite
                    >
                        <View>
                            <Image source={require('../assets/轮播图.png')} />
                        </View>                  
                        <View>
                            <Image source={require('../assets/轮播图.png')} />
                        </View>
                    </Carousel>
                </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:100*s,width:100*s}}
                            />
                            <Text
                                style={{marginLeft: 120*s,marginTop: -70*s,fontSize:20*s}}
                            >{item.title}</Text>
                            <Image 
                                resizeMode="contain"
                                source={item.img1}
                                style={{height:100*s,marginTop: -50*s,width:100*s,marginLeft:480*s}}
                            />
                        </View>
                    )}
                />
                <View style={styles.fabu}>
                    <Text style={{
                        textAlign:'center',
                        fontSize:30*s,
                        color:'white',
                        top:10*s
                        }}>
                        发布需求
                    </Text>
                </View>
                <View style={{height:130*s,justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{fontSize:25*s,}}>
                        @E族之家 版权所有
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
        marginTop: 20*s,
        borderRadius: 15,
        top:20*s
    },
    header:{
        height: 80*s,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        backgroundColor: '#f23030'
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
        width: 600*s,
        height: 110*s,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 12*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
    }
})
// npm run android 或者 react-native run-android,在模拟器或者真机上装的
// 是测试版本的安装包，不要每天装一次，以后只需要执行 npm start起服务即可，
// 然后点开 App，服务界面就会编译文件

// adb reverse tcp:8081 tcp:8081

// 执行 ../gradlew，打包出一个签名好的可用于发布的版本的安装包，不用调试
// 手机调试：
// 1、打开开发者选项（选一种方式连接手机）
// 2、测试： adb devices
// 3、react-native run-android
// 拔掉数据后，再接入的时候，不用再装，还是执行npm start，
// adb reverse tcp:8081 tcp:8081
// 点卡 App 即可
