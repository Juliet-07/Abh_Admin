import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  let router = useNavigate();
  return (
    <div className="w-full flex flex-col items-center relative font-primaryRegular">
      <br />
      <div className="w-[90%] flex flex-col gap-[5px]  p-[40px]  max-w-[800px] bg-white rounded-[10px] min-h-[431px] flex relative">
        <header className="w-[90%] absolute top-0 flex  flex-row  items-center justify-between  h-[70px]">
          <div
            className="flex  flex-row gap-4 cursor-pointer active:opacity-[0.5]"
            onClick={() => router(-1)}
          >
            <ArrowLeftIcon width={20} height={20} /> <b>Edit Profile</b>
          </div>

          {/* <button className='bg-white border-none'>Edit</button> */}
        </header>
        <br />

        <div className="w-full flex flex-row flex-wrap  gap-[20px]">
          <div className="w-[100px]  h-[100px] rounded-[100px] bg-[url(/profileImg.png)] bg-center bg-cover"></div>
          <div className="flex flex-1 flex-col gap-4 flex-wrap ">
            <div className="w-full flex flex-row flex-wrap  gap-4">
                <div className="flex flex-col flex-1 min-w-[250px]">
                    <p>First name</p>
                    <input type="text" className="w-full h-[40px] border-[1px]" />
                </div>
                <div className="flex flex-col flex-1 min-w-[250px]">
                    <p>Last name</p>
                    <input type="text" className="w-full h-[40px] border-[1px]" />
                </div>
            </div>

             <div className="flex flex-col flex-1 min-w-[250px]">
                    <div className="flex items-center justify-between">
                    <p>Email</p>
                    <p className="text-green-400 cursor-pointer active:opacity-[0.2]">change</p>

                    </div>
                    <input type="text" disabled className="w-full h-[40px] border-[1px]" />
                </div>

                 <div className="flex flex-col flex-1 min-w-[250px]">
                    <p>Phone Number</p>
                    <input type="text" className="w-full h-[40px] border-[1px]" />
                </div>  

                <div className="w-full flex items-center justify-center">
                    <button className="w-[200px] h-[40px] cursor-pointer active:opacity-[0.2] bg-green-400 rounded-[4px] text-white">Update</button>
                    </div>          

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
