import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter } from '@ionic/react'
import React, { useState, useRef, useEffect } from "react";
import Header from './Header';
import PostForm from './PostForm';
import ShowPost from './ShowPost';

export default function Home(props) {
  const [postList, setPostList] = useState();
  const [isOpenModal, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const ionRouter = useIonRouter();

  const [presentAlert] = useIonAlert();
    useEffect(() => {
        console.log("sjkxkjabsxjb");
      }, []);

      useEffect(() => {
        fetchPostList();
      }, []);
      const fetchPostList = async () => {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPostList(data);
      };
    
      // submit add data handler
    
      const dataHandler = (data) => {
        // console.log(data);
    
        presentAlert({
          header: "Added",
          // subHeader: 'Important message',
          message: "Item Added SucessFully !",
          buttons: ["OK"],
        });
        // setPostList([...postList , data])
        // const addPostListServer = ()
        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (res) => {
            console.log(await res.json());
            fetchPostList();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      // delete data handler
    
      const deleteHandler = (id) => {
        let filteredArray = postList.filter((item) => item.id !== id);
        setPostList(filteredArray);
    
        // let index = postList.findIndex((item) => item.id !== id)
        // deleteDatabaseHandler(index,id);
    
        presentAlert({
          header: "Deleted",
          // subHeader: 'Important message',
          message: "Item Deleted SucessFully !",
          buttons: ["OK"],
        });
    
        fetch(`http://localhost:3000/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(async (res) => {
            console.log(await res.json());
            fetchPostList();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      // edit data handler
    
      const newEditPostHandler = (data) => {
        presentAlert({
          header: "Edited",
          // subHeader: 'Important message',
          message: "Item Edited SucessFully !",
          buttons: ["OK"],
        });
    
        fetch(`http://localhost:3000/posts/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (res) => {
            console.log(await res.json());
            fetchPostList();
          })
          .catch((err) => {
            console.log(err);
          });
    
        editHandler();
      };
    
      const editHandler = (id) => {
        let selectedTempPost = postList.find((item) => item.id == id);
        setSelectedPost(selectedTempPost);
        ionRouter.push(`/post/${selectedTempPost.id}`)
      };
  return (
    <IonPage>
      <Header/>
      <IonContent>
          <h1>Your Post</h1>
          {/* <PostForm
            isOpenModal={isOpenModal}
            setIsOpen={setIsOpen}
            onAddAData={dataHandler}
            setSelecetedPost={props.selecetedPost}
            setSelecetedPost={props.setSelecetedPost}
            // updatePostHandler={updatePostHandler}
            EditPost={newEditPostHandler}
          /> */}
          <ShowPost
            setIsOpen={setIsOpen}
            onDeleteData={deleteHandler}
            postList={postList}
            editHandler={editHandler}
            EditPost={newEditPostHandler}
          />
        </IonContent>
    </IonPage>
  )
}
