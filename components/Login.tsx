import { useForm } from 'react-hook-form'
import { MdEmail, MdLock } from 'react-icons/md'
import Input from './Input'

export default function Login() {
   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   //TODO solve type any!
   const handleClick = (data: any) => {
      console.log(data)
   }
   return (
      <div className='mt-8'>
         <form
            className='flex flex-col space-y-2'
            onSubmit={handleSubmit(handleClick)}>
            <Input
               register={register({
                  required: { value: true, message: 'Email is Required' },
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: 'Email is not valid',
                  },
               })}
               Icon={MdEmail}
               type='email'
               name='email'
               placeholder='Email'
               error={errors.email}
            />
            <Input
               register={register({
                  required: { value: true, message: 'Password is Required' },
                  minLength: {
                     value: 6,
                     message: 'Password Length must be at least 6',
                  },
               })}
               Icon={MdLock}
               name='password'
               placeholder='Password'
               type='password'
               error={errors.password}
            />

            <button
               type='submit'
               className='p-2 text-base font-medium text-white rounded-lg bg-green'>
               Login
            </button>
         </form>

         {/*//TODO line */}
         <p className='my-4 text-center text-gray-400'>or continue with</p>

         <button
            className='w-full p-2 text-base font-medium text-white bg-gray-600 rounded-lg'
            onClick={() => {}}>
            Google
         </button>
      </div>
   )
}
