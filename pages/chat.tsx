import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import ScrollToBottom from 'react-scroll-to-bottom'

import FlipMove from 'react-flip-move'
import { MdSend } from 'react-icons/md'
import { db } from '../config/firebaseClient'
import Message from '../components/Message'
import { useAuth } from '../context/authContext'
import { useRequireAuth } from '../hooks/useRequireAuth'

const ChatPage = () => {
   const [messages, setMessages] = useState([])
   const [text, setText] = useState('')
   const auth = useRequireAuth()
   if (!auth.user) return null

   // useEffect(() => {
   //    db.collection('globalChat')
   //       .orderBy('timestamp', 'asc')
   //       .onSnapshot(snapshot =>
   //          setMessages(snapshot.docs.map(doc => doc.data()))
   //       )
   // }, [])
   // console.log(messages);

   const handleSubmit = e => {
      e.preventDefault()
      if (text.length === 0) return
      const data = {
         // image: profile.team.logo,
         // name: profile.name,
         // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         // text,
         // userId
      }
      // db.collection('globalChat').add(data)
      setText('')
   }

   return (
      <>chat page</>
      // <div className='chatPage'>
      //    <ScrollToBottom className='chatBox'>
      //       {messages.length > 0 ? (
      //          <FlipMove>
      //             {messages.map((message, i) => (
      //                <Message key={i} message={message} />
      //             ))}
      //          </FlipMove>
      //       ) : (
      //          <>
      //             <h1>Loading...</h1>
      //          </>
      //       )}
      //    </ScrollToBottom>

      //    <form onSubmit={handleSubmit}>
      //       <input
      //          type='text'
      //          value={text}
      //          onChange={e => setText(e.target.value)}
      //          placeholder='chat with the fans...'
      //       />
      //       <button type='submit'>
      //          <MdSend size={40} />
      //       </button>
      //    </form>
      // </div>
   )
}

export default ChatPage
