import { ApiEndpoints, ApiErrors } from "@/constants/api";
import type { ApiResponse, Doctor, Booking } from "@/types";

class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    throw new ApiError(
      data.error || `Error: ${response.status}`,
      response.status,
      data
    );
  }

  return data.data as T;
}

export const api = {
  doctors: {
    getAll: async (city?: string): Promise<Doctor[]> => {
      const response = await fetch(
        `${ApiEndpoints.DOCTORS}${
          city ? `?city=${encodeURIComponent(city)}` : ""
        }`
      );
      return handleResponse<Doctor[]>(response);
    },

    getById: async (id: string): Promise<Doctor> => {
      const response = await fetch(`${ApiEndpoints.DOCTORS}/${id}`);
      return handleResponse<Doctor>(response);
    },
  },

  bookings: {
    create: async (
      booking: Omit<Booking, "_id">
    ): Promise<{ bookingId: string }> => {
      const response = await fetch(ApiEndpoints.BOOKINGS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      return handleResponse<{ bookingId: string }>(response);
    },
  },

  seed: {
    init: async (): Promise<void> => {
      const response = await fetch(ApiEndpoints.SEED, {
        method: "POST",
      });
      return handleResponse<void>(response);
    },
  },
};
