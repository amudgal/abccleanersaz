import type { Metadata } from "next";
import GoogleReviews from "./GoogleReviews";

export const metadata: Metadata = {
  title: "Customer Reviews — 5-Star Rated Dry Cleaning",
  description:
    "ABC Cleaners is rated 5 stars by 221+ customers in Phoenix AZ. Read real-time Google reviews from both our North Phoenix and Biltmore locations.",
  alternates: { canonical: "https://abccleaners.com/reviews" },
};

export default function ReviewsPage() {
  return <GoogleReviews />;
}
