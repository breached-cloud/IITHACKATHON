
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, ChevronRight } from "lucide-react";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pravaah-primary to-pravaah-secondary">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510074377623-8cf13fb86c08')] bg-cover bg-center opacity-10" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-poppins">
              <span className="block">Ready to transform your</span>
              <span className="block text-white mt-1">educational experience?</span>
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-3xl">
              Join thousands of institutions, educators, and students who are already 
              using Pravaah to create engaging learning experiences. Start your journey today.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-pravaah-primary hover:bg-white/90 font-montserrat shadow-lg transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 font-montserrat transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Schedule a demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="h-8 w-8 text-white mx-auto mb-2" />, value: "500+", label: "Institutions" },
                { icon: <Users className="h-8 w-8 text-white mx-auto mb-2" />, value: "25K+", label: "Active Users" },
                { icon: <Award className="h-8 w-8 text-white mx-auto mb-2" />, value: "15+", label: "Industry Awards" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`glass rounded-xl p-4 text-center transition-all duration-300 hover:transform hover:scale-105 cursor-pointer relative overflow-hidden ${activeCard === index ? 'ring-2 ring-white/30' : ''}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {activeCard === index && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  )}
                  <div className="relative z-10">
                    {stat.icon}
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                  {activeCard === index && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/60 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="relative lg:pl-10">
            <div 
              className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:transform hover:scale-105"
            >
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
                alt="Pravaah dashboard" 
                className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Floating UI elements */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-4 rounded-lg shadow-lg mb-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:bg-white/20">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Course Progress</h4>
                    <span className="text-white font-bold">78%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full mt-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-pravaah-accent to-green-300 transition-all duration-1000 hover:from-green-300 hover:to-pravaah-accent" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="glass p-3 rounded-lg shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-white/20 cursor-pointer">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="glass p-3 rounded-lg shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-white/20 cursor-pointer">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="glass flex-grow p-3 rounded-lg shadow-lg text-center flex items-center justify-center group transform transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer">
                    <span className="text-white text-sm">Continue Learning</span>
                    <ChevronRight className="h-4 w-4 ml-2 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
