'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Cars {
  id: number
  name: string
  price: number
  image: string
  brand: string
  type: string
  topSpeed: number
  acceleration: string
  power: string
  description: string
  features: string[]
  specifications: {
    engine: string
    transmission: string
    drivetrain: string
    weight: string
    fuelEconomy: string
  }
}

const engineOptions = ['V6', 'V8', 'V10', 'V12', 'W16', 'Electric']
const brandOptions = ['Ferrari', 'Lamborghini', 'Porsche', 'McLaren', 'Bugatti', 'Koenigsegg', 'Pagani', 'Toyota', 'Mercedes', 'Mitsubishi', 'BMW', 'Nissan', 'Bentley']
const typeOptions = ['Sports Car', 'Supercar', 'Hypercar', 'Electric Supercar', 'Luxury', 'Cobalt']

export default function AdminPanel() {
  const [cars, setCars] = useState<Cars[]>([])
  const [newCar, setNewCar] = useState<Partial<Cars>>({
    features: [],
    specifications: {
      engine: '',
      transmission: '',
      drivetrain: '',
      weight: '',
      fuelEconomy: ''
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3500/catalog')
      if (!response.ok) {
        throw new Error('Failed to fetch cars')
      }
      const data = await response.json()
      setCars(data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching cars. Please try again later.')
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCar(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'engine') {
      setNewCar(prev => ({
        ...prev,
        specifications: { 
          ...prev.specifications, 
          [name]: value || ''  // Fallback to an empty string
        }
      }))
    } else {
      setNewCar(prev => ({ 
        ...prev, 
        [name]: value || ''  // Fallback to an empty string
      }))
    }
  }
  
  const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCar(prev => ({
      ...prev,
      specifications: { 
        ...prev.specifications, 
        [name]: value || ''  // Fallback to an empty string
      }
    }))
  }
  

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(newCar.features || [])]
    newFeatures[index] = value
    setNewCar(prev => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setNewCar(prev => ({ ...prev, features: [...(prev.features || []), ''] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3500/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      })
      if (!response.ok) {
        throw new Error('Failed to add car')
      }
      toast.success('Car added successfully!')
      setNewCar({
        features: [],
        specifications: {
          engine: '',
          transmission: '',
          drivetrain: '',
          weight: '',
          fuelEconomy: ''
        }
      })
      fetchCars()
    } catch (err) {
      toast.error('Error adding car. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3500/catalog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      toast.success('Car deleted successfully!');
      setCars(cars.filter(car => car.id === id))
    } catch (err) {
      toast.error('Error deleting the vehicle. Try again.');
    }
}
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-background mt-16 p-8">
      <ToastContainer />
      <Tabs defaultValue="post" className="space-y-4">
        <TabsList>
          <TabsTrigger value="post">Add New Car</TabsTrigger>
          <TabsTrigger value="delete">Delete Car</TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <Card>
            <CardHeader>
              <CardTitle>Add New Car</CardTitle>
              <CardDescription>Enter the details of the new car to add to the catalog.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Car Name</Label>
                    <Input id="name" name="name" onChange={handleInputChange} value={newCar.name || ''} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" onChange={handleInputChange} value={newCar.price || ''} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" name="image" onChange={handleInputChange} value={newCar.image || ''} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select onValueChange={(value) => handleSelectChange('brand', value)} value={newCar.brand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brandOptions.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={(value) => handleSelectChange('type', value)} value={newCar.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topSpeed">Top Speed</Label>
                    <Input id="topSpeed" name="topSpeed" type="number" onChange={handleInputChange} value={newCar.topSpeed || ''} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acceleration">Acceleration</Label>
                    <Input id="acceleration" name="acceleration" onChange={handleInputChange} value={newCar.acceleration || ''} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="power">Power</Label>
                    <Input id="power" name="power" onChange={handleInputChange} value={newCar.power || ''} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" onChange={handleInputChange} value={newCar.description || ''} required />
                </div>
                <div className="flex gap-5 items-center">
                  <Label>Features</Label>
                  {newCar.features?.map((feature, index) => (
                    <Input
                      key={index}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>Add Feature</Button>
                </div>
                <div className="space-y-2">
                  <Label>Specifications</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="engine">Engine</Label>
                      <Select onValueChange={(value) => handleSelectChange('engine', value)} value={newCar.specifications?.engine}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select engine" />
                        </SelectTrigger>
                        <SelectContent>
                          {engineOptions.map((engine) => (
                            <SelectItem key={engine} value={engine}>{engine}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <Input id="transmission" name="transmission" onChange={handleSpecificationChange} value={newCar.specifications?.transmission || ''} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drivetrain">Drivetrain</Label>
                      <Input id="drivetrain" name="drivetrain" onChange={handleSpecificationChange} value={newCar.specifications?.drivetrain || ''} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input id="weight" name="weight" onChange={handleSpecificationChange} value={newCar.specifications?.weight || ''} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelEconomy">Fuel Economy</Label>
                      <Input id="fuelEconomy" name="fuelEconomy" onChange={handleSpecificationChange} value={newCar.specifications?.fuelEconomy || ''} required />
                    </div>
                  </div>
                </div>
                <Button type="submit">Add Car</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete">
          <Card>
            <CardHeader>
              <CardTitle>Delete Car</CardTitle>
              <CardDescription>Select a car to remove from the catalog.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>{car.id}</TableCell>
                      <TableCell>{car.name}</TableCell>
                      <TableCell>{car.brand}</TableCell>
                      <TableCell>${car.price?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(car.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}