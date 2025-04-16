
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, Clock, Battery, ChevronRight, ThumbsUp } from "lucide-react";

// Sample meal plan data - in a real app this would come from an API
const SAMPLE_MEAL_PLAN = {
  breakfast: {
    name: "Vegetable Omelette with Whole Grain Toast",
    calories: 420,
    protein: 24,
    carbs: 35,
    fat: 22,
    ingredients: [
      "3 large eggs",
      "1/4 cup diced bell peppers",
      "1/4 cup diced onions",
      "1/4 cup spinach",
      "1 slice whole grain bread",
      "1 tsp olive oil",
      "Salt and pepper to taste"
    ],
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop"
  },
  lunch: {
    name: "Grilled Chicken Salad with Quinoa",
    calories: 550,
    protein: 40,
    carbs: 45,
    fat: 20,
    ingredients: [
      "150g grilled chicken breast",
      "1/2 cup cooked quinoa",
      "2 cups mixed greens",
      "1/4 cup cherry tomatoes",
      "1/4 cup cucumber",
      "1 tbsp olive oil",
      "1 tbsp balsamic vinegar",
      "Salt and pepper to taste"
    ],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop"
  },
  dinner: {
    name: "Baked Salmon with Roasted Vegetables",
    calories: 620,
    protein: 42,
    carbs: 30,
    fat: 35,
    ingredients: [
      "170g salmon fillet",
      "1 cup broccoli florets",
      "1 cup sweet potato cubes",
      "1/2 zucchini, sliced",
      "2 tbsp olive oil",
      "1 lemon, juiced",
      "2 cloves garlic, minced",
      "Salt, pepper, and herbs to taste"
    ],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop"
  },
  snacks: {
    name: "Greek Yogurt with Berries and Nuts",
    calories: 220,
    protein: 14,
    carbs: 22,
    fat: 8,
    ingredients: [
      "1 cup Greek yogurt",
      "1/4 cup mixed berries",
      "1 tbsp honey",
      "1 tbsp chopped almonds"
    ],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop"
  }
};

const MealCard = ({ meal, title, icon }: { meal: any, title: string, icon: React.ReactNode }) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {meal.calories} kcal
        </Badge>
      </div>
      <CardDescription className="line-clamp-1">
        {meal.name}
      </CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="relative h-36 w-full overflow-hidden rounded-md mb-3">
        <img
          src={meal.image}
          alt={meal.name}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <div className="font-medium">Protein</div>
          <div className="text-muted-foreground">{meal.protein}g</div>
        </div>
        <div>
          <div className="font-medium">Carbs</div>
          <div className="text-muted-foreground">{meal.carbs}g</div>
        </div>
        <div>
          <div className="font-medium">Fat</div>
          <div className="text-muted-foreground">{meal.fat}g</div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full">
        <span className="mr-1">See Recipe</span>
        <ChevronRight size={16} />
      </Button>
    </CardFooter>
  </Card>
);

const MealPlan = () => {
  const [day, setDay] = useState("today");
  const [mealPlan, setMealPlan] = useState(SAMPLE_MEAL_PLAN);
  const totalCalories = Object.values(mealPlan).reduce((sum, meal: any) => sum + meal.calories, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-700">Your Meal Plan</h2>
          <p className="text-muted-foreground">Personalized nutrition based on your health profile</p>
        </div>
        
        <div className="flex items-center p-3 bg-green-50 rounded-lg gap-2 text-green-700">
          <Battery className="h-5 w-5" />
          <div>
            <div className="font-medium">{totalCalories} kcal</div>
            <div className="text-sm">Daily total</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full" onValueChange={setDay}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="yesterday" className="animate-fade-in mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MealCard meal={mealPlan.breakfast} title="Breakfast" icon={<Coffee className="h-4 w-4" />} />
            <MealCard meal={mealPlan.lunch} title="Lunch" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.dinner} title="Dinner" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.snacks} title="Snacks" icon={<Clock className="h-4 w-4" />} />
          </div>
        </TabsContent>
        
        <TabsContent value="today" className="animate-fade-in mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MealCard meal={mealPlan.breakfast} title="Breakfast" icon={<Coffee className="h-4 w-4" />} />
            <MealCard meal={mealPlan.lunch} title="Lunch" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.dinner} title="Dinner" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.snacks} title="Snacks" icon={<Clock className="h-4 w-4" />} />
          </div>
        </TabsContent>
        
        <TabsContent value="tomorrow" className="animate-fade-in mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MealCard meal={mealPlan.breakfast} title="Breakfast" icon={<Coffee className="h-4 w-4" />} />
            <MealCard meal={mealPlan.lunch} title="Lunch" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.dinner} title="Dinner" icon={<Utensils className="h-4 w-4" />} />
            <MealCard meal={mealPlan.snacks} title="Snacks" icon={<Clock className="h-4 w-4" />} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span>Generate New Suggestions</span>
        </Button>
      </div>
    </div>
  );
};

export default MealPlan;
