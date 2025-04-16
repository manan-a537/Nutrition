
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Search, BarChart2, Plus, Camera } from "lucide-react";

// Sample food database - in real app would be much larger and from an API
const SAMPLE_FOODS = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: "1 medium" },
  { id: 2, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: "100g" },
  { id: 3, name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fat: 1.8, servingSize: "1 cup cooked" },
  { id: 4, name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13, servingSize: "100g" },
  { id: 5, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, servingSize: "1 cup" },
  { id: 6, name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22, servingSize: "1 medium" },
  { id: 7, name: "Whole Wheat Bread", calories: 69, protein: 3.6, carbs: 12, fat: 1, servingSize: "1 slice" },
  { id: 8, name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.4, servingSize: "170g" }
];

// Sample logged meals
const initialLoggedMeals = [
  { 
    id: 1, 
    food: "Oatmeal with Blueberries", 
    mealType: "breakfast", 
    calories: 310, 
    protein: 12, 
    carbs: 54, 
    fat: 6, 
    time: "07:30" 
  },
  { 
    id: 2, 
    food: "Chicken Salad", 
    mealType: "lunch", 
    calories: 420, 
    protein: 35, 
    carbs: 25, 
    fat: 18, 
    time: "12:15" 
  }
];

const MealTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "breakfast":
      return <span className="text-orange-500">🍳</span>;
    case "lunch":
      return <span className="text-green-500">🥗</span>;
    case "dinner":
      return <span className="text-blue-500">🍽️</span>;
    case "snack":
      return <span className="text-purple-500">🍎</span>;
    default:
      return <span>🍽️</span>;
  }
};

const NutritionTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodResults, setFoodResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [mealType, setMealType] = useState("breakfast");
  const [loggedMeals, setLoggedMeals] = useState(initialLoggedMeals);
  const [activeTab, setActiveTab] = useState("log");

  // Calculated nutrition totals
  const dailyTotals = {
    calories: loggedMeals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: loggedMeals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: loggedMeals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: loggedMeals.reduce((sum, meal) => sum + meal.fat, 0)
  };
  
  // Sample daily targets - would be calculated based on user profile
  const dailyTargets = {
    calories: 2000,
    protein: 150,
    carbs: 225,
    fat: 65
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    
    // Simple search through our sample data
    const results = SAMPLE_FOODS.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFoodResults(results);
  };

  const selectFood = (food: any) => {
    setSelectedFood(food);
    setFoodResults([]);
  };

  const logFood = () => {
    if (!selectedFood) return;
    
    const newMeal = {
      id: Date.now(),
      food: selectedFood.name,
      mealType,
      calories: selectedFood.calories,
      protein: selectedFood.protein,
      carbs: selectedFood.carbs,
      fat: selectedFood.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setLoggedMeals([...loggedMeals, newMeal]);
    setSelectedFood(null);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-green-700">Nutrition Tracker</h2>
        <p className="text-muted-foreground">Log your meals and monitor your nutrition intake</p>
      </div>

      <Tabs defaultValue="log" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="log">Log Food</TabsTrigger>
          <TabsTrigger value="summary">Daily Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Add Food</CardTitle>
              <CardDescription>
                Search for a food item or use voice/camera input
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-9"
                  />
                  <Search 
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
                    onClick={handleSearch}
                  />
                </div>
                <Button variant="outline" className="px-3">
                  <Camera className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-3">
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
              
              {foodResults.length > 0 && (
                <div className="border rounded-md mb-4 max-h-48 overflow-y-auto">
                  {foodResults.map((food) => (
                    <div 
                      key={food.id}
                      className="p-2 hover:bg-muted cursor-pointer flex justify-between items-center border-b last:border-0"
                      onClick={() => selectFood(food)}
                    >
                      <div>
                        <div className="font-medium">{food.name}</div>
                        <div className="text-sm text-muted-foreground">{food.servingSize}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{food.calories} cal</div>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedFood && (
                <div className="border rounded-md p-3 mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{selectedFood.name}</div>
                    <div>{selectedFood.calories} cal</div>
                  </div>
                  <div className="grid grid-cols-3 text-sm mb-3">
                    <div>
                      <div className="font-medium">Protein</div>
                      <div className="text-muted-foreground">{selectedFood.protein}g</div>
                    </div>
                    <div>
                      <div className="font-medium">Carbs</div>
                      <div className="text-muted-foreground">{selectedFood.carbs}g</div>
                    </div>
                    <div>
                      <div className="font-medium">Fat</div>
                      <div className="text-muted-foreground">{selectedFood.fat}g</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label htmlFor="meal-type">Meal Type</Label>
                      <Select value={mealType} onValueChange={setMealType}>
                        <SelectTrigger id="meal-type">
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="self-end bg-green-600 hover:bg-green-700" onClick={logFood}>Add</Button>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Today's Food Log</h3>
                {loggedMeals.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No meals logged today
                  </div>
                ) : (
                  <div className="border rounded-md divide-y">
                    {loggedMeals.map((meal) => (
                      <div key={meal.id} className="p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <MealTypeIcon type={meal.mealType} />
                          <div>
                            <div className="font-medium">{meal.food}</div>
                            <div className="text-sm text-muted-foreground">{meal.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{meal.calories} cal</div>
                          <div className="text-xs text-muted-foreground">
                            P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Daily Nutrition Summary</CardTitle>
              <CardDescription>
                Your progress toward daily nutrition goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label>Calories</Label>
                  <span className="text-sm text-muted-foreground">
                    {dailyTotals.calories} / {dailyTargets.calories} kcal
                  </span>
                </div>
                <Progress 
                  value={(dailyTotals.calories / dailyTargets.calories) * 100} 
                  className="h-2.5 bg-orange-100"
                />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label>Protein</Label>
                  <span className="text-sm text-muted-foreground">
                    {dailyTotals.protein} / {dailyTargets.protein}g
                  </span>
                </div>
                <Progress 
                  value={(dailyTotals.protein / dailyTargets.protein) * 100} 
                  className="h-2.5 bg-red-100"
                />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label>Carbohydrates</Label>
                  <span className="text-sm text-muted-foreground">
                    {dailyTotals.carbs} / {dailyTargets.carbs}g
                  </span>
                </div>
                <Progress 
                  value={(dailyTotals.carbs / dailyTargets.carbs) * 100} 
                  className="h-2.5 bg-green-100"
                />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label>Fat</Label>
                  <span className="text-sm text-muted-foreground">
                    {dailyTotals.fat} / {dailyTargets.fat}g
                  </span>
                </div>
                <Progress 
                  value={(dailyTotals.fat / dailyTargets.fat) * 100} 
                  className="h-2.5 bg-blue-100"
                />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Macronutrient Breakdown</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Protein</div>
                    <div className="font-medium text-lg text-red-700">
                      {Math.round((dailyTotals.protein * 4 / dailyTotals.calories) * 100)}%
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Carbs</div>
                    <div className="font-medium text-lg text-green-700">
                      {Math.round((dailyTotals.carbs * 4 / dailyTotals.calories) * 100)}%
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Fat</div>
                    <div className="font-medium text-lg text-blue-700">
                      {Math.round((dailyTotals.fat * 9 / dailyTotals.calories) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4 gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>View Detailed Reports</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionTracker;
