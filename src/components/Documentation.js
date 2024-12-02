import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Documentation = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Card
          key={index}
          className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              {item.title}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                {item.category}
              </Badge>
              <span className="text-xs text-zinc-500">
                Last updated: {item.lastUpdated}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Documentation;
