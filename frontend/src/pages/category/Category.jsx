import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../global_components/Navbar.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND;

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BACKEND_URL}/category/${id}`, {
        withCredentials: true,
      });

      const shuffledProducts = [...(response.data.products || [])].sort(
        () => Math.random() - 0.5,
      );

      setCategoryData({
        ...response.data,
        products: shuffledProducts,
      });
    } catch (error) {
      console.error("Error fetching category page:", error);
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar cartCount={0} />

      <section className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-orange-400 hover:underline"
          >
            ← Back
          </button>

          {loading ? (
            <div className="space-y-8">
              <div className="h-10 w-64 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-5 w-96 bg-slate-800 rounded animate-pulse"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden animate-pulse"
                  >
                    <div className="h-52 bg-slate-700"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-slate-700 rounded"></div>
                      <div className="h-4 w-20 bg-slate-700 rounded"></div>
                      <div className="h-6 w-24 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : categoryData ? (
            <>
              {/* Category Header */}
              <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 md:p-10 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-700/50 flex items-center justify-center overflow-hidden">
                    <img
                      src={categoryData.category?.image || "/placeholder.svg"}
                      alt={categoryData.category?.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      {categoryData.category?.name || "Category"}
                    </h1>
                    <p className="text-slate-400">
                      Products from this category and its full subcategory tree
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      {categoryData.products?.length || 0} listings available
                    </p>
                  </div>
                </div>
              </div>

              {/* Products */}
              {categoryData.products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryData.products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/listing/${product.id}`)}
                      className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-52 object-cover"
                        />

                        {!!product.discount && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-500">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[56px]">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm text-slate-400">
                            ⭐ {product.rating ?? "4.5"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-orange-400">
                            ₹{product.price}
                          </p>
                          <span className="text-xs text-slate-500">
                            {product.currency || "INR"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-10 text-center">
                  <p className="text-slate-300 text-lg mb-2">
                    No products found
                  </p>
                  <p className="text-slate-500 text-sm">
                    This category tree is currently understocked.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-10 text-center">
              <p className="text-slate-300 text-lg mb-2">
                Failed to load category
              </p>
              <p className="text-slate-500 text-sm">
                Something went sideways while fetching the category data.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
