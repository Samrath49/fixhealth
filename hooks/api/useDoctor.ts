import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Doctor, Booking } from "@/types";

export const doctorKeys = {
  all: ["doctors"] as const,
  lists: () => [...doctorKeys.all, "list"] as const,
  list: (filters: { city?: string }) =>
    [...doctorKeys.lists(), filters] as const,
  details: () => [...doctorKeys.all, "detail"] as const,
  detail: (id: string) => [...doctorKeys.details(), id] as const,
};

export function useDoctors(city?: string): UseQueryResult<Doctor[], Error> {
  return useQuery({
    queryKey: doctorKeys.list({ city }),
    queryFn: () => api.doctors.getAll(city),
  });
}

export function useDoctor(id: string): UseQueryResult<Doctor, Error> {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => api.doctors.getById(id),
    enabled: !!id, // Only fetch when id is provided
  });
}

export function useCreateBooking(): UseMutationResult<
  { bookingId: string },
  Error,
  Omit<Booking, "_id">
> {
  return useMutation({
    mutationFn: api.bookings.create,
  });
}

export function useSeedData(): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: api.seed.init,
  });
}
