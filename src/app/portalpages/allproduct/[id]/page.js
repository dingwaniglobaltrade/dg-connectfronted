"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import ProductDetailes from "@/app/component/Productmodless/productdetailes";
import ProtectedRoute from "@/app/component/protectedroute";
import { useDispatch } from "react-redux";
import { use } from "react"; //only if params is a Promise

import { fetchProductbyID } from "@/app/store/Actions/productAction";

const ModelViewer = dynamic(
  () => import("@/app/component/Productmodless/ModelViewer.js"),
  { ssr: false }
);

const Page = ({ params }) => {
  // If params is Promise (Next.js 15+):
  const { id } = use(params);

  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchProductbyID(id));
        console.log("Fetched product data:", result);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  console.log("Product Data:", productData);

  return (
    <ProtectedRoute>
      <div className="w-full h-screen">
        <div className="h-full flex flex-col">
          <div className="w-full h-[12%] ">
            <div className="mt-3">
              <Upernavbar pagename="Product Detailes" />
            </div>
          </div>
          <div className="w-full flex lg:flex-row md:flex-col flex-col h-auto justify-center items-center">
            <div className="lg:w-[50%] md:w-full w-full lg:h-full h-auto">
              {productData?.media?.length > 0 ? (
                <>
                  {productData.media.find((m) => m.type === "GLB") ? (
                    <ModelViewer
                      url={productData.media.find((m) => m.type === "GLB").url}
                    />
                  ) : (
                    <p>No 3D model found</p>
                  )}
                </>
              ) : (
                <p>No media found</p>
              )}
            </div>
            <div className="lg:w-[40%] w-full lg:h-full h-auto">
              <ProductDetailes product={productData} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
