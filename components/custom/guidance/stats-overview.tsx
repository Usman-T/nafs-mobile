"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Flame } from "lucide-react";

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: "Day Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "#fe8019",
    },
    {
      label: "Saved Verses",
      value: stats.savedVerses,
      icon: Bookmark,
      color: "#fabd2f",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {statItems.map((stat, index) => (
        <div key={stat.label}>
          <Card className="bg-[#282828] border-[#3c3836] relative overflow-hidden group hover:border-[#504945] transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-[#ebdbb2]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#a89984]">{stat.label}</p>
                </div>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon
                    className="h-4 w-4"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
