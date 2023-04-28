<h1 align="center">Schmooze Assign</h1>

## Technology Stack
* css:react native stylesheet
* Javascript: Primary programing language
* React Native: Js Library ti build cross platform app
* firestore
* firbase-auth

## Firestore Data structure

Created 2 collection
1. schomoozeUser: save information about use
2. chatRooms:save room information
3. messeges: subcollection inside chatRooms
### chatRooms:
{<br>
roomId:String,//unique id of room <br>
users:Array Of userIds //users available in that room <br>
lastMessegeText:String //last messege deliverd in room <br>
lastMessegAt: String  //last messege delivered in room <br>
messeges: subCollection <br>

}
### messeges
{ <br>
messegId:String, //uniqueId of messege <br>
senderId:String,  // user id of sender <br>
messegeText:String   <br>
sendAt:time    // messenge sent time <br>
} <br>
### schomoozeUser
{ <br>
id:String, //uniqueId of user <br>
name:String,   <br>

} <br>

## How Auth works
* using firebase auth email password based login and signup
* Implemented a AuthContextProvider which is checking user is authenticated or not 
* this auth information is provided to all components using AuthContextProvider
* In Rootnavigatiojn we are checking is user already loggedin or not based on that routing 

## How Chat App works 
* once you logged in you will get chat rooms of logged in user 
* chat room we are building manually
* messege can be exchanged between Peoples available in room

## Folder Structure
```
src
  
 
  contextProviders
  data
  modules
     auth
     chat
  App.js
  RootNavigation.js
  
  ```
  
  *  `contextProvider` - this consist 1 provider 
    AuthContextProvider: this handle user and auth information
    
 *  `data` - all firestore related configuration
 *  `modules` - auth:all authentication related screen chat: all chat rlated screen
 *   `RootNavigation` - root navigation file

## How to test
<img width="588" alt="Screenshot 2023-04-28 at 8 38 43 AM" src="https://user-images.githubusercontent.com/48471809/235046225-1f97156e-4055-447d-9888-77e5f34a5efa.png">

* download expo go app
* scan atteched qr code with expo app
*  create 2 accounts with 2 different gamil id
* Initially There will be no chat room for these user
* now go to chatRooms collection and add a new document with field roomid and users 
* Provide both users ids for which you want to create room 
* now these 2 users can do realtime chat 

## About demo video
* we already have 2 account with name himanshu and arun
* and already have a room for these 2 user
* we are showing 2 videos for each user



https://user-images.githubusercontent.com/48471809/235049646-437e67bc-3e36-452f-b546-ddc8acff7bc7.mp4



https://user-images.githubusercontent.com/48471809/235049717-6bcda564-f62f-4e3e-9654-3e1581c1457a.mp4
