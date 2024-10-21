export interface Doctor {
  _id: string;
  name: string;
  expertise: string[];
  city: string;
  availability: boolean;
  experience: number;
}

export interface Booking {
  name: string;
  phoneNumber: string;
  age: number;
  city: string;
  occupation: string;
  company?: string;
  chiefComplaints: string[];
  previousPhysioExperience?: boolean;
  selectedDoctor?: string;
}

export interface FormData {
  name: string;
  phone: string;
  age: string;
  city: string;
  occupation: string;
  company: string;
  complaints: string;
  previousExperience: string;
  selectedDoctor: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
