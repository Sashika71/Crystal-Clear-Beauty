import { useState } from 'react'

export default function ImagesSlider(props) {
    const images = props.images
    const [activeImage, setactiveImage] = useState(images[0])

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white w-[90%] flex flex-col max-w-md">
                
                {/* Main Image Container */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden flex items-center justify-center p-6">
                    
                    {/* Main Image - Increased bottom padding to clear the larger thumbnails */}
                    <img 
                        src={activeImage} 
                        className="w-full h-full object-contain pb-24" 
                        alt="Main Product" 
                    />

                    {/* Thumbnails - Increased size and adjusted positioning */}
                    <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 px-3 flex-wrap">
                        {
                            images.map((image, index) => (
                                <div 
                                    key={index} 
                                    className={`h-20 w-20 rounded-xl border-2 bg-white p-1 cursor-pointer transition-all duration-300 shadow-md flex items-center justify-center overflow-hidden
                                        ${activeImage === image 
                                            ? 'border-pink-500 scale-110 z-10' 
                                            : 'border-white/80 hover:border-pink-200'}`}
                                    onClick={() => { setactiveImage(image) }}
                                >
                                    <img 
                                        src={image} 
                                        className="h-full w-full object-contain rounded-md" 
                                        alt={`Thumbnail ${index}`} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}