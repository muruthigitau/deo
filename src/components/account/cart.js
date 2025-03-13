import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
  // Sample cart data - in real app this would come from API/Redux/Context
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Orange Coords Set",
      price: 15.0,
      quantity: 1,
      image: "/assets/images/fashion-1/product/17.jpg",
      originalPrice: 15.0,
    },
    {
      id: 2,
      name: "Tan Cargo Shorts",
      price: 9.96,
      quantity: 3,
      image: "/assets/images/fashion-1/product/18.jpg",
      originalPrice: 12.0,
    },
    {
      id: 3,
      name: "Gym Coords Set (Brown)",
      price: 20.0,
      quantity: 1,
      image: "/assets/images/product-details/product/17.jpg",
      originalPrice: 20.0,
    },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Handle remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Cart</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="cart-section section-b-space">
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-table">
              <thead>
                <tr className="table-head">
                  <th>image</th>
                  <th>product name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>action</th>
                </tr>
              </thead>
              {cartItems.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>
                      <Link href={`/product/${item.id}`}>
                        <Image
                          src={item.image}
                          className="img-fluid"
                          alt={item.name}
                          width={100}
                          height={100}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/product/${item.id}`}>{item.name}</Link>
                      <div className="mobile-cart-content row">
                        <div className="col">
                          <div className="qty-box">
                            <div className="input-group qty-container">
                              <button
                                className="btn qty-btn-minus"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <i className="ri-arrow-left-s-line"></i>
                              </button>
                              <input
                                type="number"
                                readOnly
                                className="form-control input-qty"
                                value={item.quantity}
                              />
                              <button
                                className="btn qty-btn-plus"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <i className="ri-arrow-right-s-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col table-price">
                          <h2 className="td-color">
                            ${item.price.toFixed(2)}
                            {item.originalPrice > item.price && (
                              <del>${item.originalPrice.toFixed(2)}</del>
                            )}
                          </h2>
                        </div>
                        <div className="col">
                          <button
                            className="icon remove-btn"
                            onClick={() => removeItem(item.id)}
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="table-price">
                      <h2>${item.price.toFixed(2)}</h2>
                      {item.originalPrice > item.price && (
                        <>
                          <del>${item.originalPrice.toFixed(2)}</del>
                          <h6 className="theme-color">
                            You Save : $
                            {(item.originalPrice - item.price).toFixed(2)}
                          </h6>
                        </>
                      )}
                    </td>
                    <td>
                      <div className="qty-box">
                        <div className="input-group qty-container">
                          <button
                            className="btn qty-btn-minus"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <i className="ri-arrow-left-s-line"></i>
                          </button>
                          <input
                            type="number"
                            readOnly
                            className="form-control input-qty"
                            value={item.quantity}
                          />
                          <button
                            className="btn qty-btn-plus"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <i className="ri-arrow-right-s-line"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2 className="td-color">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h2>
                    </td>
                    <td>
                      <button
                        className="icon remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <td colSpan="4" className="d-md-table-cell d-none">
                    total price :
                  </td>
                  <td className="d-md-none">total price :</td>
                  <td>
                    <h2>${totalPrice.toFixed(2)}</h2>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="row cart-buttons">
            <div className="col-6">
              <Link
                href="/product/category"
                className="btn btn-solid text-capitalize"
              >
                continue shopping
              </Link>
            </div>
            <div className="col-6">
              <Link
                href="/account/checkout"
                className="btn btn-solid text-capitalize"
              >
                check out
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
