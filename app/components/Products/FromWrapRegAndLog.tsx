import Image from "next/image";


const FromWrapRegAndLog = ({children} : {children :React.ReactNode}) => {
    return(
        <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-24 ">
            <div className="flex flex-row w-full justify-center gap-20">
                <div className="  relative aspect-square w-[40%]  ">
                    <Image src={'/cyber-monday-shopping-sales_23-2148688502.avif'} alt="image" fill className=" w-full h-full object-cover rounded-md " />
                </div>
                <div className="flex flex-col gap-6 items-center shadow-xl shadow-slate-200 rounded-md p-4 md:p-8 w-[30%] max-w-[650px]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FromWrapRegAndLog;