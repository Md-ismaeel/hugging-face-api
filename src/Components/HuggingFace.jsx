import { useRef, useState } from 'react'
import axios from 'axios';
import { Loader } from './Loader';
// import "../Components/Hugging.css"

export const HuggingFace = () => {
  const inputRef = useRef();
  const [imageLink, setImageLink] = useState();
  const [loading, setLoading] = useState(false)
  const url = "https://api-inference.huggingface.co/models/prompthero/openjourney-v4";

  const clickHandler = async () => {
    const data = { "inputs": inputRef.current.value };
    setLoading(true)

    // try {
    //   const response = await axios.post(url, data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer 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'
    //     },
    //     responseType: 'arraybuffer'
    //   });

    //   const blob = new Blob([response.data], { type: 'image/png' });
    //   const imageUrl = URL.createObjectURL(blob);
    //   setImageLink(imageUrl);
    //   setLoading(false)
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    axios.post(url, {
      inputs: JSON.stringify(data)
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      responseType: "blob"
    })
      .then((response) => {
        console.log(response.data);
        const image = URL.createObjectURL(response.data);
        setLoading(false)
        setImageLink(image)
      }).catch((error) => console.error('fetching Error', error))
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center mt-2 text-white '>
      <header>
        <h1 className='text-2xl px-6 py-1 mb-4 bg-blue-400 rounded-sm'>Image generator</h1>
      </header>
      <div className='w-full flex justify-center items-center gap-6'>

        <input ref={inputRef} type='text' placeholder='input key'
          className='w-60 px-4 py-2 bg-slate-900 rounded-sm' />

        <button
          onClick={clickHandler}
          className='px-10 py-2 bg-slate-900 rounded-sm text-lg'
        >Generate
        </button>

      </div>
      <div className='mt-10'>
        {loading ?
          <Loader /> : ''
        }
        {imageLink ? (
          <img src={imageLink} alt={`${inputRef.current?.value}`} className='w-[450px] h-[350px] rounded-md ' />
        ) : null}
      </div>
    </div>
  )
}