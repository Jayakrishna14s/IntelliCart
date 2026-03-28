import { useEffect, useState } from "react";
import axios from "axios";
import Listing from "./Listing";
import Unauthorized from "../global_components/Unauthorized.jsx";
import FullPageLoader from "../global_components/FullPageLoader.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND;

export const ListingGuard = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth/me`, { withCredentials: true })
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullPageLoader />;

  if (!authorized) return <Unauthorized />;

  return <Listing />;
};
