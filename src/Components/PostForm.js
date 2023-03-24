import React, { useState, useRef, useEffect } from "react";
import "./PostForm.css";
// import { IonInput, IonItem, IonLabel, IonTextarea } from "@ionic/react";
import { IonPage, IonTextarea, useIonRouter } from "@ionic/react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  // IonPage,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
// import { OverlayEventDetail } from "@ionic/core/components";

export default function PostForm(props) {
  const modal = useRef("modal");
  const input = useRef("input");
  const title = useRef("");
  const name = useRef("");
  const url = useRef("");
  const description = useRef("");
  const ionRouter = useIonRouter();
  const [localPost, setLocalPost] = useState({
    titile: "",
    name: "",
    url: "",
    description: "",
  });

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  useEffect(() => {
    if (props.selectedPost) {
      setLocalPost({ ...props.selectedPost });
    } else {
      setLocalPost({
        titile: "",
        name: "",
        url: "",
        description: "",
      });
    }
  }, [props.selectedPost]);

  function confirm() {
    const titleData = title.current.value;
    const nameData = name.current.value;
    const urlData = url.current.value;
    const descriptionData = description.current.value;
    if (
      titleData.toString().trim() == "" ||
      nameData.toString().trim() == "" ||
      urlData.toString().trim() == "" ||
      descriptionData.toString().trim() == ""
    ) {
      return;
    }
    
    props.setSelectedPost(null);
    if (props.selectedPost) {
      const updatedPost = {
        id: localPost.id,
        titile: titleData,
        name: nameData,
        url: urlData,
        description: descriptionData,
      };
      props.EditPost(updatedPost);
    } else {
      const newPost = {
        id: new Date().getTime(),
        titile: titleData,
        name: nameData,
        url: urlData,
        description: descriptionData,
      };
      props.onAddAData(newPost);
      ionRouter.goBack();
      // props.EditPost(newPost)
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                // props.setSelectedPost(null);
                ionRouter.goBack();
              }}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={(e) => confirm(e)}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <form className="form">
            <h2>Start Loving</h2>
            <div className="container">
              <IonItem className="margin" fill="outline">
                <IonLabel position="floating">Post Title</IonLabel>
                <IonInput
                  ref={title}
                  color="dark"
                  value={localPost.titile}
                  placeholder="Enter Post Title..."
                ></IonInput>
              </IonItem>
            </div>
            <div className="container">
              <IonItem className="margin" fill="outline">
                <IonLabel position="floating">Publisher Name</IonLabel>
                <IonInput
                  ref={name}
                  value={localPost.name}
                  placeholder="Enter Your Name..."
                ></IonInput>
              </IonItem>
            </div>
            <div className="container">
              <IonItem className="margin" fill="outline">
                <IonLabel position="floating">Image Url</IonLabel>
                <IonInput
                  ref={url}
                  placeholder="Insert Image Url"
                  value={localPost.url}
                ></IonInput>
              </IonItem>
            </div>
            <div className="container">
              <IonItem className="margin" fill="outline">
                <IonLabel position="floating">
                  Your Thoughts Start Here...
                </IonLabel>
                <IonTextarea
                  ref={description}
                  value={localPost.description}
                  placeholder="Enter Subject..."
                ></IonTextarea>
              </IonItem>
            </div>
          </form>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}
