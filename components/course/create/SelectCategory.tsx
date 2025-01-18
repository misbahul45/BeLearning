import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
  selectedCategory: { id:string, name:string } | null;
  setSelectedCategory:React.Dispatch<React.SetStateAction<{ id:string, name:string } | null>>
}

const SelectCategory = ({ categories, selectedCategory, setSelectedCategory }: Props) => {

  return (
    <div className="w-full mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between font-normal hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {selectedCategory?.name || 'Select Category'}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-trigger-width)] max-h-[300px] overflow-y-auto">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSelectedCategory({ id: category.id, name: category.name })}
            >
              <span className="text-sm">{category.name}</span>
              {selectedCategory?.name === category.name && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectCategory;