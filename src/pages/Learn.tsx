
import React from "react";
import Header from "@/components/layout/Header";
import NutritionEducation from "@/components/learning/NutritionEducation";

const Learn = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="learn" />
      
      <main className="flex-1 container py-6 md:py-10">
        <NutritionEducation />
      </main>
      
      <footer className="border-t py-6 bg-white">
        <div className="container text-center text-muted-foreground text-sm">
          <p>MealMentor - Your AI-Powered Nutrition Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
