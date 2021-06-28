import React, { useState } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

function Products({products, addToCart}) {

    // component state
    // const [modal, setModal] = useState(false);
    const [product, setProduct] = useState(null);


    //component function
    const closeModal = () => {
        setProduct(null)
    }

    const openModal = product => {
        setProduct(product)
    }

    
    return (
        <div> 
            <Fade bottom cascade={true}>
            <ul className="products">
                {
                products.map(product => (
                    <li key={product._id}>
                        <div className="product">
                            <a href={"#" + product._id} onClick={() => openModal(product)}>
                                <img src={product.image} alt={product.title} />
                                <p>
                                    {product.title}
                                </p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button onClick={() => addToCart(product)} className="button primary">Add To Cart</button>
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
            </Fade>
            {
                product 
                &&
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title} />
                            <div className="product-details-description">
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes: {" "}
                                    {product.availableSizes.map( size => (
                                        <span>{" "}<button className="button">{size}</button></span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div className="">
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary" onClick={() => {
                                        addToCart(product);
                                        closeModal();
                                    }}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            }
        </div>
    )
}

export default Products
