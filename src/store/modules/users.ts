import {VuexModule, Module, getModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
// import store from '@/store'
import {User, UserSubmit, UserRegistration } from '../models';
import {loginUser, setJWT, clearJWt, regUser } from '../api';




@Module({
    namespaced: true,
    name: 'users',

    dynamic: true,
})




 class UsersModule extends VuexModule {
public user: User | null = null; // user binding to the model, useful in users
// profile: Profile | null = null


@Mutation
public setUser(user: User) {this.user = user; }

 @Mutation
 public addUser(user: User) {this.user = user; }



//  @Mutation
//  setProfile (profile: Profile)
//      {this.profile= profile}


get username() {
     return (this.user && this.user.username) || null;
 }


@Action ({commit: 'setUser'})
public async login(userSubmit: UserSubmit) {
    try {
    const user = await loginUser(userSubmit);
    setJWT(user.token);
    return user;
    } catch (e) {
        
        throw new Error ('Invalid username or password');
  }
}


@Action ({commit: 'addUser'})
public async register(userRegistration: UserRegistration) {
    try {
    const user = await regUser(userRegistration);
    setJWT(user.token);
    return user;
    } catch (e) {
        
        throw new Error ('Invalid username,email or password');
  }
}



// @Action ({commit: 'setProfile'})

// async loadProfile(username: string){
//     const profile = await fetchprofile(username)
//     return profile;
// }

// @MutationAction
// async loadUser(){
//     const user = await fetchUser()
//     return {user}

// }


// @MutationAction
// async updateSelfProfile(userUpdateFields: UsersForUpdate){
//     const user = await updateUser(userUpdateFields)
//     return {user};
// }
@MutationAction
public async  regProfile(regUpdateFields: UserRegistration  ) {
    const user = await regUser(regUpdateFields);
    return {user};
}


 }


export default getModule(UsersModule);
