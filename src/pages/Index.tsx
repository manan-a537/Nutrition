
import { useState } from "react";
import Header from "@/components/layout/Header";
import HealthProfile from "@/components/profile/HealthProfile";
import MealPlan from "@/components/meals/MealPlan";

const Index = () => {
  const [profileComplete, setProfileComplete] = useState(false);
  const [currentPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={currentPage} />
      
      <main className="flex-1 container py-6 md:py-10">
        {!profileComplete ? (
          <HealthProfile onComplete={() => setProfileComplete(true)} />
        ) : (
          <MealPlan />
        )}
      </main>
      
      <footer className="border-t py-6 bg-white">
        <div className="container text-center text-muted-foreground text-sm">
          <p>MealMentor - Your AI-Powered Nutrition Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
