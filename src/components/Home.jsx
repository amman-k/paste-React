import React, { useState } from 'react'

const home = () => {

    const [title,setTitle]=useState("");

  return (
    <div>
        <input className='rounded-xl border-black pl-2 mt-2' type="text" placeholder='Enter Title' onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
    </div>
  )
}

export default home