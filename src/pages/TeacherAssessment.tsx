import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

interface TeacherFormValues {
  studentName: string;
  date: string;
  class: string;
  taskCompletion: string;
  focusImprovement: string;
  organizationImprovement: string;
  energyLevel: string;
  alertness: string;
  seatingResponse: string;
  physicalEngagement: string;
  concentrationAfterActivity: string;
}

const TeacherAssessment = () => {
const { language, setLanguage, translations } = useLanguage();
const t = translations[language];
const isRTL = language === 'he';
const { theme, toggleTheme } = useTheme();

  
  const form = useForm<TeacherFormValues>({
    defaultValues: {
      studentName: "",
      date: "",
      class: "",
      taskCompletion: "",
      focusImprovement: "",
      organizationImprovement: "",
      energyLevel: "",
      alertness: "",
      seatingResponse: "",
      physicalEngagement: "",
      concentrationAfterActivity: "",
    },
  });

  const onSubmit = (data: TeacherFormValues) => {
    console.log(data);
    toast.success(isRTL ? "שאלון נשלח בהצלחה!" : "Form submitted successfully!");
    // Here you would typically save the data to your backend
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
        </div>
        <div className="flex justify-between items-center mb-6">
        <Link
           to="/recommendations"
           className={`flex items-center text-sm text-muted-foreground hover:text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}
         >
           <ArrowLeft className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
           {isRTL ? 'חזרה להמלצות' : 'Back to Recommendations'}
         </Link>
      
         {/* ⚙️ here: language + theme toggles */}
         <div className="flex items-center space-x-4">
           <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
           <ThemeToggle isDarkMode={theme === 'dark'} onToggle={toggleTheme} />
         </div>
       </div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isRTL ? 'שאלון מורה למעקב התקדמות' : 'Teacher Progress Assessment Form'}
        </h1>
        
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem className={isRTL ? 'text-right' : ''}>
                        <FormLabel>{isRTL ? 'שם התלמיד/ה:' : 'Student Name:'}</FormLabel>
                        <FormControl>
                          <Input placeholder={isRTL ? 'שם התלמיד/ה' : 'Student Name'} {...field} className={isRTL ? 'text-right' : ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className={isRTL ? 'text-right' : ''}>
                        <FormLabel>{isRTL ? 'תאריך:' : 'Date:'}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className={isRTL ? 'text-right' : ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem className={isRTL ? 'text-right' : ''}>
                        <FormLabel>{isRTL ? 'כיתה:' : 'Class:'}</FormLabel>
                        <FormControl>
                          <Input placeholder={isRTL ? 'כיתה' : 'Class'} {...field} className={isRTL ? 'text-right' : ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className={`text-xl font-semibold pt-4 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'ביצועים אקדמיים' : 'Academic Performance'}
                </h2>
                
                {/* Task Completion */}
                <FormField
                  control={form.control}
                  name="taskCompletion"
                  render={({ field }) => (
                    <FormItem className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
                      <FormLabel>{isRTL ? 'באיזו תדירות התלמיד/ה משלים/ה משימות בזמן הנתון?' : 'How often does the student complete tasks on time?'}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="1" id="taskCompletion-1" />
                            <FormLabel htmlFor="taskCompletion-1" className="font-normal cursor-pointer">
                              {isRTL ? 'אף פעם' : 'Never'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="2" id="taskCompletion-2" />
                            <FormLabel htmlFor="taskCompletion-2" className="font-normal cursor-pointer">
                              {isRTL ? 'לעתים רחוקות' : 'Rarely'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="3" id="taskCompletion-3" />
                            <FormLabel htmlFor="taskCompletion-3" className="font-normal cursor-pointer">
                              {isRTL ? 'לפעמים' : 'Sometimes'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="4" id="taskCompletion-4" />
                            <FormLabel htmlFor="taskCompletion-4" className="font-normal cursor-pointer">
                              {isRTL ? 'לעתים קרובות' : 'Often'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="5" id="taskCompletion-5" />
                            <FormLabel htmlFor="taskCompletion-5" className="font-normal cursor-pointer">
                              {isRTL ? 'תמיד' : 'Always'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Focus Improvement */}
                <FormField
                  control={form.control}
                  name="focusImprovement"
                  render={({ field }) => (
                    <FormItem className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
                      <FormLabel>{isRTL ? 'יכולת התלמיד/ה לשמור על ריכוז במהלך השיעורים השתפרה:' : 'The student\'s ability to maintain focus during lessons has improved:'}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="1" id="focusImprovement-1" />
                            <FormLabel htmlFor="focusImprovement-1" className="font-normal cursor-pointer">
                              {isRTL ? 'מאוד לא מסכים/ה' : 'Strongly Disagree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="2" id="focusImprovement-2" />
                            <FormLabel htmlFor="focusImprovement-2" className="font-normal cursor-pointer">
                              {isRTL ? 'לא מסכים/ה' : 'Disagree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="3" id="focusImprovement-3" />
                            <FormLabel htmlFor="focusImprovement-3" className="font-normal cursor-pointer">
                              {isRTL ? 'ניטרלי/ת' : 'Neutral'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="4" id="focusImprovement-4" />
                            <FormLabel htmlFor="focusImprovement-4" className="font-normal cursor-pointer">
                              {isRTL ? 'מסכים/ה' : 'Agree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="5" id="focusImprovement-5" />
                            <FormLabel htmlFor="focusImprovement-5" className="font-normal cursor-pointer">
                              {isRTL ? 'מסכים/ה מאוד' : 'Strongly Agree'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization Improvement */}
                <FormField
                  control={form.control}
                  name="organizationImprovement"
                  render={({ field }) => (
                    <FormItem className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
                      <FormLabel>{isRTL ? 'הארגון של חומרי הלימוד וסביבת העבודה של התלמיד/ה השתפר:' : 'The organization of study materials and the student\'s work environment has improved:'}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="1" id="organizationImprovement-1" />
                            <FormLabel htmlFor="organizationImprovement-1" className="font-normal cursor-pointer">
                              {isRTL ? 'מאוד לא מסכים/ה' : 'Strongly Disagree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="2" id="organizationImprovement-2" />
                            <FormLabel htmlFor="organizationImprovement-2" className="font-normal cursor-pointer">
                              {isRTL ? 'לא מסכים/ה' : 'Disagree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="3" id="organizationImprovement-3" />
                            <FormLabel htmlFor="organizationImprovement-3" className="font-normal cursor-pointer">
                              {isRTL ? 'ניטרלי/ת' : 'Neutral'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="4" id="organizationImprovement-4" />
                            <FormLabel htmlFor="organizationImprovement-4" className="font-normal cursor-pointer">
                              {isRTL ? 'מסכים/ה' : 'Agree'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <RadioGroupItem value="5" id="organizationImprovement-5" />
                            <FormLabel htmlFor="organizationImprovement-5" className="font-normal cursor-pointer">
                              {isRTL ? 'מסכים/ה מאוד' : 'Strongly Agree'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className={`text-xl font-semibold pt-4 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'תצפיות פיזיות' : 'Physical Observations'}
                </h2>
                
                {/* Energy Level */}
                <FormField name="energyLevel" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t['teacher.energyLevel']}</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="flex items-center">
                            <RadioGroupItem value={`${i}`} id={`energyLevel-${i}`} />
                            <FormLabel htmlFor={`energyLevel-${i}`}>
                              {t[`teacher.energyLevel.option${i}`]}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                {/* Alertness */}
                <FormField
                  control={form.control}
                  name="alertness"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>התלמיד/ה נראה/ית ערני/ת ונח/ה:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="alertness-1" />
                            <FormLabel htmlFor="alertness-1" className="font-normal cursor-pointer">אף פעם</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="alertness-2" />
                            <FormLabel htmlFor="alertness-2" className="font-normal cursor-pointer">לעתים רחוקות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="alertness-3" />
                            <FormLabel htmlFor="alertness-3" className="font-normal cursor-pointer">לפעמים</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="alertness-4" />
                            <FormLabel htmlFor="alertness-4" className="font-normal cursor-pointer">לעתים קרובות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="alertness-5" />
                            <FormLabel htmlFor="alertness-5" className="font-normal cursor-pointer">תמיד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Seating Response */}
                <FormField
                  control={form.control}
                  name="seatingResponse"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>כיצד התלמיד/ה הגיב/ה למיקום הישיבה הנוכחי בכיתה?</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="seatingResponse-1" />
                            <FormLabel htmlFor="seatingResponse-1" className="font-normal cursor-pointer">משפיע לרעה על הריכוז</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="seatingResponse-2" />
                            <FormLabel htmlFor="seatingResponse-2" className="font-normal cursor-pointer">אין השפעה ניכרת</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="seatingResponse-3" />
                            <FormLabel htmlFor="seatingResponse-3" className="font-normal cursor-pointer">משפר מעט את הריכוז</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="seatingResponse-4" />
                            <FormLabel htmlFor="seatingResponse-4" className="font-normal cursor-pointer">משפר משמעותית את הריכוז</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className={`text-xl font-semibold pt-4 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'תגובה לפעילות גופנית' : 'Physical Activity Response'}
                </h2>
                
                {/* Physical Engagement */}
                <FormField
                  control={form.control}
                  name="physicalEngagement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>מעורבות בפעילויות גופניות שהוקצו:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="physicalEngagement-1" />
                            <FormLabel htmlFor="physicalEngagement-1" className="font-normal cursor-pointer">מסרב/ת להשתתף</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="physicalEngagement-2" />
                            <FormLabel htmlFor="physicalEngagement-2" className="font-normal cursor-pointer">השתתפות מינימלית</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="physicalEngagement-3" />
                            <FormLabel htmlFor="physicalEngagement-3" className="font-normal cursor-pointer">השתתפות בינונית</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="physicalEngagement-4" />
                            <FormLabel htmlFor="physicalEngagement-4" className="font-normal cursor-pointer">השתתפות טובה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="physicalEngagement-5" />
                            <FormLabel htmlFor="physicalEngagement-5" className="font-normal cursor-pointer">השתתפות מצוינת</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Concentration After Activity */}
                <FormField
                  control={form.control}
                  name="concentrationAfterActivity"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>האם התלמיד/ה הראה/תה שיפור בריכוז לאחר פעילות גופנית?</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="concentrationAfterActivity-1" />
                            <FormLabel htmlFor="concentrationAfterActivity-1" className="font-normal cursor-pointer">ללא שיפור</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="concentrationAfterActivity-2" />
                            <FormLabel htmlFor="concentrationAfterActivity-2" className="font-normal cursor-pointer">שיפור קל</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="concentrationAfterActivity-3" />
                            <FormLabel htmlFor="concentrationAfterActivity-3" className="font-normal cursor-pointer">שיפור בינוני</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="concentrationAfterActivity-4" />
                            <FormLabel htmlFor="concentrationAfterActivity-4" className="font-normal cursor-pointer">שיפור משמעותי</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6">
                  <Button type="submit" className="w-full">
                    {isRTL ? 'שלח שאלון' : 'Submit Assessment'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssessment;
