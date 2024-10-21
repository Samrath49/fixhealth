import React, { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData } from "@/types";
import { useDoctors } from "@/hooks/api/useDoctor";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Badge } from "../ui/badge";

interface Step5Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  errors: Record<string, string>;
}

const Step5: React.FC<Step5Props> = ({ formData, setFormData, errors }) => {
  const { data: doctors, isLoading } = useDoctors(formData?.city);

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
            {typeof doctors === "object" && doctors?.length <= 0 && (
              <SelectLabel>
                No doctors found for city: {formData?.city}
              </SelectLabel>
            )}
            {!isLoading &&
              doctors?.map((doctor) => (
                <SelectItem key={doctor?._id} value={doctor?._id}>
                  {doctor.name}
                  <>
                    {doctor?.expertise?.map((expertise: string, i) => (
                      <Badge variant="secondary" className="ml-2">
                        {expertise}
                      </Badge>
                    ))}
                  </>
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
