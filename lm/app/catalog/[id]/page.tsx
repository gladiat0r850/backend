'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components2/navbar'

interface CarDetails {
  id: number
  name: string
  price: number
  image: string
  topSpeed: number
  acceleration: string
  power: string
  type: string
  brand: string
  specifications: {
    engine: string
    transmission: string
    drivetrain: string
    weight: string
    fuelEconomy: string
  }
  features?: string[]
}

export default function PurchasePage() {
  const { id } = useParams()
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3500/catalog`, {
          headers: {'Content-Type': 'application/json'}
        })
        if (!response.ok) {
          throw new Error('Failed to fetch car details')
        }
        const data: CarDetails[] = await response.json()
        setCarDetails(data[Number(id)])
        setLoading(false)
      } catch (err) {
        setError('Error fetching car details. Please try again later.')
        setLoading(false)
      }
    }
    fetchCarDetails()
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }
  if (!carDetails) {
    return <div className="min-h-screen flex items-center justify-center">No car details available</div>
  }

  return <>
    <div className="min-h-screen bg-background mt-16 text-foreground">
  <main className="container mx-auto px-4 py-8">
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-4 dark:text-white text-black"
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back to Catalog
    </Button>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative h-full">
        <img
          src={carDetails.image}
          alt={carDetails.name}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <div className='dark:text-white text-black'>
        <h1 className="text-3xl font-bold mb-2">{carDetails.name}</h1>
        <p className="text-2xl font-semibold text-primary mb-4">
          ${carDetails.price.toLocaleString()}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold">Brand</p>
            <p>{carDetails.brand}</p>
          </div>
          <div>
            <p className="font-semibold">Type</p>
            <p>{carDetails.type}</p>
          </div>
          <div>
            <p className="font-semibold">Top Speed</p>
            <p>{carDetails.topSpeed} mph</p>
          </div>
          <div>
            <p className="font-semibold">Acceleration</p>
            <p>{carDetails.acceleration}</p>
          </div>
          <div>
            <p className="font-semibold">Power</p>
            <p>{carDetails.power}</p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex space-x-4">
          <Button className="flex-1">Purchase Now</Button>
          <Button variant="outline" className="flex-1">
            Inquire
          </Button>
        </div>
      </div>
    </div>

    <div className=" w-1/2">
      <Card className="rounded-t-none lg:rounded-t-lg w-auto">
        <CardContent className="p-6">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="specs" className="text-lg font-semibold">Specifications</TabsTrigger>
              <TabsTrigger value="features" className="text-lg font-semibold">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="specs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(carDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm text-muted-foreground capitalize">{key}</span>
                    <span className="text-lg font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features">
              {carDetails.features && carDetails.features.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {carDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Badge variant="outline" className="p-1">
                        <Check className="h-4 w-4" />
                      </Badge>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No features available.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </main>
</div>
  </>
}