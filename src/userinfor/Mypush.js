import React, { Component } from 'react'
import {
    Animated,
    View, 
    Text, 
    AsyncStorage,
    Button,
    ScrollView,
    StatusBar,
    StyleSheet,
    ToastAndroid,
    item,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const goods=['已回复','未回复']
export default class LocalPage extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            a : 1,
            opacity: new Animated.Value(0)
        }
    }
    // storeData = async ()=>{
    //     await AsyncStorage.setItem('userName','hello',
    //         ()=>{console.log('store success')}
    //     )
    // }
    // getData = ()=>{
    //     AsyncStorage.getItem('userName')
    //     .then((res)=>console.log(res));
    // }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.a)
        .then(res=>res.json())
        .then(res=>{
            this.setState({tits: res.data});
        })
    }
    add = ()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.a)
            .then(res=>res.json())
            .then(res=>{
                this.setState({tits: res.data});
                this.setState({a:this.state.a+1});
            })
            if(this.state.a==1){
                Animated.timing(this.state.opacity,{
                    toValue: 0,
                    duration: 500
                }).start()
            }
    }
    reduce = ()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.a)
            .then(res=>res.json())
            .then(res=>{
                this.setState({tits: res.data});
                this.setState({a:this.state.a-1});
            })
        if(this.state.a==1){
            Animated.timing(this.state.opacity,{
                toValue: 1,
                duration: 500
            }).start()
        }else{
            Animated.timing(this.state.opacity,{
                toValue: 0,
                duration: 500
            }).start(Actions.mypush)
        }
    }
    back = ()=>{
        Animated.timing(this.state.opacity,{
            toValue: 0,
            duration: 500
        }).start(Actions.mypush)
    }
    
    render() {
        return (
            <ScrollView>
                {/* 状态栏 */}
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <ScrollView>
                    {/* <Button title="存储" onPress={this.storeData}/> */}
                    {/* <Button title="获取" onPress={this.getData}/> */}
                    <Button title='上一页' onPress={this.reduce} style={styles.jb}/>  
                    {
                        this.state.tits.map((item)=>(
                            
                            <View>
                                <Text>{item.title.length>15?item.title.slice(0,15)+'...':item.title}</Text>
                                <Text>{item.create_at.length>11?item.create_at.slice(0,10):item.create_at}</Text>
                                <Text>{item.title}</Text>
                                {
                                    Math.random()>0.5
                                    ?<Text>已回复</Text>
                                    :<Text style={{color:'red'}}>待回复</Text>
                                }
                            </View>
                        ))
                    }
                    <Button title="下一页" onPress={this.add}/>
                    <View><Text style={{fontSize:20}}>第{this.state.a}页</Text></View>
                    <Animated.View 
                    style={
                        [{opacity:this.state.opacity},styles.innerBox]
                    }
                > 
                <Text style={{fontSize:30}}>这是第一页</Text>
                    <Button 
                        title='返回'
                        onPress={
                            this.back
                        }
                    />
                </Animated.View>
                </ScrollView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    jb:{
        display:'none'
    },
    innerBox:{
        width: '80%',
        height: 200,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
