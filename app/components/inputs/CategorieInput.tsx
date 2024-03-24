'use client';

import { IconType } from "react-icons";


interface CategorieInputProps{
    selected? : boolean,
    label : string,
    icon : IconType,
    onClick : (value : string) => void
}

const CategorieInput : React.FC<CategorieInputProps> = ({selected,label,icon : Icon,onClick}) => {
    return(
        <div onClick={() => onClick(label)} className={`rounded-md border-2 p-1 flex flex-row items-center gap-2 hover:border-slate-500 transition cursor-pointer ${selected ? 'border-slate-500' : 'border-slate-200'}`}>
           <Icon size={17} /> 
           <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategorieInput;