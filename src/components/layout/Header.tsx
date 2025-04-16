
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, BookOpen, BarChart2, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  currentPage: string;
}

const Header = ({ currentPage }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  const NavItems = () => (
    <>
      <Link to="/" className={`font-medium ${currentPage === "home" ? "text-green-600" : "text-gray-600 hover:text-green-500"} transition-colors`}>
        <div className="flex items-center gap-2">
          <Coffee size={18} />
          <span>Meal Plans</span>
        </div>
      </Link>
      <Link to="/tracking" className={`font-medium ${currentPage === "tracking" ? "text-green-600" : "text-gray-600 hover:text-green-500"} transition-colors`}>
        <div className="flex items-center gap-2">
          <BarChart2 size={18} />
          <span>Tracking</span>
        </div>
      </Link>
      <Link to="/learn" className={`font-medium ${currentPage === "learn" ? "text-green-600" : "text-gray-600 hover:text-green-500"} transition-colors`}>
        <div className="flex items-center gap-2">
          <BookOpen size={18} />
          <span>Learn</span>
        </div>
      </Link>
      <Link to="/profile" className={`font-medium ${currentPage === "profile" ? "text-green-600" : "text-gray-600 hover:text-green-500"} transition-colors`}>
        <div className="flex items-center gap-2">
          <User size={18} />
          <span>Profile</span>
        </div>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="MealMentor Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-green-600">MealMentor</span>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex md:gap-6">
            <NavItems />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
