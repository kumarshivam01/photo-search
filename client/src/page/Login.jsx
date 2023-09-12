import React,{useState} from 'react'
import {message} from 'antd'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const onSubmit = (e) => {
		e.preventDefault()
		axios.post('/api/v1/login', {
			email: email,
			password: password
		})
			.then(function (response) {
				message.success(response.data.message)
                navigate('/image/upload')   
				// alert('response.data.message').
				// setState({ ...intialValue })
			})
			.catch(function (error) {
				console.log(error)
				// console.log(error.response.data.message);
				message.error(error.response.data.message)

			});
	}
    return (
        <>
            {/* component */}
            <div className="max-w-lg max-w-xs bg-blue-800 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4 rounded-xl">
                <h1 className="text-gray-200 text-center font-extrabold -mt-3 text-3xl">
                    Gallery
                </h1>
                <div className="container py-5 max-w-md mx-auto">
                    <form method="" action="" onSubmit={onSubmit}>
                        <div className="mb-4 p-2">
                            <input
                                placeholder="Username"
                                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                required
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="mb-6 p-2">
                            <input
                                placeholder="Password"
                                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                        <center><button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button></center>

                        <p onClick={()=>{navigate('/')}} className='text-start mt-2 ml-2 text-white cursor-pointer'>Back to Home page</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login