
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface HealthProfileProps {
  onComplete: () => void;
}

const HealthProfile = ({ onComplete }: HealthProfileProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: 30,
    gender: "male",
    height: 170,
    weight: 70,
    activityLevel: "moderate",
    healthConditions: [] as string[],
    allergies: [] as string[],
    dietaryPreferences: "omnivore",
    weightGoal: "maintain",
  });

  const handleChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleHealthCondition = (condition: string) => {
    setProfile(prev => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(c => c !== condition)
        : [...prev.healthConditions, condition]
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-green-600">Create Your Health Profile</CardTitle>
        <CardDescription>
          Help us understand your needs to create personalized meal plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={profile.age} 
                  onChange={(e) => handleChange('age', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  value={profile.gender} 
                  onValueChange={(value) => handleChange('gender', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  value={profile.height} 
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  value={profile.weight} 
                  onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select 
                  value={profile.activityLevel} 
                  onValueChange={(value) => handleChange('activityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (physical job or 2x training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Weight Goal</Label>
                <Select 
                  value={profile.weightGoal} 
                  onValueChange={(value) => handleChange('weightGoal', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base">Health Conditions</Label>
                <p className="text-sm text-muted-foreground">
                  Select any conditions that apply to you
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {["Diabetes", "Hypertension", "Heart Disease", "High Cholesterol", 
                    "Celiac Disease", "IBS", "Lactose Intolerance", "None"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox 
                        id={condition} 
                        checked={profile.healthConditions.includes(condition)}
                        onCheckedChange={() => toggleHealthCondition(condition)}
                      />
                      <Label htmlFor={condition} className="text-sm">{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Allergies</Label>
                <p className="text-sm text-muted-foreground">
                  Select any food allergies you have
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {["Peanuts", "Tree Nuts", "Milk", "Eggs", "Fish", "Shellfish", 
                    "Wheat", "Soy", "None"].map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`allergy-${allergy}`}
                        checked={profile.allergies.includes(allergy)}
                        onCheckedChange={() => toggleAllergy(allergy)}
                      />
                      <Label htmlFor={`allergy-${allergy}`} className="text-sm">{allergy}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Dietary Preference</Label>
                <Select 
                  value={profile.dietaryPreferences} 
                  onValueChange={(value) => handleChange('dietaryPreferences', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore (eat everything)</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian (vegetarian + seafood)</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian (no meat)</SelectItem>
                    <SelectItem value="vegan">Vegan (no animal products)</SelectItem>
                    <SelectItem value="keto">Keto (low carb, high fat)</SelectItem>
                    <SelectItem value="paleo">Paleo (ancestral diet)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button 
            onClick={nextStep}
            className="bg-green-600 hover:bg-green-700"
          >
            {step < 4 ? "Next" : "Complete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthProfile;
