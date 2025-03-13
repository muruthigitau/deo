import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Wishlist = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      image: "/assets/images/fashion-1/product/17.jpg",
      name: "Orange Coords Set",
      price: 9.96,
      inStock: true,
    },
    {
      id: 2,
      image: "/assets/images/fashion-1/product/18.jpg",
      name: "Tan Cargo Shorts",
      price: 12.0,
      inStock: true,
    },
    {
      id: 3,
      image: "/assets/images/product-details/product/17.jpg",
      name: "Gym Coords Set (Brown)",
      price: 20.36,
      inStock: true,
    },
  ]);

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id) => {
    // Add your cart logic here
    console.log(`Added item ${id} to cart`);
  };

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Wishlist</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Wishlist</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="wishlist-section section-b-space">
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-table">
              <thead>
                <tr className="table-head">
                  <th>image</th>
                  <th>product name</th>
                  <th>price</th>
                  <th>availability</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link href={`/product/${item.id}`}>
                        <Image
                          src={item.image}
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
                          <p>{item.inStock ? "in stock" : "out of stock"}</p>
                        </div>
                        <div className="col">
                          <h2 className="td-color">${item.price.toFixed(2)}</h2>
                        </div>
                        <div className="col">
                          <h2 className="td-color">
                            <button className="icon me-1">
                              <i className="ri-close-line"></i>
                            </button>
                            <button className="cart">
                              <i className="ri-shopping-cart-line"></i>
                            </button>
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2>${item.price.toFixed(2)}</h2>
                    </td>
                    <td>
                      <p>{item.inStock ? "in stock" : "out of stock"}</p>
                    </td>
                    <td>
                      <div className="icon-box d-flex gap-2 justify-content-center">
                        <button
                          className="icon me-1"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                        <button
                          className="cart"
                          onClick={() => handleAddToCart(item.id)}
                        >
                          <i className="ri-shopping-cart-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="wishlist-buttons">
            <Link href="/product/category" className="btn btn-solid">
              continue shopping
            </Link>
            <Link href="/account/checkout" className="btn btn-solid">
              check out
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
