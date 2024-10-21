import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function MainBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-cyan-200 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between pt-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800">Doctor</span>
              <br />
              <span className="text-sky-500">Consultation.</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Connect instantly with a 24x7 specialist or choose to video visit
              a particular doctor.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                Consult Now
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="flex md:pt-20">
              <Image
                src="/assets/doctor_banner.webp"
                alt="Doctor"
                width={320}
                height={320}
                className="w-64 h-96 md:w-[500px] md:h-[640px] object-cover mx-auto"
              />
            </div>
            <Card className="absolute bottom-32 left-0 md:bottom-72 md:left-10 p-4 bg-gray-700/40 backdrop-blur-lg rounded-xl shadow-xl shadow-background/30 border-none">
              <div className="flex items-center space-x-2">
                <Heart className="text-sky-500" />
                <span className="font-semibold text-white">
                  Regular Checkup
                </span>
              </div>
            </Card>

            <Card className="absolute bottom-5 md:bottom-20 right-0 p-4 bg-gray-700/40 backdrop-blur-lg rounded-xl shadow-xl shadow-background/30 border-none">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">😊</span>
                <div>
                  <p className="font-semibold text-white">84k+</p>
                  <p className="text-sm text-gray-300">Happy Patients</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
