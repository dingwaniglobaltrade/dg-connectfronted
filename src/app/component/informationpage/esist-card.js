import React from 'react'
import Image from 'next/image';

const esistcard = ({viewlogo, text}) => {
  return (
    <div className='cursor-pointer flex flex-col py-2 px-8 justify-center text-center items-center gap-2 w-[250px] h-[197px] rounded-[40px] border-[1px] border-[#DBA458]'>
       <div> 
        <Image 
        src={viewlogo}
        alt="car"
        className='w-[100px] h-[70px]'
        /></div>
     <h2 className='text-[#818080] '>{text}</h2>
    </div>
  )
}

export default esistcard