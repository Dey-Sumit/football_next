import React, { forwardRef } from 'react'
import { useAuth } from '../context/authContext'

import './message.scss'

interface MessageProps extends React.ComponentPropsWithoutRef<'div'> {
   message: {
      name: string
      image: string
      timestamp: any
      text: string
      userId: string
   } // my custom prop
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
   ({ message: { name, image, timestamp, text, userId } }, ref) => {
      const { user } = useAuth()

      const formatTime = () => {
         var d = new Date(timestamp?.seconds * 1000)
         var dateString =
            d.getDate() +
            '-' +
            (d.getMonth() + 1) +
            ' ' +
            d.getHours() +
            ':' +
            d.getMinutes()
         return dateString
      }
      const time = formatTime()

      return (
         <div
            className={
               user.userId === userId ? 'message messageByUser' : 'message'
            }
            ref={ref}>
            <img src={image} alt='' />
            <div className='message__info'>
               <div className='message__header'>
                  <span>{name}</span>
                  <span className='ml-2'>{time}</span>
               </div>
               <p className='message__body'>{text}</p>
            </div>
         </div>
      )
   }
)

export default Message
