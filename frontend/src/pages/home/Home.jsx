
import { useState, useRef } from "react"
import Navbar from "../global_components/Navbar.jsx";

// Static data
const categories = [
  { id: 1, name: "Electronics", icon: "/electronics-icon.jpg", color: "#FF6B35" },
  { id: 2, name: "Fashion", icon: "/fashion-icon.jpg", color: "#4ECDC4" },
  { id: 3, name: "Home & Kitchen", icon: "/home-kitchen-icon.jpg", color: "#95E1D3" },
  { id: 4, name: "Books", icon: "/books-icon.jpg", color: "#FFE66D" },
  { id: 5, name: "Sports", icon: "/sports-icon.jpg", color: "#FF6B9D" },
  { id: 6, name: "Beauty", icon: "/beauty-icon.jpg", color: "#C7CEEA" },
]

const topDeals = {
  Electronics: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "/wireless-headphones.png",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      image: "/smartwatch-lifestyle.png",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 49.99,
      originalPrice: 89.99,
      discount: 44,
      image: "/bluetooth-speaker.jpg",
      rating: 4.3,
    },
    {
      id: 10,
      name: "Laptop Stand",
      price: 39.99,
      originalPrice: 69.99,
      discount: 43,
      image: "/modern-laptop-stand-aluminum.jpg",
      rating: 4.4,
    },
  ],
  Fashion: [
    {
      id: 4,
      name: "Premium Denim Jacket",
      price: 59.99,
      originalPrice: 99.99,
      discount: 40,
      image: "/classic-denim-jacket.png",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Running Sneakers",
      price: 89.99,
      originalPrice: 139.99,
      discount: 36,
      image: "/running-sneakers.png",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Leather Backpack",
      price: 69.99,
      originalPrice: 119.99,
      discount: 42,
      image: "/brown-leather-backpack.png",
      rating: 4.4,
    },
    {
      id: 11,
      name: "Cotton T-Shirt Pack",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: "/premium-cotton-t-shirt-pack-colorful.jpg",
      rating: 4.5,
    },
  ],
  "Home & Kitchen": [
    {
      id: 7,
      name: "Air Fryer",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "/air-fryer.png",
      rating: 4.7,
    },
    {
      id: 8,
      name: "Coffee Maker",
      price: 49.99,
      originalPrice: 89.99,
      discount: 44,
      image: "/modern-coffee-maker.png",
      rating: 4.5,
    },
    {
      id: 9,
      name: "Cookware Set",
      price: 119.99,
      originalPrice: 199.99,
      discount: 40,
      image: "/cookware-set.png",
      rating: 4.6,
    },
    {
      id: 12,
      name: "Blender Pro",
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      image: "/powerful-blender-smoothie-maker.jpg",
      rating: 4.6,
    },
  ],
  Books: [
    {
      id: 13,
      name: "The Science of Success",
      price: 14.99,
      originalPrice: 24.99,
      discount: 40,
      image: "/business-success-book-cover-modern.jpg",
      rating: 4.7,
    },
    {
      id: 14,
      name: "Cooking Mastery Guide",
      price: 19.99,
      originalPrice: 34.99,
      discount: 43,
      image: "/cookbook-culinary-guide-professional.jpg",
      rating: 4.5,
    },
    {
      id: 15,
      name: "Digital Marketing 2025",
      price: 17.99,
      originalPrice: 29.99,
      discount: 40,
      image: "/digital-marketing-book-modern-cover.jpg",
      rating: 4.6,
    },
    {
      id: 16,
      name: "Mindfulness Daily",
      price: 12.99,
      originalPrice: 21.99,
      discount: 41,
      image: "/mindfulness-meditation-book-peaceful.jpg",
      rating: 4.8,
    },
  ],
  Sports: [
    {
      id: 17,
      name: "Yoga Mat Premium",
      price: 34.99,
      originalPrice: 59.99,
      discount: 42,
      image: "/premium-yoga-mat-exercise-purple.jpg",
      rating: 4.7,
    },
    {
      id: 18,
      name: "Dumbbell Set",
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      image: "/adjustable-dumbbell-set-home-gym.jpg",
      rating: 4.6,
    },
    {
      id: 19,
      name: "Fitness Tracker Band",
      price: 59.99,
      originalPrice: 99.99,
      discount: 40,
      image: "/fitness-tracker-band-wearable-black.jpg",
      rating: 4.5,
    },
    {
      id: 20,
      name: "Resistance Bands Set",
      price: 24.99,
      originalPrice: 44.99,
      discount: 44,
      image: "/resistance-bands-workout-set-colorful.jpg",
      rating: 4.4,
    },
  ],
  Beauty: [
    {
      id: 21,
      name: "Skincare Set Deluxe",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "/luxury-skincare-set-bottles-elegant.jpg",
      rating: 4.8,
    },
    {
      id: 22,
      name: "Hair Dryer Pro",
      price: 69.99,
      originalPrice: 119.99,
      discount: 42,
      image: "/professional-hair-dryer-salon-quality.jpg",
      rating: 4.6,
    },
    {
      id: 23,
      name: "Makeup Brush Set",
      price: 39.99,
      originalPrice: 69.99,
      discount: 43,
      image: "/makeup-brush-set-professional-pink.jpg",
      rating: 4.7,
    },
    {
      id: 24,
      name: "Perfume Collection",
      price: 99.99,
      originalPrice: 159.99,
      discount: 38,
      image: "/perfume-bottles-collection-luxury-elegant.jpg",
      rating: 4.9,
    },
  ],
}

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
]

function ProductCarousel({ products, categoryName, onAddToCart, cartItems }) {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 2000) // Resume animation after 2 seconds
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e) => {
    setIsPaused(true)
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 2000)
  }

  return (
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6">
          {categoryName} <span style={{ color: "#FF6B35" }}>Top Deals</span>
        </h3>
        <div
            className="overflow-hidden relative"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
        >
          <div
              ref={scrollRef}
              className={`flex gap-6 overflow-x-auto scrollbar-hide ${!isPaused ? "animate-marquee-infinite" : ""}`}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
          >
            {[...products, ...products, ...products].map((product, index) => {
              const cartItem = cartItems.find((item) => item.id === product.id)
              const quantity = cartItem ? cartItem.quantity : 0

              return (
                  <div
                      key={`${product.id}-${index}`}
                      className="flex-shrink-0 w-72 bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl"
                      onMouseDown={(e) => e.stopPropagation()} // Prevent drag on buttons
                  >
                    <div className="relative">
                      <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                      />
                      <div
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "#FF6B35" }}
                      >
                        {product.discount}% OFF
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-slate-400">⭐ {product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold" style={{ color: "#FF6B35" }}>
                            ${product.price}
                          </p>
                          <p className="text-sm text-slate-400 line-through">${product.originalPrice}</p>
                        </div>
                        {quantity > 0 ? (
                            <div className="flex items-center gap-2 bg-slate-700 rounded-lg">
                              <button
                                  onClick={() => onAddToCart(product, -1)}
                                  className="px-3 py-2 font-bold text-lg hover:bg-slate-600 rounded-l-lg transition-colors"
                              >
                                -
                              </button>
                              <span className="px-3 py-2 font-semibold">{quantity}</span>
                              <button
                                  onClick={() => onAddToCart(product, 1)}
                                  className="px-3 py-2 font-bold text-lg rounded-r-lg transition-colors"
                                  style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
                              >
                                +
                              </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onAddToCart(product, 1)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
                            >
                              Add to Cart
                            </button>
                        )}
                      </div>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default function Home() {
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (product, change) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        const newQuantity = existingItem.quantity + change

        if (newQuantity <= 0) {
          // Remove item if quantity is 0 or less
          return prevItems.filter((item) => item.id !== product.id)
        }

        // Update quantity
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item))
      } else if (change > 0) {
        // Add new item
        return [...prevItems, { ...product, quantity: change }]
      }

      return prevItems
    })
  }

  // Calculate total cart count
  const cartCount = cartItems.length

  return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar cartCount={cartCount} />

        {/* Hero Banner */}
        <section className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to <span style={{ color: "#FF6B35" }}>IntelliCart</span>
                </h1>
                <p className="text-slate-300 text-lg mb-6">
                  Your AI-powered shopping assistant. Save smarter, shop better!
                </p>
                <button
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
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
            <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                  <div
                      key={category.id}
                      className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:scale-105 hover:border-orange-500 cursor-pointer"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center overflow-hidden">
                      <img
                          src={category.icon || "/placeholder.svg"}
                          alt={category.name}
                          className="w-10 h-10 object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-center">{category.name}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Deals Across Categories */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Top Deals Across All Categories</h2>

            {Object.entries(topDeals).map(([categoryName, products]) => (
                <ProductCarousel
                    key={categoryName}
                    products={products}
                    categoryName={categoryName}
                    onAddToCart={handleAddToCart}
                    cartItems={cartItems}
                />
            ))}
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
                      className="rounded-xl p-6 border border-slate-700 relative overflow-hidden"
                      style={{ backgroundColor: offer.bgColor + "15" }}
                  >
                    <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
                        style={{ backgroundColor: offer.bgColor + "20" }}
                    ></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: offer.bgColor }}>
                        {offer.title}
                      </h3>
                      <p className="text-slate-300 mb-4">{offer.description}</p>
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700">
                        <p className="text-sm text-slate-400 mb-1">Use Code:</p>
                        <p className="text-lg font-bold" style={{ color: offer.bgColor }}>
                          {offer.code}
                        </p>
                      </div>
                      <p className="text-xs text-slate-400">Valid for {offer.validUntil}</p>
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
  )
}
