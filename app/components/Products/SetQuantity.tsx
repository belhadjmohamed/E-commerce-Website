'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";


interface SetQtyProps {
    cartCounter ?: boolean,
    cartProduct : CartProductType,
    handleQtyIncrease : () => void,
    handleQtyDecrease : () => void
}

const btnstyles = 'border-[1.2px] border-slate-300 rounded px-2'

const SetQuantity : React.FC<SetQtyProps> = ({
    cartProduct,
    cartCounter,
    handleQtyDecrease,
    handleQtyIncrease
}) => {
    return(
        <div className="flex gap-8 items-center justify-between">
            {cartCounter ? null : <div className="font-semibold"> Quantity :</div>}
            <div className="flex gap-4 items-center text-base">
                <button className={btnstyles} onClick={handleQtyDecrease}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className={btnstyles} onClick={handleQtyIncrease}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity;