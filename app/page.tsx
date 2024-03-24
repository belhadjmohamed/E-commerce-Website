


import Container from "./components/Container";
import Categories from "./components/nav/Categories";
import HomeBanner from "./components/nav/HomeBanner";
import NullData from "./components/Products/NullData";
import ProductCard from "./components/Products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";


interface HomeProps{
  searchParams : IProductParams
}

export default async function Home({searchParams} : HomeProps) {
  console.log(searchParams);
  const products = await getProducts(searchParams);
  
  
  
  if(products.length === 0){
    return (
      <div className="flex flex-row ">
        <div className="w-[20%]">
          <Categories/>
        </div>
        <NullData title="No products found"/>
      </div>
      
    )
  }

  function shuffleArray(array:any){
    for(let i = array.length -1 ; i> 0; i --){
      const j = Math.floor(Math.random() * (i+1));
      [array[i] , array[j]] = [array[j] , array[i]]
    }

    return array
  }

  const shuffledProducts = shuffleArray(products);

  return <div>
        <div className="flex gap-4 flex-row w-full ">
        <div className="w-[20%] ">
          <Categories/>
        </div>
        <div className="w-[80%] mb-16 mt-16 mr-5">
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {shuffledProducts.map((product : any) => {
            return <ProductCard data={product} key={product.id}/>
          })}
        </div>
        </div>
        </div>
     
    </div>
}
