'use client'
import React, { useState, useEffect } from 'react'
import { Slider } from '../ui/slider'
import { Card, CardContent } from '../ui/card'
import { formatPrice } from '@/lib/utils'
import ListCategory from './ListCategory'
import { parseAsInteger, useQueryState } from 'nuqs'

interface Props {
  searchCategory: string;
  categories: {
    id: string;
    name: string;
  }[];
  maxPriceCourse:number | null
}

const AmountSlider = ({ 
  maxPriceCourse=100000,
  categories,
  searchCategory,
}: Props) => {
  const [minPriceQuery, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0).withOptions({
    shallow: false
  }));

  const [maxPriceQuery, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(maxPriceCourse?maxPriceCourse+100:1000000).withOptions({
    shallow: false
  }));
  const [priceRange, setPriceRange] = useState([minPriceQuery, maxPriceQuery]);

  useEffect(() => {
    setPriceRange([minPriceQuery, maxPriceQuery]);
  }, [minPriceQuery, maxPriceQuery]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm text-gray-600">Price Range</h3>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-500">IDR</span>
              <div className="px-2 py-1 bg-gray-100 rounded-md">
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[0])}
                </span>
              </div>
              <span className="text-gray-400">-</span>
              <div className="px-2 py-1 bg-gray-100 rounded-md">
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
            </div>
          </div>

          <Slider
            defaultValue={[minPriceQuery, maxPriceQuery]}
            min={0}
            max={maxPriceCourse?maxPriceCourse:100000}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mt-2"
          />

          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>Min</span>
              <span className="font-medium">{formatPrice(minPriceQuery)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Max</span>
              <span className="font-medium">{formatPrice(maxPriceQuery)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <ListCategory searchCategory={searchCategory} categories={categories} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AmountSlider;