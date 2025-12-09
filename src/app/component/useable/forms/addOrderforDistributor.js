import React, { useEffect, useState } from "react";
import { asyncfetchproduct } from "@/app/store/Actions/productAction";
import { fetchAllDistributor } from "@/app/store/Actions/distributorAction";
import { createCustomerOrder } from "@/app/store/Actions/orderAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const Addordercreate = () => {
  const [distributor, setDistributor] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDistributor, setSelectedDistributor] = useState(null); // Will store the full object
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([
    { ProductID: "", quantity: "", Price: 0, CartoonType: "large" },
  ]);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total amount
  const [PaymentMode, setPaymentMode] = useState("");  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchproduct());
        if (result && result.products) {
          setAllProducts(result.products);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const fetchDistributors = async () => {
    if (!hasMore) return;

    try {
      const result = await dispatch(fetchAllDistributor(page));

      if (result && result.distributors.length > 0) {
        setDistributor((prev) => {
          const all = [...prev, ...result.distributors];
          const unique = Array.from(
            new Map(all.map((r) => [r.id, r])).values()
          );
          return unique;
        });

        if (result.distributors.length < result.pageSize) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching distributor data:", error);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { ProductID: "", quantity: "", Price: 0, CartoonType: "large" },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;

    // Update price based on quantity and selected product
    if (field === "quantity" || field === "ProductID") {
      const selectedProduct = allproducts.find(
        (product) => product.id === updated[index].ProductID
      );
      updated[index].Price = selectedProduct
        ? selectedProduct.LargeCartoonPrice * updated[index].quantity
        : 0;
    }

    setProducts(updated);

    // Update the total amount
    const newTotal = updated.reduce((acc, product) => acc + product.Price, 0);
    setTotalPrice(newTotal);
  };

  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);

    // Update the total amount after removing a product
    const newTotal = updated.reduce((acc, product) => acc + product.Price, 0);
    setTotalPrice(newTotal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDistributor) {
      toast.error("Please select a distributor.");
      return;
    }

    // Constructing full address
    const addressObject = selectedDistributor.address?.[0]; // Because `address` is an array
    const fullAddress = addressObject
      ? `${addressObject.complectAddress || ""}, ${addressObject.city || ""}, ${
          addressObject.stateName || ""
        } - ${addressObject.pincode || ""}`
      : "";

    const orderData = {
      products,
      totalPrice,
      ShippingAdress: selectedDistributor.address,
      BillingAdress: selectedDistributor.address,
      Subtotal: totalPrice,
      Discount: 0,
      Shippingcost: 0,
      PaymentMode,
    };

    // console.log({
    //   CustomerID: selectedDistributor.id,
    //   BillingAdress: fullAddress,
    //   ShippingAdress: fullAddress,
    //   products,
    //   totalPrice,
    // });

    const result = await dispatch(
      createCustomerOrder({ id: selectedDistributor.id, orderData })
    );

    if (result?.success) {
      toast.success(`Order created successfully!`);
    }
  };

  // --- Step 1 ---
  const renderStep1 = () => (
    <div className="text-[12px] text-start">
      <label className="font-semibold">Distributor Firm Name</label>
      <select
        className="w-full py-1.5 rounded px-2 mt-1 text-black border border-gray-300"
        value={selectedDistributor?.id || ""}
        onChange={(e) => {
          const selected = distributor.find((d) => d.id === e.target.value);
          setSelectedDistributor(selected || null);
        }}
        required
      >
        <option value="">Select Distributor</option>
        {distributor.map((person) => (
          <option key={person.id} value={person.id}>
            {person.firmName}
          </option>
        ))}
      </select>

      {hasMore && (
        <button
          type="button"
          onClick={fetchDistributors}
          className="mt-2 bg-gray-400 text-white px-3 py-1 rounded"
        >
          Load More
        </button>
      )}

      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={() => selectedDistributor && setStep(2)}
          className="bg-primary text-white px-4 py-1 rounded"
          disabled={!selectedDistributor}
        >
          Next
        </button>
      </div>
    </div>
  );

  // --- Step 2 ---
  const renderStep2 = () => (
    <div className="text-[12px] text-start">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-semibold mb-4">Select Items</h2>
        <div>
          <button
            type="button"
            onClick={addProduct}
            className="bg-primary text-white px-3 py-1 rounded flex flex-row items-center gap-2"
          >
            <span>Add Another Item</span>
          </button>
        </div>
      </div>

      {products.map((item, index) => (
        <div key={index} className="border p-3 mb-3 rounded-md relative">
          <div className="mb-2">
            <label className="font-semibold">Product Name</label>
            <select
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-gray-300"
              value={item.ProductID}
              onChange={(e) =>
                handleProductChange(index, "ProductID", e.target.value)
              }
              required
            >
              <option value="">Select Product</option>
              {allproducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleProductChange(index, "quantity", e.target.value)
              }
              className="w-full border border-gray-300 px-2 py-1 rounded mt-1"
            />
          </div>

          {products.length > 1 && (
            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <div className="mb-3">
        <label className="text-[16px] font-semibold mb-4">Cart Data</label>
        <div className="border border-gray-300 px-2 py-2 rounded-[5px]">
          {products.map((item, index) => {
            const selectedProduct = allproducts.find(
              (product) => product.id === item.ProductID
            );
            return (
              <div key={index} className="flex justify-between items-center">
                <span>
                  {selectedProduct ? selectedProduct.ProductName : "Product"}
                </span>
                <span>
                  {item.quantity} x ₹ {item.Price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

   <div className="flex flex-col mb-4">
        <label className="text-[16px] font-semibold" htmlFor="PaymentMode">
          Payment Mode
        </label>
        <select
          id="PaymentMode"
          name="PaymentMode"
          value={PaymentMode} // Bind state here
          onChange={(e) => setPaymentMode(e.target.value)} // Update state on change
          className="border border-gray-300 px-2 py-2 rounded-[5px]"
        >
          <option value="">Select the payment mode</option>
          <option value="cash">CASH</option>
          <option value="credit">Credit</option>
        </select>
      </div>
      <div className="flex  w-full justify-between items-center">
        <div className="flex flex-row gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Back
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Place Order
          </button>
        </div>
        {/* Total Amount */}
        <div className="mt-4">
          <label className="font-semibold">Total Amount: </label>
          <span>₹ {totalPrice}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4 w-full">
      <form>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </form>
    </div>
  );
};

export default Addordercreate;
