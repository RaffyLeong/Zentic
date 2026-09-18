"use client";

import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ReactSlider from 'react-slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FilterPanelProps {
    onApply: (filters: any) => void;
}

export function FilterPanel({ onApply }: FilterPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [propertyType, setPropertyType] = useState('Any');
    const [radius, setRadius] = useState('This area only');
    const [addedTime, setAddedTime] = useState('Anytime');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [beds, setBeds] = useState(0);
    const [baths, setBaths] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            onApply({
                propertyType,
                radius,
                addedTime,
                minPrice,
                maxPrice,
                beds,
                baths
            })
        }, 300);
        return () => clearTimeout(timer);
    }, [propertyType, radius, addedTime, minPrice, maxPrice, beds, baths]);


    return (
        <div className="w-full">
            {/* The Filter Button */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 font-bold hover:bg-primary hover:border-primary">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
            </div>

            {/* The Dropdown Panel */}
            {isOpen && (
                <div className="bg-muted p-6 rounded-lg border border-border mb-6 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Property Type */}
                        <div className="space-y-2">
                            <Label htmlFor="propertyType">Property Type</Label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                                <option>Any</option>
                                <option>House</option>
                                <option>Flat</option>
                                <option>Bungalow</option>
                                <option>Land</option>
                                <option>Commercial Property</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Search radius */}
                        <div className="space-y-2">
                            <Label htmlFor="radius">Search Radius</Label>
                            <select
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                                <option>This area only</option>
                                <option>within 1 mile</option>
                                <option>within 5 miles</option>
                                <option>within 10 miles</option>
                                <option>within 25 miles</option>
                                <option>within 50 miles</option>
                            </select>
                        </div>

                        {/* Added Time */}
                        <div className="space-y-2">
                            <Label htmlFor="addedTime">Added Time</Label>
                            <select
                                value={addedTime}
                                onChange={(e) => setAddedTime(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                                <option>Any</option>
                                <option>Last 24 hours</option>
                                <option>Last 3 days</option>
                                <option>Last 7 days</option>
                                <option>Last 14 days</option>
                                <option>Last 30 days</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <Label>Price range (£)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                                    placeholder="No min"
                                    className="w-full"
                                />
                                <span>-</span>
                                <Input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                                    placeholder="No max"
                                    className="w-full"
                                />
                            </div>
                            {/* A simple visual representation of the range */}
                            <ReactSlider
                                className="w-full h-6 flex items-center mt-2"
                                thumbClassName="w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary/50"
                                trackClassName="h-1.5 bg-border rounded-full"
                                min={0}
                                max={1000000}
                                step={10000}
                                value={[minPrice, maxPrice]}
                                onChange={([min, max]) => {
                                    setMinPrice(min);
                                    setMaxPrice(max);
                                }}
                                pearling
                                minDistance={10000}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>£{minPrice.toLocaleString('en-GB')}</span>
                                <span>£{maxPrice.toLocaleString('en-GB')}</span>
                            </div>
                        </div>

                        {/* Bedroom */}
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <select
                                value={beds}
                                onChange={(e) => setBeds(Number(e.target.value))}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5+</option>
                            </select>
                        </div>
                        {/* Bathroom */}
                        <div className="space-y-2">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <select
                                value={baths}
                                onChange={(e) => setBaths(Number(e.target.value))}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5+</option>
                            </select>
                        </div>
                    </div>



                </div>
            )}
        </div>
    )
}