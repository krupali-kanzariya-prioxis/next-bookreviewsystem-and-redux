import axios from "axios";

export interface ReviewResponseModel {
  bookId: number;
  reviewSID: string;
  reviewerName: string;
  rating: number;
  comment: string;
  reviewDate: string;
  status: number;
  createdAt: string;
  lastModifiedAt: string | null;
}

export interface ApiResponse {
  meta: {
    page: number;
    page_size: number;
    key: string;
    url: string;
    first_page_url: string | null;
    previous_page_url: string | null;
    next_page_url: string | null;
    total_results: number;
    total_page_num: number;
    extra_data: unknown;
    next_page_exists: boolean;
  };
  result: ReviewResponseModel[];
}

export interface Filter {
  key: string;
  value: string | number;
  condition: string; // '=', '!=', '>', '<', 'LIKE', etc.
}

const API_BASE_URL = "http://localhost:5156/api/Review"; 

export interface Filter {
  key: string;
  value: string | number;
  condition: string;
}

// export const getReviews = async (
//   page: number,
//   pageSize: number,
//   searchText?: string,
//   sortColumn?: string,
//   sortOrder?: string,
//   filters?: Filter[]
// ) => {
//   const response = await fetch("http://localhost:5156/api/Review", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Page: page,
//       PageSize: pageSize,
//       SearchText: searchText ?? "",
//       SortColumn: sortColumn ?? "",
//       SortOrder: sortOrder ?? "",
//       Filters: filters ?? [],
//     }),
//   });

//   if (!response.ok) throw new Error("Failed to fetch reviews");
//   return await response.json();
// };

export const getReviews = async (opts: {
  page: number;
  pageSize: number;
  searchText?: string;
  sortColumn?: string;
  sortOrder?: "ASC" | "DESC";
  filters?: Filter[];
}): Promise<ApiResponse> => {
  const params = new URLSearchParams();
  params.set("Page", String(opts.page));
  params.set("PageSize", String(opts.pageSize));
  if (opts.searchText) params.set("SearchText", opts.searchText);
  if (opts.sortColumn) params.set("SortColumn", opts.sortColumn);
  if (opts.sortOrder) params.set("SortOrder", opts.sortOrder);
  if (opts.filters?.length) {
    params.set("Filters", JSON.stringify(opts.filters));
  }

  const res = await fetch(`${API_BASE_URL}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
  return res.json();
};

export const getReviewById = async (
  reviewSid: string
): Promise<ReviewResponseModel | null> => {
  try {
    const response = await axios.get<ReviewResponseModel>(
      `${API_BASE_URL}/${reviewSid}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    return null;
  }
};


export const addOrUpdateReview = async (
  review: Partial<ReviewResponseModel>,
  reviewSid?: string
): Promise<any> => {
  try {
    const url = reviewSid
      ? `${API_BASE_URL}/AddOrUpdateReview/${reviewSid}` // Update
      : `${API_BASE_URL}/AddOrUpdateReview`;            // Add

    const response = await axios.post(url, review, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error saving review:", error);
    throw error;
  }
};

export async function deleteReview(reviewSid: string): Promise<void> {
  const response = await fetch(`http://localhost:5156/api/Review/${reviewSid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete review");
  }
}

