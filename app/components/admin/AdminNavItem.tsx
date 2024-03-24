import { IconType } from "react-icons";


interface AdminNavItemProps{
    selected? : boolean;
    icon : IconType;
    label : string;
}


const AdminNavItem : React.FC<AdminNavItemProps> = ({selected,icon: Icon,label}) => {
    return (
        <div className={`mx-3 flex items-center  gap-1 p-2 border-b-2 hover:text-slate-400 transition cursor-pointer b ${selected ? 'border-b-white text-red-500' : 'border-transparet text-white'}`}>
            <Icon size={20} />
            <div className="font-medium text-sm text-center break-normal">{label}</div>
        </div>
    );
}

export default AdminNavItem;