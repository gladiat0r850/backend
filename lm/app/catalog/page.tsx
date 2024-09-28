'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { X, Filter } from 'lucide-react'
import Navbar from '@/components2/navbar'

interface Cars {
  id: number;
  name: string;
  price: number;
  image: string;
  topSpeed: number;
  acceleration: string;
  power: string;
  type: string;
  brand: string;
}

interface Filters {
  search: string;
  brand: string;
  type: string;
  priceRange: [number, number];
  topSpeed: number;
}

export default function CatalogPage() {
  const [supercars, setSupercars] = useState<Cars[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    brand: 'all',
    type: 'all',
    priceRange: [0, 4000000],
    topSpeed: 150,
  })

  useEffect(() => {
    const fetchSupercars = async () => {
      try {
        const response = await fetch('http://localhost:3500/catalog')
        if (!response.ok) {
          throw new Error('Failed to fetch supercars')
        }
        const data: Cars[] = await response.json()
        setSupercars(data)
      } catch (error) {
        console.error('Error fetching supercars:', error)
      }
    }
    fetchSupercars()
  }, [])

  const filteredSupercars = supercars.filter(car => 
    car.name?.toLowerCase().includes(filters.search?.toLowerCase()) &&
    (filters.brand === 'all' || car.brand === filters.brand) &&
    (filters.type === 'all' || car.type === filters.type) &&
    car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1] &&
    car.topSpeed >= filters.topSpeed
  )

  const handleFilterChange = (key: keyof Filters, value: string | number | [number, number]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const brands = Array.from(new Set(supercars.map(car => car.brand)))
  const types = Array.from(new Set(supercars.map(car => car.type)))

  return (
    <div className="min-h-screen mt-16 items-center bg-background flex flex-col">
      <div className="flex flex-1">
        {isFilterOpen && (
          <aside className="w-64 bg-card text-card-foreground shadow-lg fixed h-[calc(100vh-4rem)] top-16 left-0 overflow-y-auto p-4 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <X onClick={() => setIsFilterOpen(false)} className='cursor-pointer'/>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search supercars..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price Range</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-1/2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="topSpeed">Minimum Top Speed: {filters.topSpeed} mph</Label>
                <Slider
                  id="topSpeed"
                  min={150}
                  max={300}
                  step={10}
                  value={[filters.topSpeed]}
                  onValueChange={(value) => handleFilterChange('topSpeed', value[0])}
                  className='mt-2'
                />
              </div>
            </div>
          </aside>
        )}

        <main className={`flex-1 ${isFilterOpen ? 'ml-64' : ''} transition-all duration-300`}>
          <header className="bg-card text-card-foreground py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Catalog</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-label="Toggle filters"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSupercars.map((car, index) => (
                <Card key={car.id} className="overflow-hidden w-4/5 sm:w-full bg-card border-none">
                  <CardHeader className="p-0">
                    <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl mb-2">{car.name}</CardTitle>
                    <p className="text-2xl font-bold mb-4">${car.price.toLocaleString()}</p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-semibold">Brand</p>
                        <p>{car.brand}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Type</p>
                        <p>{car.type}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Top Speed</p>
                        <p>{car.topSpeed} mph</p>
                      </div>
                      <div>
                        <p className="font-semibold">Acceleration</p>
                        <p>{car.acceleration}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Power</p>
                        <p>{car.power}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link className="w-full" href={`/catalog/${index}`}>
                      <Button className='w-full'>View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}