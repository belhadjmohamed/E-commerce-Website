"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";



const Categories = () => {

    const params = useSearchParams();

    const category  = params?.get('category');

    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }

    return (
        <div className="bg-[#114232] h-full">
            <Container>
                <div className="pt-4 flex flex-col  overflow-y-auto">
                    {categories.map((item) => (
                        <Category label={item.label} icon={item.icon} key={item.label} selected={category === item.label || (category === null && item.label ==='All') }/>
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default Categories;