import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { mockProductData } from "@/data/mockProduct";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCartItems(response.data.items || []);

        // Fetch product details
        const productRequests = response.data.items.map((item) =>
          axios
            .get(`/api/product/${item.productId}`)
            .then((res) => res.data)
            .catch(() => {
              console.error(
                `Failed to fetch product ${item.productId}, using mock data.`
              );
              return { ...mockProductData, id: item.productId };
            })
        );

        const productsData = await Promise.all(productRequests);
        const productMap = productsData.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});

        setProducts(productMap);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, change) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      setCartItems(updatedItems);

      await axios.post("/api/cart", { productId, quantity: change });
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      await axios.post("/api/cart/remove", { productId });
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity,
    0
  );

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
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              {cartItems.map((item) => {
                const product = products[item.productId] || mockProductData;

                return (
                  <tbody key={item.productId}>
                    <tr>
                      <td>
                        <Link href={`/product/${item.productId}`}>
                          <Image
                            src={product.images?.[0] || "/placeholder.jpg"}
                            className="img-fluid"
                            alt={product.name}
                            width={100}
                            height={100}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link href={`/product/${item.productId}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td className="table-price">
                        <h2>${product.price?.toFixed(2)}</h2>
                      </td>
                      <td>
                        <div className="qty-box">
                          <div className="input-group qty-container">
                            <button
                              className="btn qty-btn-minus"
                              onClick={() => updateQuantity(item.productId, -1)}
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
                              onClick={() => updateQuantity(item.productId, 1)}
                            >
                              <i className="ri-arrow-right-s-line"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h2 className="td-color">
                          ${(product.price * item.quantity).toFixed(2)}
                        </h2>
                      </td>
                      <td>
                        <button
                          className="icon remove-btn"
                          onClick={() => removeItem(item.productId)}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
              <tfoot>
                <tr>
                  <td colSpan="4" className="d-md-table-cell d-none">
                    Total Price:
                  </td>
                  <td className="d-md-none">Total Price:</td>
                  <td>
                    <h2>${totalPrice.toFixed(2)}</h2>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="row cart-buttons">
            <div className="col-6">
              <Link href="/product/" className="btn btn-solid text-capitalize">
                Continue Shopping
              </Link>
            </div>
            <div className="col-6">
              <Link href="/checkout" className="btn btn-solid text-capitalize">
                Check Out
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
