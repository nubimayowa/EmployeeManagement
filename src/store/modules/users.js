import * as tslib_1 from "tslib";
import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import { loginUser, setJWT, regUser } from '../api';
let UsersModule = class UsersModule extends VuexModule {
    constructor() {
        super(...arguments);
        this.user = null; // user binding to the model, useful in users
    }
    // profile: Profile | null = null
    setUser(user) { this.user = user; }
    addUser(user) { this.user = user; }
    //  @Mutation
    //  setProfile (profile: Profile)
    //      {this.profile= profile}
    get username() {
        return (this.user && this.user.username) || null;
    }
    async login(userSubmit) {
        try {
            const user = await loginUser(userSubmit);
            setJWT(user.token);
            return user;
        }
        catch (e) {
            console.error(e);
            throw new Error("Invalid username or password");
        }
    }
    async register(userRegistration) {
        try {
            const user = await regUser(userRegistration);
            setJWT(user.token);
            return user;
        }
        catch (e) {
            console.error(e);
            throw new Error("Invalid username,email or password");
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
    async regProfile(regUpdateFields) {
        const user = await regUser(regUpdateFields);
        return { user };
    }
};
tslib_1.__decorate([
    Mutation
], UsersModule.prototype, "setUser", null);
tslib_1.__decorate([
    Mutation
], UsersModule.prototype, "addUser", null);
tslib_1.__decorate([
    Action({ commit: 'setUser' })
], UsersModule.prototype, "login", null);
tslib_1.__decorate([
    Action({ commit: 'addUser' })
], UsersModule.prototype, "register", null);
tslib_1.__decorate([
    MutationAction
], UsersModule.prototype, "regProfile", null);
UsersModule = tslib_1.__decorate([
    Module({
        namespaced: true,
        name: 'users',
        dynamic: true
    })
], UsersModule);
export default getModule(UsersModule);
//# sourceMappingURL=users.js.map