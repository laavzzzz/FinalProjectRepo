"use client";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { featureDetails } from "@/constants/features";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Helper to get the key from the title for data lookup
  const getFeatureKey = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/24\/7/g, '24-7');
  };

  return (
    <section id="features" className="bg-white px-5 py-24 sm:px-8 sm:py-28">
      <div id="how-it-works" className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-[#eaded4] bg-[#fff8f3] px-3 py-1 text-[#d96535]">
              The platform
            </Badge>
          </motion.div>
          
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.045em] text-[#2b211b] sm:text-4xl">
            Every handoff, made easier.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#796b61] sm:text-lg">
            Purpose-built tools help care teams spend less time chasing information and more time with people.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(featureDetails).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="group cursor-pointer"
              onClick={() => setActiveFeature(getFeatureKey(feature.title))}
            >
              <Card className="relative h-full overflow-hidden border-[#eaded4] bg-[#fffaf5] transition-all duration-200 hover:border-[#dca07f] hover:shadow-[0_14px_32px_rgba(91,55,32,0.07)]">
                
                <CardHeader className="relative z-10">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8dfd0] text-[#a74f2f] transition-colors duration-200 group-hover:bg-[#d96535] group-hover:text-white">
                    <feature.icon size={28} />
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-semibold tracking-tight text-[#2b211b]">
                      {feature.title}
                    </CardTitle>
                    <Badge variant="outline" className="bg-white text-[10px] font-bold uppercase tracking-widest text-[#9b8b80]">
                      {feature.tag}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="mb-6 leading-7 text-[#796b61]">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#d96535] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    Learn more <ArrowRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-[#2b211b]/55"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="relative bg-[#d96535] p-8 text-white md:p-12">
                <button 
                  onClick={() => setActiveFeature(null)}
                  className="absolute top-6 right-6 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  {(() => {
                    const Icon = featureDetails[activeFeature]?.icon;
                    return Icon ? <Icon size={32} /> : null;
                  })()}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-2">{featureDetails[activeFeature]?.title}</h2>
                <p className="text-lg font-medium text-white/75">{featureDetails[activeFeature]?.tagline}</p>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 md:p-12">
                <p className="mb-8 text-lg leading-relaxed text-[#796b61]">{featureDetails[activeFeature]?.content}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featureDetails[activeFeature]?.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-[#eaded4] bg-[#fff8f3] p-4 text-sm font-semibold text-[#5c4a3e]">
                      <CheckCircle2 size={18} className="text-[#d96535]" /> {feat}
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => setActiveFeature(null)}
                  className="mt-10 w-full rounded-xl bg-[#2b211b] py-5 text-lg font-bold text-white shadow-lg shadow-[#2b211b]/10 hover:bg-[#3c2d24]"
                >
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}