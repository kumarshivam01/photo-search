import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { message } from 'antd'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const ImageUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keyword, setKeyword] = useState([]);
    const [image, setImage] = useState({});
    const navigate = useNavigate()
    // add keywords
    const [key, setKey] = useState('');
    const addKeyword = (e) => {
        e.preventDefault()
        setKeyword([...keyword, key]);
        setKey('')
    }
    // remove keywords
    const removeKeyword = (idx) => {
        const updatedItems = keyword.filter((_, index) => index !== idx);
        setKeyword(updatedItems);
    };

    const uploadImage = (e) => {
        setOpen(true)
        e.preventDefault()
        if (keyword.length < 1) {
            alert('At least one keyword is required')
            setOpen(false)
        }
        else {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('keyword', JSON.stringify(keyword));
            console.log(formData)
            axios.post('/api/v1/image-upload', formData).then((response) => {
                console.log(response)
                message.success(response.data.message)
                setOpen(false)
                setImage({})
                setTitle('')
                setDescription('')
                setKeyword([])
                setOpen(false)
                navigate('/')
            }).catch((error) => {
                console.log("error:", error)
                message.error(error.response.data.errors)
                setOpen(false)

            }).finally(() => {
                console.log('something went wrong')
                setOpen(false)
            })
        }
    }

 // loader control
  const [open, setOpen] = React.useState(false);

    return (
        <>
            {/* component */}
            <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    Image Upload
                </h1>
                <form onSubmit={uploadImage}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                id="username"
                                type="text"
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label
                                className="text-white dark:text-gray-200"
                                htmlFor="passwordConfirmation"
                            >
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                required
                                id="textarea"
                                type="textarea"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                defaultValue={""}
                            />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">
                                Image Upload
                            </label>
                            <input
                                onChange={(e) => { setImage(e.target.files[0]) }}
                                id="username"
                                type="file"
                                required
                                className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <br />
                        <div className="box-wrapper">
                            <div className=" rounded flex items-center w-full p-[4px] shadow-sm border border-gray-600">
                                <button className="outline-none focus:outline-none text-white"></button>
                                <input value={key} onChange={(e) => { setKey(e.target.value) }} type="search" name="" id="" placeholder="Add keyword" x-model="q" className="text-white w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" />
                                <button onClick={addKeyword} className="flex bg-gray-500  gap-2 items-center  text-white font-bold py-2 px-4 rounded">
                                    Add
                                </button>
                            </div>
                        </div>


                    </div>
                    <div className=''>

                        {keyword && keyword.map((e, i) => {
                            return (
                                <>
                                    <p className='ml-2 bg-white px-3 py-1 mt-2 rounded-xl flex gap-2' style={{ display: 'inline-block' }} key={i + 1}> <span>{e}</span> <i onClick={() => { removeKeyword(i) }} className='fa fa-close text-red-600 text-xl cursor-pointer'></i></p>
                                </>
                            )
                        })}
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                            Save
                        </button>
                    </div>
                </form>
                <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            </section>

        </>

    )
}

export default ImageUpload