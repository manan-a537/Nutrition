
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, Settings, UserCircle, Calendar, Scale, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Sample user data
const userData = {
  name: "Alex Johnson",
  age: 32,
  height: 175,
  weight: 76,
  targetWeight: 73,
  healthConditions: ["None"],
  allergies: ["Peanuts"],
  dietaryPreference: "Omnivore",
  activityLevel: "Moderate",
  startDate: "March 15, 2023",
  daysActive: 32,
  completedMeals: 78,
  progressData: [
    { day: "Mon", weight: 76.7, calories: 1950 },
    { day: "Tue", weight: 76.5, calories: 1890 },
    { day: "Wed", weight: 76.3, calories: 2010 },
    { day: "Thu", weight: 76.4, calories: 1920 },
    { day: "Fri", weight: 76.2, calories: 1980 },
    { day: "Sat", weight: 76.0, calories: 2150 },
    { day: "Sun", weight: 76.0, calories: 2050 },
  ]
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="profile" />
      
      <main className="flex-1 container py-6 md:py-10">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-green-700">{userData.name}'s Profile</h2>
              <p className="text-muted-foreground">Manage your health profile and view your progress</p>
            </div>
            
            <Button variant="outline" className="gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center py-4">
                  <div className="relative">
                    <UserCircle size={80} className="text-green-600" />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <Label>Age</Label>
                    <span>{userData.age} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Height</Label>
                    <span>{userData.height} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Weight</Label>
                    <span className="flex items-center">
                      {userData.weight} kg
                      <ArrowDownRight size={16} className="ml-1 text-green-600" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Target Weight</Label>
                    <span>{userData.targetWeight} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Health Conditions</Label>
                    <span>{userData.healthConditions.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Allergies</Label>
                    <span>{userData.allergies.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Dietary Preference</Label>
                    <span>{userData.dietaryPreference}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Activity Level</Label>
                    <span>{userData.activityLevel}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <span>Edit Profile</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">My Progress</CardTitle>
                <CardDescription>Track your health journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weight">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="weight" className="pt-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={userData.progressData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="#4CAF50" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Card className="bg-green-50 border-green-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Current Weight</p>
                              <p className="text-2xl font-bold text-green-700">{userData.weight} kg</p>
                            </div>
                            <Scale className="text-green-600" size={24} />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-green-50 border-green-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Progress to Goal</p>
                              <p className="text-2xl font-bold text-green-700">
                                {Math.round(((userData.weight - userData.targetWeight) / 3) * 100)}%
                              </p>
                            </div>
                            <ArrowUpRight className="text-green-600" size={24} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nutrition" className="pt-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={userData.progressData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[1800, 2200]} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="calories" 
                            stroke="#FF9800" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Card className="bg-orange-50 border-orange-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Avg. Daily Calories</p>
                              <p className="text-2xl font-bold text-orange-700">
                                {Math.round(userData.progressData.reduce((sum, day) => sum + day.calories, 0) / userData.progressData.length)} kcal
                              </p>
                            </div>
                            <Calendar className="text-orange-600" size={24} />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-orange-50 border-orange-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Meals Tracked</p>
                              <p className="text-2xl font-bold text-orange-700">{userData.completedMeals}</p>
                            </div>
                            <Calendar className="text-orange-600" size={24} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Your Health Journey</CardTitle>
                <CardDescription>
                  Summary of your progress since {userData.startDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-green-50 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-green-700">{userData.daysActive}</p>
                        <p className="text-muted-foreground text-sm mt-1">Days Active</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-blue-700">{userData.completedMeals}</p>
                        <p className="text-muted-foreground text-sm mt-1">Healthy Meals</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-orange-50 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-orange-700">
                          {(userData.weight - userData.progressData[0].weight).toFixed(1)}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">kg Lost</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-purple-700">
                          {Math.round(((userData.weight - userData.targetWeight) / 3) * 100)}%
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">To Goal</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-white">
        <div className="container text-center text-muted-foreground text-sm">
          <p>MealMentor - Your AI-Powered Nutrition Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
