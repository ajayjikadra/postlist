import React, { useEffect } from "react";
import "./Header.css";
import { IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
// import { IonRippleEffect } from "@ionic/react";
import { IonButton } from "@ionic/react";

export default function Header(props) {
  // const showFormHandler = () =>{
  //    props.setShowPostform(true)
  // }


  useEffect(() => {
    console.log('header');
  },[])

  return (
    <IonHeader>
        <IonToolbar>
          <IonTitle>ReactPost</IonTitle>
          <IonButtons slot="primary">
          <IonButton routerLink="/post" color={"primary"} >
            Post
            <IonIcon slot="end" icon={'create'}></IonIcon>
          </IonButton>
        </IonButtons>
        </IonToolbar>

     
    </IonHeader>
  );
}
