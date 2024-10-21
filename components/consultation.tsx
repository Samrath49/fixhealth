"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FormData } from "@/types";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  age: "",
  city: "",
  occupation: "",
  company: "",
  complaints: "",
  previousExperience: "",
  selectedDoctor: "",
};

const validateField = (name: string, value: string): string => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return "";
    case "phone":
      if (!value) return "Phone number is required";
      if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
      return "";
    case "age":
      if (!value) return "Age is required";
      const age = parseInt(value);
      if (isNaN(age) || age < 1 || age > 120) return "Please enter a valid age";
      return "";
    case "city":
      if (!value.trim()) return "City is required";
      if (value.length < 2) return "City must be at least 2 characters";
      return "";
    case "occupation":
      if (!value.trim()) return "Occupation is required";
      return "";
    case "company":
      if (
        !value.trim() &&
        !["housewife", "homemaker"].some((term) =>
          INITIAL_FORM_DATA.occupation.toLowerCase().includes(term)
        )
      ) {
        return "Company is required";
      }
      return "";
    case "complaints":
      if (!value.trim()) return "Chief complaints are required";
      if (value.length < 10)
        return "Please provide more detail about your complaints";
      return "";
    case "previousExperience":
      if (parseInt(INITIAL_FORM_DATA.age) >= 30 && !value) {
        return "Please select whether you have previous experience";
      }
      return "";
    case "selectedDoctor":
      if (!value) return "Please select a doctor";
      return "";
    default:
      return "";
  }
};

const Consultation = () => {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = localStorage.getItem("consultationFormData");
      return saved ? JSON.parse(saved) : INITIAL_FORM_DATA;
    }
    return INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    localStorage.setItem("consultationFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formData.city || searchParams.get("city")) {
      const cityParam = searchParams.get("city");
      const cityToUse = cityParam || formData.city;
      setFormData((prevData) => ({ ...prevData, city: cityToUse }));
    }
  }, [formData.city, searchParams]);

  const validateStep = (stepNumber: number): boolean => {
    const stepFields: Record<number, string[]> = {
      1: ["name", "phone"],
      2: ["age", "city", "occupation"],
      3: ["complaints"],
      4: ["previousExperience"],
      5: ["selectedDoctor"],
    };

    const fieldsToValidate = stepFields[stepNumber];
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Special validation for company field in step 2
    if (stepNumber === 2) {
      const needsCompany = !["housewife", "homemaker"].some((term) =>
        formData.occupation.toLowerCase().includes(term)
      );
      if (needsCompany) {
        const companyError = validateField("company", formData.company);
        if (companyError) {
          newErrors.company = companyError;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        const skipStep4 = +formData?.age < 30;
        if (skipStep4) {
          setStep(step + 2);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Clear form data and localStorage on successful submission
          localStorage.removeItem("consultationFormData");
          setFormData(INITIAL_FORM_DATA);
          setShowForm(false);
          setStep(1);
          // Show success message
          alert("Consultation booked successfully!");
        } else {
          throw new Error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to book consultation. Please try again.");
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="consult-doctor"
      className="bg-gradient-to-r from-cyan-50 to-blue-200"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          {!showForm ? (
            <>
              <h1 className="text-3xl text-gray-800 font-extrabold sm:text-5xl">
                Grab Your FREE
                <strong className="font-extrabold text-sky-500 sm:block">
                  Consultation
                </strong>
              </h1>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() => setShowForm(true)}
                >
                  Book Consultation
                </Button>
              </div>
            </>
          ) : (
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                Book Your Consultation
              </h2>
              <form className="space-y-4">
                {renderStep()}
                <div className="flex justify-between mt-2">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 5 ? (
                    <Button
                      type="button"
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Consultation;
