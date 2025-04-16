
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Heart, Award, Apple, Coffee } from "lucide-react";

// Sample educational content
const EDUCATIONAL_CONTENT = [
  {
    id: 1,
    title: "Understanding Macronutrients",
    category: "basics",
    description: "Learn how proteins, carbs, and fats affect your body",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Nutrition for Diabetes Management",
    category: "conditions",
    description: "Dietary strategies to help manage blood sugar levels",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Building a Balanced Plate",
    category: "basics",
    description: "Simple guidelines for creating nutritionally complete meals",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&auto=format&fit=crop",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Heart-Healthy Eating Patterns",
    category: "conditions",
    description: "Foods and habits to support cardiovascular health",
    image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=600&auto=format&fit=crop",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Understanding Food Labels",
    category: "basics",
    description: "How to decode nutrition information on packaged foods",
    image: "https://images.unsplash.com/photo-1575218823251-f9d243b6f720?w=600&auto=format&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Anti-Inflammatory Foods",
    category: "conditions",
    description: "Dietary approaches to reduce chronic inflammation",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop",
    readTime: "8 min read",
  },
];

// Featured tips
const NUTRITION_TIPS = [
  {
    id: 1,
    text: "Aim for at least 5 servings of fruits and vegetables daily",
    icon: <Apple className="text-green-600" size={20} />,
  },
  {
    id: 2,
    text: "Stay hydrated by drinking water before, during and after meals",
    icon: <Coffee className="text-blue-600" size={20} />,
  },
  {
    id: 3,
    text: "Include protein with each meal to maintain muscle and feel fuller longer",
    icon: <Award className="text-orange-600" size={20} />,
  },
  {
    id: 4,
    text: "Choose whole grains over refined carbohydrates for better nutrition",
    icon: <Heart className="text-red-600" size={20} />,
  },
];

const ArticleCard = ({ article }: { article: any }) => (
  <Card className="h-full overflow-hidden">
    <div className="relative h-40 w-full overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="object-cover w-full h-full transition-transform hover:scale-105"
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
          {article.category === "basics" ? "Nutrition Basics" : "Health Conditions"}
        </div>
        <div className="text-xs text-muted-foreground">{article.readTime}</div>
      </div>
      <CardTitle className="text-lg line-clamp-1">{article.title}</CardTitle>
      <CardDescription className="line-clamp-2">{article.description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 gap-1">
        Read Article
        <ArrowRight size={16} />
      </Button>
    </CardFooter>
  </Card>
);

const NutritionEducation = () => {
  const [category, setCategory] = React.useState("all");
  
  const filteredArticles = category === "all" 
    ? EDUCATIONAL_CONTENT 
    : EDUCATIONAL_CONTENT.filter(article => article.category === category);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-green-700">Nutrition Education</h2>
        <p className="text-muted-foreground">Learn about healthy eating and nutrition science</p>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-green-700">Daily Nutrition Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 items-center">
            {NUTRITION_TIPS[Math.floor(Math.random() * NUTRITION_TIPS.length)].icon}
            <p className="text-green-800 font-medium">
              {NUTRITION_TIPS[Math.floor(Math.random() * NUTRITION_TIPS.length)].text}
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="all" onValueChange={setCategory}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Articles</TabsTrigger>
              <TabsTrigger value="basics">Nutrition Basics</TabsTrigger>
              <TabsTrigger value="conditions">Health Conditions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="basics" className="mt-0 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="conditions" className="mt-0 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NutritionEducation;
