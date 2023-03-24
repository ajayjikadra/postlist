import { IonApp, IonRouterOutlet } from "@ionic/react";
import "./App.css";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import Home from "./Components/Home";
import PostForm from "./Components/PostForm";
import { useState } from "react";

function App({ match }) {

  //fetch data from json server

  // const updatePostHandler = (updatedPost) => {
  //   let filteredArray = postList.map((item) => {
  //     if (item.id == updatedPost.id) {
  //       return {
  //         ...updatedPost,
  //       };
  //     } else {
  //       return {
  //         ...item,
  //       };
  //     }

  //   });

  //   // setPostList(filteredArray);

  // };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/"
            component={Home}
            exact
          />
          <Route
            path="/post"
            
            component={PostForm}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
