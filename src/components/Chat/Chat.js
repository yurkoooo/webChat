import './Chat.css'
import React, {useEffect, useRef, useState} from 'react';
import {firestore, firebaseApp} from '../../firebase/config';
import firebase from 'firebase/compat/app';
import Spinner from 'react-bootstrap/Spinner';

export default function Chat ({about, setUser}) {
    
    // states

    const [contacts, setContacts] =  useState([]);
    const [loading, setLoading] = useState(false);
    const [lastMessage, setLastMessage] = useState([]);
    const [startChat, setStartChat] = useState(false);
    const [currentChat, setCurrentChat] = useState([]);
    const [currentImg, setCurrentImg] = useState('');
    const [currentContact, setCurrentContact] = useState('');
    const [value, setValue] = useState([]);
    const [count, setCount] = useState(1);

    // refs

    const currentUserRef = useRef();
    const lastMessageRef = useRef();
    const sendMessageRef = useRef();
    const userTypingRef = useRef();


    // get contacts from firebase

    const fetchContacts = async () => {
        const request = await firebaseApp.firestore().collection('contacts').get()
        const result = request.docs.map(doc => doc.data());
        setContacts(result);
        setLoading(true);
    }

    useEffect( () => {
        fetchContacts();        
    }, [])

    useEffect(() => {
        if (contacts.length > 1) {
            for (let i = 0; i < contacts.length; i++) {
                const getLastMessage = async () => {
                    const request = await firebaseApp.firestore().collection(`${contacts[i].name}`).orderBy("timestamp", "desc").limit(1).get();
                    const result = request.docs.map(doc => doc.data());
                    setLastMessage(current => [...current, [...result, contacts[i].name]]);
                }
                getLastMessage();
            }
        }
    }, [contacts])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView();
        console.log(lastMessage);
    })

    // search contacts

    const searchContact = (event) => {
        let value = event.target.value.trim().toLowerCase();
        const users = document.querySelectorAll('.navbar__contacts h2');
        if (value !== '') {
            users.forEach(item => {
                if (item.innerText.toLowerCase().search(value) == -1) {
                    const parent = item.closest('.navbar__contacts');
                    parent.style.display = 'none';
                }
                else {
                    const parent = item.closest('.navbar__contacts');
                    parent.style.display = 'flex';
                }
            })
        }
        else {
            users.forEach(item => {
                const parent = item.closest('.navbar__contacts');
                parent.style.display = 'flex';
            })
        }
    }

    // display current chat after click on contact

    const showChat = (event) => {
        const parent = event.target.closest('.navbar__contacts');
        const img = parent.querySelector('img');
        setCurrentImg(img.getAttribute('src'));
        const name = parent.querySelector('h2').innerHTML;
        setCurrentContact(name);
        console.log(name);
        const fetchChat = async () => {
            const request = await firebaseApp.firestore().collection(`${name}`).orderBy("timestamp", "asc").get();
            const result = request.docs.map(doc => doc.data());
            setCurrentChat(result);
            console.log(result);
        }
        fetchChat();
        document.querySelector('.contactImg').style.display = 'block';
        const chats = document.querySelectorAll('.navbar__contacts');
        setCount(count + 1);
        chats.forEach(item => {
            if (parent == item) {
            item.style.background = 'rgba(51,144,236)';
            item.style.borderRadius = '22px';
            item.style.order = `-${count}`
            } else {
                item.style.background = 'white';
                item.style.borderRadius = 0;
            }
        })
        setStartChat(true);
    }

    // send message to chat (firebase) and get fetch response from chuck norris api 

    const sendMessage = async (event) => {
        event.preventDefault();
        if(currentUserRef.current.innerText !== '' && sendMessageRef.current.value !== '') {
            const currentChat = firestore.collection(`${currentUserRef.current.innerText}`);
            await currentChat.add({
                myMessage: value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            console.log(value);
            fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => currentChat.add({
            contactMessage: data.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        ));
            setValue('');
        }
        const fetchChat = async () => {
            const request = await firebaseApp.firestore().collection(`${currentContact}`).orderBy("timestamp", "asc").get();
            const result = request.docs.map(doc => doc.data());
            setCurrentChat(result);
            console.log(result);
        }
        fetchChat();
        setTimeout(fetchChat, 10000);
        userTypingRef.current.style.display = 'block';
        setTimeout(() => userTypingRef.current.style.display = 'none', 10000)
    }

    const leave = () => {
        setUser(false);
    }


    return (
        <>
        {loading ?
        <>
        <div className='parent'>
            <div className="navbar">
                <div className="navbar__main">
                    <div className="navbar__account">
                        {about !== undefined ?
                            <>
                            {about.map(item => (
                                <>
                                <img src={item.picture} alt=""/>
                                <div>
                                    <p className='navbar__name'>{item.name}</p>
                                    <p className='navbar__email'>{item.email}</p>
                                </div>
                                </>
                            ))}
                            </>
                            : 
                            null
                        }
                        <button className='navbar__leave' onClick={leave}>Leave</button>
                    </div>
                    <input type="text" placeholder="&#xf002;   Search or start new chat" className='fontAwesome' onKeyUp={searchContact}/>
                </div>
                <div className="navbar__chats">
                    <p className='chats'>Chats</p>
                    <div className='navbar__points'>
                        {contacts.map(item => (
                            <div className="navbar__contacts" onClick={showChat}>
                                <img src={item.img} alt='person'/>
                                    {console.log(item.name)}
                                    {lastMessage.map(elem => (
                                        item.name == elem[1] ? 
                                        <>
                                        <div>
                                        <h2>{item.name}</h2>
                                        <p className='lastMessage'>{elem[0].contactMessage.slice(0, 50)}...</p>
                                        </div>
                                        <p className='lastMessageTime'>{new Date(JSON.stringify(new Date(elem[0].timestamp.seconds * 1000)).replace(/['"]+/g, '')).toString().slice(0, 25)}</p>
                                        </>
                                        :
                                        console.log(elem)
                                    ))}
                            </div>
                        ))}
                    </div>    
                </div>
            </div>
            <div className='chat'>
                <div className='chat__contact'>
                    <div className='chat__person'>
                        <img src={currentImg} alt='person' style={{display: 'none'}} className='contactImg'/>
                        <h2 ref={currentUserRef}>{currentContact}</h2>
                    </div>
                    <p style={{display : 'none'}} ref={userTypingRef}>{currentContact} is typing...</p>
                </div>
                <div className='chat__messages'>
                {startChat ? null : <h2 className='startChat'>Start chat with your friend!</h2>}
                {currentChat.map(item => {
                    if(item.contactMessage && item.timestamp !== null) {
                        return <div className="messageWrapper contact">
                            <div className='chat__contactMessage'>
                                <p>{item.contactMessage}</p>
                            </div>
                                <p>{new Date(JSON.stringify(new Date(item.timestamp.seconds * 1000)).replace(/['"]+/g, '')).toString().slice(0, 25)}</p>    
                        </div>
                    } 
                    else if (item.myMessage && item.timestamp !== null) {
                        return <div className='messageWrapper my'>
                            <div className='chat__myMessage'>
                                <p>{item.myMessage}</p>
                            </div>
                            <p className='time'>{new Date(JSON.stringify(new Date(item.timestamp.seconds * 1000)).replace(/['"]+/g, '')).toString().slice(0, 25)}</p>
                        </div>
                    }
                })}
                </div>
                <div ref={lastMessageRef}/>
                <form action="#" className='chat__send' onSubmit={sendMessage}>
                <input
                type="text"
                placeholder="Type your message" 
                value = {value}
                onChange = {e => setValue(e.target.value)}
                ref={sendMessageRef}
                />
                <button className='	fa fa-paper-plane'></button>
                </form>
            </div>
        </div>
        </>
        :   <div className='spinner'>
                <Spinner animation="border"/>
            </div>
        }
    </>
    )
}