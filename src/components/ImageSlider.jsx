import { useState } from 'react'

export  default function ImagesSlider(props){
    const images=props.images
    const [activeImage,setactiveImage]=useState(images[0])

    return(
        <div className="w-full h-full flex justify-center items-center ">
           <div className="bg-green-900 w-[70%] aspect-square relative">
             <img src={activeImage} className="w-full h-full object-cover "/>  
               
               
               <div className="h-[100px] w-full  absolute bottom-0 left-0 flex justify-center items-center">
                 {
                    images.map((image, index) => (
  <img key={index} src={image} className="h-full aspect-square cursor-pointer mx-[2px]" onClick={
    ()=>{setactiveImage(image)}
  } />
))

                 }
               </div>
           </div>
        </div>
    )
}