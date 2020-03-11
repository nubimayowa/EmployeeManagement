import axios from 'axios';
import { UserSubmit, User, UserResponse, UserRegistration } from './models';

export const conduitApi = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});
export function setJWT(jwt: string) {
  conduitApi.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function clearJWt() {
  delete conduitApi.defaults.headers.common.Authorization;
}




export async function loginUser(user: UserSubmit): Promise<User> {
  // passing the user object and binding to the userSubmit model: promise <whole data model>

  const response = await conduitApi.post('/users/login', {
    user,
  });
  return (response.data as UserResponse).user; // bind the user object to the User model
}
// promises must return a value


// export  async function fetchprofile(username: string): Promise <Profile>{
//   const response = await conduitApi.get(`/profiles/${username}`)
// return(response.data as ProfileResponse).profile
// }

export async function fetchUser(): Promise <User> { // get
    const response = await conduitApi.get('/user');
    return (response.data as UserResponse).user;
}

// export async function getGlobalFeed(): Promise <ArticleResponse> {
//     const response = await conduitApi.get('/articles')
//     return response.data as ArticleResponse
// }

// export async function updateUser(user: UsersForUpdate): Promise<User>  {
//     const response = await conduitApi.put('/user', user)
//     return response.data as User

// }
export async function regUser(user: UserRegistration) {
  const response = await conduitApi.post('/users', user);
  return response.data as User;

  }

// e
