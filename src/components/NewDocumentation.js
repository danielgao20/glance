import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const NewDocumentation = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or state management system
    console.log({ title, category, content });
    // Reset form after submission
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">New Documentation</h1>
      <div className="flex gap-6">
        <Card className="w-1/2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              Create New Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-zinc-300 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-zinc-300 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-zinc-300 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Create Document
              </button>
            </form>
          </CardContent>
        </Card>
        <Card className="w-1/2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold text-white mb-2">
              {title || "Document Title"}
            </h2>
            {category && <Badge className="mb-4">{category}</Badge>}
            <div className="prose prose-invert">
              {content || "Your document content will appear here..."}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-zinc-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewDocumentation;
