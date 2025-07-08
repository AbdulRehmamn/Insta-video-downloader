import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Download, Zap, Shield } from "lucide-react";

const FeatureGrid = () => {
  const features = [
    {
      icon: Instagram,
      title: "Multi-Platform Support",
      description: "Download from Instagram Reels, Stories, and TikTok videos",
      color: "text-pink-600"
    },
    {
      icon: Download,
      title: "High Quality Downloads",
      description: "Get videos in the best available quality",
      color: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick video processing and instant downloads",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "No personal data stored, completely safe to use",
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 text-center space-y-4">
            <feature.icon className={`w-12 h-12 mx-auto ${feature.color}`} />
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureGrid;