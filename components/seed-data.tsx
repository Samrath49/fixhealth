"use client";
import { useDoctors, useSeedData } from "@/hooks/api/useDoctor";
import { useEffect } from "react";

const SeedData = () => {
  const { data: doctors, isLoading } = useDoctors();
  const { mutate: seedData } = useSeedData();

  useEffect(() => {
    if (!doctors && !isLoading) {
      seedData();
    }
  }, [doctors, seedData]);
  return null;
};

export default SeedData;
