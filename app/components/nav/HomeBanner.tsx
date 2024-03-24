import Image from "next/image";


const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-teal-500 to-teal-700 mb-8 rounded-xl">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="w-[40%] relative aspect-video">
                    <Image
                    src='/banner.jpg'
                    fill
                    alt="Banner Image"
                    className="object-cover rounded-xl "/>
                </div>
                <div className="mb-8 md:mb-0 text-center"> 
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sales</h1>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold"> Enjoy discounts</p>
                </div>

            </div>
        </div>
    )
}

export default HomeBanner;