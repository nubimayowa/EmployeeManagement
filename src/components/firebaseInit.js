
import firebase from 'firebase';
import 'firebase/firestore'
import store from '@/store';
import firebaseConfig from './firebaseConfig';
const firebaseApp  = firebase.initializeApp(firebaseConfig)


firebaseApp.register = async(email, password) =>{
    try{
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    store.commit('setCurrentUser', firbase.auth().currentUser)
    return true;
    }
    catch (error){
        return error

    }
    
}

firebaseApp.logout= async () =>{
    try{
    await firebase.auth().signOut()
    store.commit('setCurrentUser',null)
    return true;
    }
    catch (error){
        return error

    }
    
}

firebaseApp.login = async(email, password) =>{
    try{
    await firebase.auth().signInWithEmailAndPassword (email, password)
    store.commit('setCurrentUser', firebase.auth().currentUser)
    return true;
    }
    catch (error){
        return error

    }
    
}


export default  firebaseApp.firestore()