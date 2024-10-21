import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types";

interface Step2Props {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="flex flex-col items-start gap-5">
      <Label htmlFor="age">Age</Label>
      <Input
        id="age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
        className={errors.age ? "border-red-500" : ""}
      />
      {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        className={errors.city ? "border-red-500" : ""}
      />
      {errors.city && (
        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
      )}
      <Label htmlFor="occupation">Occupation</Label>
      <Input
        id="occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleInputChange}
        className={errors.occupation ? "border-red-500" : ""}
      />
      {errors.occupation && (
        <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
      )}
      {!formData.occupation.toLowerCase().includes("housewife") &&
        !formData.occupation.toLowerCase().includes("homemaker") && (
          <div className="w-full flex flex-col items-start gap-5">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>
        )}
    </div>
  );
};

export default Step2;
