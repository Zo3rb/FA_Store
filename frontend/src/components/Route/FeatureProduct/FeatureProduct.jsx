import React from 'react';
import styles from '../../../styles/styles';
import {productData} from '../../../static/data';
import ProductCard from '../ProductCard/ProductCard';

const FeatureProduct = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h2>Feature Product</h2>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
                {
                    productData && productData.map((item, index) => <ProductCard data={item} key={index} />)
                }
            </div>
        </div>
    </div>
  )
}

export default FeatureProduct