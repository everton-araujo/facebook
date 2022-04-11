import Image from "next/image";
import { useSession } from 'next-auth/react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import { serverTimestamp, addDoc, collection } from '@firebase/firestore';

import { db, storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  function handleSendPost(event) {
    event.preventDefault();

    if (!inputRef.current.value) return;

    addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp()
    })

    inputRef.current.value = '';
  }

  function handleAddImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    }
  }

  const removeImage = () => {
    setImageToPost(null);
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
          className="rounded-full"
        />

        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name.split(' ')[0]}?`}
          />

          <button hidden type='submit' onClick={handleSendPost}>
            Submit
          </button>
        </form>

        {
          imageToPost && (
            <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
              <img className="h-10 object-contain" src={imageToPost} />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          )
        }
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">
            Live Video
          </p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">
            Photo/Video
          </p>
          <input
            type="file"
            hidden
            ref={filePickerRef}
            onChange={handleAddImageToPost}
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  )
}
