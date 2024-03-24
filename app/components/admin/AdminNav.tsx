"use client";

import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";


const AdminNav = () => {

    const pathname = usePathname();

    return(
       
                <div className="flex flex-col bg-[#114232]  gap-4 md:gap-4 overflow-x-auto flex-nowrap w-[20%] pt-3">
                    <Link href='/admin'>
                        <AdminNavItem label="Summary" icon={MdDashboard} selected={pathname === '/admin'}/>
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem label="AddProducts" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'}/>
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem label="ManageProducts" icon={MdDns} selected={pathname === '/admin/manage-products'}/>
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem label="ManageOrders" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
        
    )
}

export default AdminNav;