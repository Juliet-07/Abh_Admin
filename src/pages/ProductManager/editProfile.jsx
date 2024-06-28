import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
  let router = useNavigate();
  return (
    <div className='w-full flex flex-col items-center relative font-primaryRegular'>

      <br />
      <div className='w-[90%] flex flex-col gap-[5px]  p-[40px]  max-w-[800px] bg-white rounded-[10px] min-h-[431px] flex relative'>
      <header className="w-[90%] absolute top-0 flex  flex-row  items-center justify-between  h-[70px]">
        <div className='flex  flex-row gap-4 cursor-pointer active:opacity-[0.5]' onClick={() => router(-1)}>

        <ArrowLeftIcon width={20} height={20}  /> <b>Profile</b>

        </div>
         
      {/* <button className='bg-white border-none'>Edit</button> */}

      </header>
      <br />

      <div className='w-full flex flex-row gap-[20px]'>
      <div className='w-[100px]  h-[100px] rounded-[100px] bg-[url(/profileImg.png)] bg-center bg-cover'></div>
<div></div>
      </div>
       
      </div>

    </div>
  )
}

export default EditProfile