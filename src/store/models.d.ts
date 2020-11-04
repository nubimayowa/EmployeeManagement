
  export interface Profile {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
  }

  export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image?: string;
  }


//   export interface Article {
//     slug: string;
//     title: string;
//     description: string;
//     body: string;
//     tagList?: (string)[] | null;
//     createdAt: string;
//     updatedAt: string;
//     favorited: boolean;
//     favoritesCount: number;
//     author: Author;
// //   }
//   export interface Author {
//     username: string;
//     bio: string;
//     image: string;
//     following: boolean;
//   }




  export interface UserSubmit { // in the api for a post request
      email: string;
      password: string;
  }

  export interface UserResponse {
      user: User; // bind the user object to the user model
  }

  export interface UserRegistration {
    username: string;
    email: string;
    password: string;
  }

//   export interface ProfileResponse{
//    profile: Profile
//   }


//   export interface ArticleResponse {
//     articles?: (Article)[] | null;
//     articlesCount: number;
//   }
