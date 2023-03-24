import React, { useRef } from "react";
import "./ShowPost.css";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  useIonAlert,
} from "@ionic/react";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

export default function ShowPost(props) {
  const modal = useRef("modal");
  const [presentAlert] = useIonAlert();
  const deleteHandler = (id) => {
    presentAlert({
      header: "Are You Sure You Want To Delete ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {

            props.onDeleteData(id);
           
          },
        },
      ],
      //   onDidDismiss: (e) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
    });
    
  };

 


  const editHandler = (id) => {
    props.setIsOpen(true);
    props.editHandler(id);
  };
  return (
    <>
      <IonGrid fixed={true}>
        <IonRow>
          {props.postList && props.postList.map((list) => {
            return (
              <IonCol key={list.id} size="12" size-md="6" size-lg="4">
                <IonCard>
                  <img  style={{display: 'flex' , margin: '0 auto'}} src={list.url} />
                  <IonCardHeader>
                    <IonCardTitle>{list.titile}</IonCardTitle>
                    <IonCardSubtitle>{list.name}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>{list.description}</IonCardContent>
                  <ion-button  color="success" fill="clear" onClick={() => editHandler(list.id)}>
                    Edit
                  </ion-button>
                  <ion-button
                  color="danger"
                    fill="clear"
                    onClick={() => deleteHandler(list.id)}
                  >
                    Delete
                  </ion-button>
                </IonCard>
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </>
  );
}
