import React, { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doctor, FormData } from "@/types";
import { useDoctors } from "@/hooks/api/useDoctor";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface Step5Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  errors: Record<string, string>;
}

const Step5: React.FC<Step5Props> = ({ formData, setFormData, errors }) => {
  const { data: doctors, isLoading } = useDoctors();

  const getDoctorNameForId = (id: string): string => {
    if (!doctors || !id) return "";

    const doctor = doctors.find((doc) => doc._id === id);
    return doctor ? doctor.name : "";
  };

  const handleSelectChange = (value: string) => {
    setFormData((formData) => ({ ...formData, selectedDoctor: value }));
  };
  return (
    <div className="flex flex-col items-start gap-5">
      <Label>Select a Doctor</Label>
      <Select
        defaultValue={getDoctorNameForId(formData.selectedDoctor)}
        onValueChange={(value) => handleSelectChange(value)}
      >
        <SelectTrigger
          className={`w-full ${errors.selectedDoctor ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder="Select a doctor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {!isLoading &&
              doctors?.map((doctor) => (
                <SelectItem key={doctor?._id} value={doctor?._id}>
                  {doctor.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.selectedDoctor && (
        <p className="text-red-500 text-sm mt-1">{errors.selectedDoctor}</p>
      )}
    </div>
  );
};

export default Step5;
