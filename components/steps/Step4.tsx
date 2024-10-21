import React, { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Step4Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  errors: Record<string, string>;
}

const Step4: React.FC<Step4Props> = ({ formData, setFormData, errors }) => {
  return (
    <div className="flex flex-col items-start gap-5">
      <Label>Previous Experience with Physiotherapy</Label>
      <RadioGroup
        name="previousExperience"
        value={formData.previousExperience}
        onValueChange={(value) =>
          setFormData({ ...formData, previousExperience: value })
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="yes" />
          <Label htmlFor="yes">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="no" />
          <Label htmlFor="no">No</Label>
        </div>
      </RadioGroup>
      {errors.previousExperience && (
        <p className="text-red-500 text-sm mt-1">{errors.previousExperience}</p>
      )}
    </div>
  );
};

export default Step4;
