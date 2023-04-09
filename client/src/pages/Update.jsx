import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Update = () => {
  // let id = (window.location.href).substring((window.location.href).lastIndexOf('/')+1, (window.location.href).length)
  const url = (window.location.pathname).split('/')
  const id = url[url.length-1]
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const coverRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const getBook = async () => {
        const res = await axios.get(`http://localhost:3001/books/${id}`)
        console.log(res.data)
        titleRef.current.value = res.data[0].title
        descriptionRef.current.value = res.data[0].description
        coverRef.current.value = res.data[0].cover
      }
      getBook()
    } catch (error) {
      if (error) throw error;
    }
  }, [])
  const submitHandle = async() => {
    try {
      const book = { title: titleRef.current.value, description: descriptionRef.current.value, cover: coverRef.current.value}
      const res = await axios.put(`http://localhost:3001/books/${id}`, book)
      navigate('/')
    } catch (error) {
      if (error) throw error;
    }
  }
  return (
    <div className='form Container'> 
        <h2>Add New Book</h2>
        <input type="text" placeholder='Title ...' name='title' ref={titleRef} />
        <input type="text" placeholder='Description ...' name='description' ref={descriptionRef} />
        <input type="text" placeholder='Cover Url ...' name='cover' ref={coverRef} />
        <button className='btn' onClick={submitHandle}>Update Book</button>
    </div>
  )
}

export default Update