import { Sparkles } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustration: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  illustration,
}) => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 ">
      <div className="bg-blue-50 hidden lg:flex items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-blue-700 font-bold text-5xl mb-6">EPlanner</h1>
          {/* <h2 className="text-2xl font-bold text-blue-400 mb-4">SignIn</h2> */}
          <p className="text-gray-600 leading-relaxed">
            Smart tools to handle guests, venues, and reminders.
          </p>
          <img
            src={illustration}
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className=" w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Sparkles className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
