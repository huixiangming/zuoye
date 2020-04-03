import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        if(this.state.username!=='' && this.state.pwd!==''){
          this.setState({isloading:true})
          //请求index中的链接
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
           //给接口中的username和pwd赋值成输入框内的值
        ).then(res=>{
            if(res.data.username===this.state.username && res.data.pwd===this.state.pwd){
              //所以无论输入什么都必然相等
              AsyncStorage.setItem('user',JSON.stringify(res.data))
              //存储状态
                .then(()=>{
                    this.setState({isloading:false})
                    Actions.homepage();
                })
            }else{
              Alert.alert('用户名或密码错误');
              this.setState({
                isLoading:false
              });
            }
        })
      }else{
        Alert.alert('不能为空');
      }
    }
    register = ()=>{
      Actions.register();
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.register}
                    >
                        <Text>没有账号？去注册</Text>
                    </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View><Text>正在登录。。。</Text></View>
            :null
        }
      </View>
    );
  }
}