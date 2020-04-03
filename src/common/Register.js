import React, {Component} from 'react';
import {View, Text, TextInput, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            pwd1:'',
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    pwd1handle = (text)=>{
        this.setState({pwd1:text})
    }
    register=()=>{
        if(this.state.username!=''&&this.state.pwd!=''&&this.state.pwd1!=''){
            if(this.state.pwd==this.state.pwd1){
                this.setState({isRegiste:true})
                myFetch.post('/register',{
                    username:this.state.username,
                    pwd:this.state.pwd}
                ).then(res=>{
                    AsyncStorage.setItem('register',JSON.stringify(res.data))
                    .then(()=>{
                        Actions.login()
                    })
                })
            }else{
                Alert.alert('两次密码不一致');
            }
        }else{
            Alert.alert('不能为空');
        }
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
                        }}
                      >
                        <Icon name="lock" color="red"/>
                        <TextInput 
                            onChangeText={this.pwdhandle}
                            placeholder="密码" 
                            secureTextEntry={true}
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
                        }}
                      >
                        <Icon name="lock" color="red"/>
                        <TextInput 
                            onChangeText={this.pwd1handle}
                            placeholder="再次输入密码" 
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '50%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 20,
                        }}
                        onPress={this.register}
                    >
                        <Text>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}