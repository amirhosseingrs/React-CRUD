import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './add.css'

const Add = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [book, setBook] = useState({
        title : "",
        description : "",
        cover : ""
    })
    const handleChange = (e) => {
        setBook((prev) => ({...prev , [e.target.name] : e.target.value}))
    }
    const subminHandle = async (e) => {
        e.preventDefault()
        try {
            if (book.title !== "" && book.description !== "") {

                await axios.post('http://localhost:3001/books', book)
                navigate('/')
            }else {
                setError('Fill out the title and description fields please')
            }
        } catch (error) {
            if (error) throw error
        }
    }
  return (
    <div className='form Container'>
        
        <h2>Add New Book</h2>
        <input type="text" placeholder='Title ...' name='title' onChange={handleChange} />
        <input type="text" placeholder='Description ...' name='description' onChange={handleChange} />
        <input type="text" placeholder='Cover Url ...' name='cover' onChange={handleChange} />
        <button className='btn' onClick={subminHandle}>Add New Book</button>
    </div>
  )
}

export default Add