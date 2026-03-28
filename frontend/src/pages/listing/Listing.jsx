import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../global_components/Navbar.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const BACKEND_URL = import.meta.env.VITE_BACKEND;

const formatCurrency = (value, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const prettifyKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const getInventoryBadge = (bucket) => {
  const normalized = (bucket || "").toUpperCase();

  if (normalized === "LOW") {
    return "bg-red-500/20 text-red-300 border-red-500/30";
  }
  if (normalized === "MEDIUM") {
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  }
  if (normalized === "HIGH") {
    return "bg-green-500/20 text-green-300 border-green-500/30";
  }

  return "bg-slate-700/50 text-slate-300 border-slate-600";
};

export default function Listing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListing = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BACKEND_URL}/listing/${id}`, {
        withCredentials: true,
      });

      setListingData(response.data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setListingData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  const chartData = useMemo(() => {
    if (!listingData) return [];

    const history = (listingData.priceHistory || []).map((entry) => ({
      label: formatDate(entry.date),
      actualPrice: Number(entry.price),
      predictedPrice: null,
      fullDate: entry.date,
    }));

    const predictedDate = listingData.prediction?.predicted_for_date;
    const predictedPrice = listingData.prediction?.predicted_price;

    if (predictedDate && predictedPrice != null) {
      history.push({
        label: formatDate(predictedDate),
        actualPrice: null,
        predictedPrice: Number(predictedPrice),
        fullDate: predictedDate,
      });

      if (history.length >= 2) {
        history[history.length - 2] = {
          ...history[history.length - 2],
          predictedPrice: Number(history[history.length - 2].actualPrice),
        };
      }
    }

    return history;
  }, [listingData]);

  const currentPrice = listingData?.price || 0;
  const predictedPrice = listingData?.prediction?.predicted_price || 0;
  const estimatedCostPrice = listingData?.estimatedCostPrice || 0;
  const margin = currentPrice - estimatedCostPrice;
  const marginPercent =
    estimatedCostPrice > 0
      ? ((margin / estimatedCostPrice) * 100).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar cartCount={0} />
        <section className="pt-24 px-6 pb-12">
          <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="h-8 w-40 bg-slate-800 rounded"></div>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="h-[450px] bg-slate-800 rounded-3xl"></div>
              <div className="space-y-5">
                <div className="h-10 w-3/4 bg-slate-800 rounded"></div>
                <div className="h-6 w-1/2 bg-slate-800 rounded"></div>
                <div className="h-16 w-1/3 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
              </div>
            </div>
            <div className="h-[400px] bg-slate-800 rounded-3xl"></div>
          </div>
        </section>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar cartCount={0} />
        <section className="pt-24 px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 text-sm text-orange-400 hover:underline"
            >
              ← Back
            </button>

            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-10 text-center">
              <p className="text-slate-200 text-xl mb-2">Listing not found</p>
              <p className="text-slate-500 text-sm">
                This product page has either vanished or the backend is in a
                strategic silence phase.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar cartCount={0} />

      <section className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Top Nav */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-orange-400 hover:underline"
            >
              ← Back
            </button>

            <button
              onClick={() => navigate(`/category/${listingData.categoryId}`)}
              className="text-sm text-slate-300 hover:text-orange-400 transition-colors"
            >
              View Category →
            </button>
          </div>

          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            {/* Image */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
              <div className="rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={listingData.productImage || "/placeholder.svg"}
                  alt={listingData.productName}
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {listingData.productBrand}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {listingData.categoryName}
                </span>

                {listingData.productAttributes?.amazon_style_tag && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    {listingData.productAttributes.amazon_style_tag}
                  </span>
                )}

                {(listingData.productAttributes?.is_prime_eligible ||
                  listingData.primeEligible === 1) && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Prime Eligible
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-4xl font-bold leading-tight mb-3">
                  {listingData.productName}
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {listingData.productDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                  <p className="text-sm text-slate-400 mb-2">Current Price</p>
                  <p className="text-4xl font-bold text-orange-400">
                    {formatCurrency(currentPrice, listingData.currency)}
                  </p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                  <p className="text-sm text-slate-400 mb-2">Predicted Price</p>
                  <p className="text-4xl font-bold text-cyan-400">
                    {formatCurrency(predictedPrice, listingData.currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    For{" "}
                    {formatDateTime(listingData.prediction?.predicted_for_date)}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
                  <p className="text-sm text-slate-400 mb-1">Product Rating</p>
                  <p className="text-xl font-semibold">
                    ⭐{" "}
                    {listingData.productRating ||
                      listingData.productAttributes?.rating ||
                      "-"}
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
                  <p className="text-sm text-slate-400 mb-1">Seller Score</p>
                  <p className="text-xl font-semibold">
                    {listingData.sellerScore ||
                      listingData.listingAttributes?.seller_score ||
                      "-"}
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
                  <p className="text-sm text-slate-400 mb-1">SKU</p>
                  <p className="text-sm font-medium break-all">
                    {listingData.productSku}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-orange-500 text-slate-950">
                  Add to Cart
                </button>

                <button className="px-6 py-3 rounded-xl font-semibold border border-slate-600 hover:border-cyan-400 hover:text-cyan-300 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Intelligence */}
          <div className="grid xl:grid-cols-3 gap-6 mb-12">
            <div className="xl:col-span-2 bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Price Trend Intelligence
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Historical pricing vs predicted pricing trajectory
                  </p>
                </div>
              </div>

              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="label"
                      stroke="#94A3B8"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      tick={{ fontSize: 12 }}
                      domain={["auto", "auto"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0F172A",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      formatter={(value) =>
                        value != null
                          ? formatCurrency(value, listingData.currency)
                          : "-"
                      }
                      labelFormatter={(label, payload) => {
                        const item = payload?.[0]?.payload;
                        return item?.fullDate
                          ? formatDateTime(item.fullDate)
                          : label;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actualPrice"
                      stroke="#FF6B35"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Historical Price"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="predictedPrice"
                      stroke="#22D3EE"
                      strokeWidth={3}
                      strokeDasharray="8 5"
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Predicted Price"
                      connectNulls={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-5">Margin Snapshot</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Estimated Cost Price
                    </p>
                    <p className="text-2xl font-semibold text-slate-100">
                      {formatCurrency(estimatedCostPrice, listingData.currency)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Current Margin</p>
                    <p className="text-2xl font-semibold text-green-400">
                      {formatCurrency(margin, listingData.currency)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {marginPercent}% margin
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Inventory Bucket</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold border ${getInventoryBadge(
                        listingData.listingAttributes?.inventory_bucket,
                      )}`}
                    >
                      {listingData.listingAttributes?.inventory_bucket || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-5">Store Details</h2>

                <div className="space-y-3">
                  <p className="text-lg font-semibold">
                    {listingData.storeName}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {listingData.storeDescription}
                  </p>

                  <div className="pt-2 space-y-2 text-sm">
                    <p>
                      <span className="text-slate-400">Location:</span>{" "}
                      {listingData.storeLocation}
                    </p>
                    <p>
                      <span className="text-slate-400">Latitude:</span>{" "}
                      {listingData.storeLatitude}
                    </p>
                    <p>
                      <span className="text-slate-400">Longitude:</span>{" "}
                      {listingData.storeLongitude}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Blocks */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-5">Product Attributes</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(listingData.productAttributes || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-slate-900/40 border border-slate-700 rounded-2xl p-4"
                    >
                      <p className="text-sm text-slate-400 mb-1">
                        {prettifyKey(key)}
                      </p>
                      <p className="font-medium break-words">
                        {typeof value === "boolean"
                          ? value
                            ? "Yes"
                            : "No"
                          : String(value)}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-5">Listing Attributes</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(listingData.listingAttributes || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-slate-900/40 border border-slate-700 rounded-2xl p-4"
                    >
                      <p className="text-sm text-slate-400 mb-1">
                        {prettifyKey(key)}
                      </p>
                      <p className="font-medium break-words">
                        {typeof value === "boolean"
                          ? value
                            ? "Yes"
                            : "No"
                          : String(value)}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Model Input Debug / Explainability */}
          <div className="mt-12 bg-slate-800/30 border border-slate-700 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-5">Model Input Snapshot</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(listingData.modelInput || {}).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="bg-slate-900/40 border border-slate-700 rounded-2xl p-4"
                  >
                    <p className="text-sm text-slate-400 mb-1">
                      {prettifyKey(key)}
                    </p>
                    <p className="font-medium break-words">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
