import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../global_components/Navbar.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const offers = [
  {
    id: 1,
    title: "Flash Sale",
    description: "Up to 70% off on selected items",
    code: "FLASH70",
    bgColor: "#FF6B35",
    validUntil: "24 hours",
  },
  {
    id: 2,
    title: "First Purchase",
    description: "Get 20% off on your first order",
    code: "FIRST20",
    bgColor: "#4ECDC4",
    validUntil: "30 days",
  },
  {
    id: 3,
    title: "Bundle Deals",
    description: "Buy 2 Get 1 Free on fashion",
    code: "BUNDLE3",
    bgColor: "#FFE66D",
    validUntil: "7 days",
  },
];

function HorizontalScroller({ children, itemWidth = 300 }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative">
      <div className="hidden md:flex absolute -top-14 right-0 gap-3 z-10">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-orange-500 hover:scale-105 transition-all"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-orange-500 hover:scale-105 transition-all"
        >
          →
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollSnapType: "x mandatory",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}

function ProductCarousel({
  products = [],
  categoryName,
  onAddToCart,
  cartItems,
  navigate,
}) {
  if (!products.length) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">
          {categoryName} <span style={{ color: "#FF6B35" }}>Hot Deals</span>
        </h3>
      </div>

      <HorizontalScroller itemWidth={340}>
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/listing/${product.id}`)}
              className="flex-shrink-0 w-[280px] md:w-[300px] bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

                {!!product.discount && (
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: "#FF6B35" }}
                  >
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

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#FF6B35" }}
                    >
                      ₹{product.price}
                    </p>
                  </div>

                  {quantity > 0 ? (
                    <div
                      className="flex items-center gap-2 bg-slate-700 rounded-lg overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onAddToCart(product, -1)}
                        className="px-3 py-2 font-bold text-lg hover:bg-slate-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="px-3 py-2 font-bold text-lg transition-colors"
                        style={{
                          backgroundColor: "#FF6B35",
                          color: "#0F172A",
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, 1);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </HorizontalScroller>
    </div>
  );
}

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [homeSections, setHomeSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleAddToCart = (product, change) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + change;

        if (newQuantity <= 0) {
          return prevItems.filter((item) => item.id !== product.id);
        }

        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item,
        );
      } else if (change > 0) {
        return [...prevItems, { ...product, quantity: 1 }];
      }

      return prevItems;
    });
  };

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${backendUrl}/deals/get`, {
        withCredentials: true,
      });

      // DealsDto => { sections: [...] }
      setHomeSections(response.data?.sections || []);
    } catch (error) {
      console.error("Error fetching home page data:", error);
      setHomeSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = homeSections.map((section) => section.rootCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar cartCount={cartCount} />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Welcome to <span style={{ color: "#FF6B35" }}>IntelliCart</span>
              </h1>

              <p className="text-slate-300 text-lg mb-6">
                Your AI-powered shopping assistant. Smarter picks, sharper
                deals, less wallet trauma.
              </p>

              <button
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                Explore Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            {/* {!loading && categories.length > 0 && (
              <span className="text-sm text-slate-400">
                {categories.length} categories
              </span>
            )} */}
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="min-w-[170px] bg-slate-800/50 rounded-2xl p-6 border border-slate-700 animate-pulse"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-700"></div>
                  <div className="h-4 w-20 mx-auto bg-slate-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <HorizontalScroller itemWidth={220}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="group min-w-[170px] max-w-[170px] bg-slate-800/50 rounded-2xl p-6 border border-slate-700 transition-all duration-300 hover:scale-[1.03] hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">
                    {category.name}
                  </p>
                </div>
              ))}
            </HorizontalScroller>
          ) : (
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-10 text-center">
              <p className="text-slate-300 text-lg mb-2">
                No categories available
              </p>
              <p className="text-slate-500 text-sm">
                Your backend returned an empty payload. The homepage is being
                emotionally resilient about it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Hot Deals */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Top Deals Across Categories</h2>
            {!loading && homeSections.length > 0 && (
              <span className="text-sm text-slate-400">
                Curated dynamically from live inventory
              </span>
            )}
          </div>

          {loading ? (
            <div className="space-y-14">
              {[...Array(3)].map((_, sectionIndex) => (
                <div key={sectionIndex}>
                  <div className="h-8 w-64 bg-slate-800 rounded mb-6 animate-pulse"></div>
                  <div className="flex gap-6 overflow-hidden">
                    {[...Array(4)].map((_, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="w-[280px] flex-shrink-0 bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden animate-pulse"
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
              ))}
            </div>
          ) : homeSections.length > 0 ? (
            homeSections.map((section) => (
              <ProductCarousel
                key={section.rootCategory.id}
                products={section.deals || []}
                categoryName={section.rootCategory.name}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                navigate={navigate}
              />
            ))
          ) : (
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-10 text-center">
              <p className="text-slate-300 text-lg mb-2">
                No hot deals available
              </p>
              <p className="text-slate-500 text-sm">
                Either inventory is empty or your backend is feeling mysterious
                today.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-2xl p-6 border border-slate-700 relative overflow-hidden hover:scale-[1.02] transition-all duration-300"
                style={{ backgroundColor: offer.bgColor + "15" }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
                  style={{ backgroundColor: offer.bgColor + "20" }}
                ></div>

                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: offer.bgColor }}
                  >
                    {offer.title}
                  </h3>

                  <p className="text-slate-300 mb-4">{offer.description}</p>

                  <div className="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700">
                    <p className="text-sm text-slate-400 mb-1">Use Code:</p>
                    <p
                      className="text-lg font-bold"
                      style={{ color: offer.bgColor }}
                    >
                      {offer.code}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    Valid for {offer.validUntil}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2025 IntelliCart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
