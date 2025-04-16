
import React from "react";
import Header from "@/components/layout/Header";
import NutritionTracker from "@/components/tracking/NutritionTracker";

const Tracking = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="tracking" />
      
      <main className="flex-1 container py-6 md:py-10">
        <NutritionTracker />
      </main>
      
      <footer className="border-t py-6 bg-white">
        <div className="container text-center text-muted-foreground text-sm">
          <p>MealMentor - Your AI-Powered Nutrition Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Tracking;
