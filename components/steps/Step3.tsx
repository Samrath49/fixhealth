import React, { ChangeEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types";
import { Textarea } from "../ui/textarea";

interface Step3Props {
  formData: FormData;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  errors: Record<string, string>;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="flex flex-col items-start gap-5">
      <Label htmlFor="complaints">Chief Complaints</Label>
      <Textarea
        id="complaints"
        name="complaints"
        value={formData.complaints}
        onChange={handleInputChange}
        className={errors.complaints ? "border-red-500" : ""}
      />
      {errors.complaints && (
        <p className="text-red-500 text-sm mt-1">{errors.complaints}</p>
      )}
    </div>
  );
};

export default Step3;
