import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles'
import { AiFillHeart, AiFillStar,AiOutlineStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';

const ProductCard = ({data}) => {
    const [click , setClick] = useState(false)
    const [open , setOpen] = useState(false)

    const d = data.name;
    const product_name = d.replace(/\s+/g, '-');
    return (
        <>
        <div className="relative w-full h-[370px] bg-white rounded-lg shadow-sm p-3 cursor-pointer">
            <div className='flex justify-end'>
    
            </div>
            <Link to={`/products/${product_name}`}>
                <img src={data.image_Url[0].url} alt="" 
                className='w-full h-[170px] object-contain' />
            </Link>
            <Link to="/">
                <h4 className={`${styles.shop_name}`}>
                    {data.shop.name}
                </h4>
            </Link>
            <Link to={`/products/${product_name}`}>
                <h4 className="pb-3 font[500]">
                    {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
                </h4>
                <div className='flex'>
                    <AiFillStar className='mr-2 cursor-pointer' size={20} color='#F6BA00' />
                    <AiFillStar className='mr-2 cursor-pointer' size={20} color='#F6BA00' />
                    <AiFillStar className='mr-2 cursor-pointer' size={20} color='#F6BA00' />
                    <AiFillStar className='mr-2 cursor-pointer' size={20} color='#F6BA00' />
                    <AiOutlineStar className='mr-2 cursor-pointer' size={20} color='#F6BA00' />
                </div>
                <div className='py-2 flex items-center justify-between' >
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice}`}>
                            {data.price === 0 ? data.price : data.discount_price}
                            $
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.price ? data.price + "$" : null}
                        </h4>
                    </div>
                    <span className='foot-[400] text-[17px] text-green-600'>
                        {data?.sold_out ? "Sold out" : "Sold"}
                    </span>
                </div>
            </Link>
            {/* side option */}
            <div>
                {click ? (
                    <AiFillHeart 
                    size={22} 
                    className='cursor-pointer absolute right-2 top-5' 
                    onClick={() => setClick(!click)} 
                    color={click ? "red" : "#333"} 
                    title='Remove from wishlist' />
                ) : (
                    <AiOutlineHeart 
                    size={22} 
                    className='cursor-pointer absolute right-2 top-5' 
                    onClick={() => setClick(!click)} 
                    color={click ? "red" : "#333"} 
                    title='Add to wishlist' />
                )}
                <AiOutlineEye 
                size={22} 
                className='cursor-pointer absolute right-2 top-14' 
                onClick={() => setOpen(!open)} 
                color= "#333" 
                title='Quick view' 
                />
                <AiOutlineShoppingCart 
                size={25} 
                className='cursor-pointer absolute right-2 top-24' 
                onClick={() => setOpen(!open)} 
                color= "#333" 
                title='Add to cart'
                />
                {
                    open ? (
                        <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
                    ) : null
                }
            </div>
        </div>
        </>
    )
}

export default ProductCard