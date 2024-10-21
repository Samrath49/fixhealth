"use client";
import { useDoctors, useSeedData } from "@/hooks/api/useDoctor";
import { useEffect } from "react";

const SeedData = () => {
  const { data: doctors, isLoading, refetch } = useDoctors();
  const { mutate: seedData, isSuccess } = useSeedData();

  useEffect(() => {
    if (typeof doctors === "object" && doctors?.length <= 0 && !isLoading) {
      seedData();
    }
  }, [doctors, seedData]);

  useEffect(() => {
    refetch();
  }, [isSuccess]);
  return null;
};

export default SeedData;
