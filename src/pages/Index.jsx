import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { navItems } from '../nav-items';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Workflow Sculptor</h1>
        <p className="text-xl text-gray-600 mb-8">Build and execute your workflows with ease</p>
        <div className="space-y-4">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button className="w-full">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;