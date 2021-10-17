import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot, orderBy, query  } from "firebase/firestore"
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString } from "firebase/storage";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
    useEffect( () => {
        onSnapshot (
        query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
        (snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        setNweets(nweetArray);
        }));
    }, []);
    const onSubmit = async (event) => {  
        event.preventDefault();
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        /* try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(), 
            createorId: userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        setNweet(""); */
    };
    const onChange = (event) => {
        const { 
            target: {value},
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {
            target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null); 
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input 
                    type="submit" 
                    value="Nweet" 
                />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
                  />
                ))}  
            </div> 
        </div>  
    );
};
export default Home;