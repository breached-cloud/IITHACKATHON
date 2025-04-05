
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "./components/SectionTitle";
import BookViewer from "@/components/3D/BookViewer";
import ThreeJsViewer from "@/components/3D/ThreeJsViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, BookOpen, Target, LineChart, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PersonalizedLearningSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const cardItems = [
    {
      icon: <Brain className="h-7 w-7 text-blue-600 dark:text-blue-400" />,
      title: "Adaptive Learning Paths",
      description: "Our AI analyzes your learning patterns and adjusts content difficulty to optimize your progress.",
      bgClass: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
      borderClass: "border-blue-200 dark:border-blue-800",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
      hoverClass: "hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.3)]",
      color: "#3b82f6"
    },
    {
      icon: <Target className="h-7 w-7 text-green-600 dark:text-green-400" />,
      title: "Personalized Goals",
      description: "Set custom learning objectives and receive tailored content to help you achieve them efficiently.",
      bgClass: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20",
      borderClass: "border-green-200 dark:border-green-800",
      iconBgClass: "bg-green-100 dark:bg-green-900/30",
      hoverClass: "hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]",
      color: "#10b981"
    },
    {
      icon: <LineChart className="h-7 w-7 text-purple-600 dark:text-purple-400" />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with detailed analytics that highlight strengths and improvement areas.",
      bgClass: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
      borderClass: "border-purple-200 dark:border-purple-800",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      hoverClass: "hover:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)]",
      color: "#8b5cf6"
    }
  ];
  
  return (
    <div className="py-20 bg-gradient-to-b from-white via-blue-50/50 to-gray-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -right-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="Personalized Learning Experience"
          description="Discover how our platform adapts to your learning style and pace to deliver a tailored educational journey."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <motion.div 
            className="lg:col-span-1 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <BookViewer 
              title="Interactive Learning Materials" 
              description="Engage with content that responds to your interactions, making learning dynamic and effective."
              ctaText="Try It Now" 
              ctaAction={() => navigate("/courses")}
            />
          </motion.div>
          
          <div className="space-y-6">
            {cardItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: `0 20px 25px -5px ${item.color}30, 0 8px 10px -6px ${item.color}30`
                }}
              >
                <Card 
                  className={`overflow-hidden ${item.bgClass} dark:bg-gray-800/90 backdrop-blur-sm shadow-lg transition-all duration-300 border ${item.borderClass} dark:border-gray-700/50 ${activeCard === index ? `ring-2 ring-offset-2 ring-${item.color}` : ''}`}
                  style={{
                    boxShadow: activeCard === index ? `0 0 0 2px ${item.color}30` : ''
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`${item.iconBgClass} p-4 rounded-xl border ${item.borderClass} dark:border-gray-700/50 shadow-sm`}>
                        {item.icon}
                        {activeCard === index && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-16">
                      {item.description}
                    </p>
                    {activeCard === index && (
                      <motion.div 
                        className="mt-4 ml-16"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-xs font-medium group"
                          style={{ color: item.color }}
                          onClick={() => navigate("/courses")}
                        >
                          Learn more 
                          <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Card className="h-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 relative group hover:shadow-2xl transition-all duration-500 border-0">
              <div className="absolute top-0 right-0 w-48 h-48 -mt-10 -mr-10">
                <ThreeJsViewer 
                  type="abstract"
                  color="#3b82f6"
                  className="bg-transparent"
                  height="100%"
                  interactive={true}
                />
              </div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Your Learning Journey</h3>
                  <Sparkles className="ml-2 h-5 w-5 text-yellow-500" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
                      text: "Courses tailored to your learning style"
                    },
                    {
                      icon: <Target className="h-5 w-5 text-green-500" />,
                      text: "Custom-paced modules based on your progress" 
                    },
                    {
                      icon: <LineChart className="h-5 w-5 text-purple-500" />,
                      text: "Real-time feedback and improvement suggestions"
                    },
                    {
                      icon: <Brain className="h-5 w-5 text-indigo-500" />,
                      text: "AI-powered content recommendations" 
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3 bg-white/40 dark:bg-gray-700/40 p-3 rounded-lg transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-700/60 transform hover:-translate-x-1 border border-white/50 dark:border-gray-600/30 shadow-sm"
                      whileHover={{ x: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white group shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate("/courses")}
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                {/* Decorative element */}
                <div className="absolute bottom-4 left-4 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 2" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="50" cy="50" r="5" fill="#3b82f6" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedLearningSection;
