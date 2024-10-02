import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShoppingCart, ChevronRight, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Cars {
  id: number,
  name: string,
  price: number,
  image: string,
  topSpeed: string,
  acceleration: string,
  power: string
}
import Link from 'next/link'

export function Header() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="https://videos.pexels.com/video-files/7727416/7727416-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 bg-black bg-opacity-50 h-full w-full flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4 text-white">Experience Ultimate Performance</h1>
              <p className="text-xl mb-8 text-white">Velocity Exotics offers a premium selection of the world's most exclusive supercars, combining luxury, performance, and personalized service to deliver an unmatched buying experience for discerning car enthusiasts.</p>
              <Link href='/catalog'>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function SupercarStore() {
  return (
    <div className="w-full bg-[#151515] bg-background">
      <Header />
      <main className="w-full px-0 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-black font-bold mb-8">Featured Supercars</h2>
        <ProductGrid />
        <DescriptionService />
      </main>
    </div>
  )
}
async function ProductGrid() {
  const Data = await fetch('http://localhost:3500/catalog')
  const products = await Data.json()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(20,26).map((product: Cars) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
            <p className="text-2xl font-bold text-primary mb-4">${product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="font-semibold">Top Speed</p>
                <p>{product.topSpeed}</p>
              </div>
              <div>
                <p className="font-semibold">Acceleration</p>
                <p>{product.acceleration}</p>
              </div>
              <div>
                <p className="font-semibold">Power</p>
                <p>{product.power}</p>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-4">
            <Link className='w-full' href={`/catalog/${product.id - 1}`}><Button className="w-full">Add to Cart</Button></Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const testimonials = [
  {
    id: 1,
    name: 'James Anderson',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'CEO, Tech Innovations',
    content: 'Velocity Exotics provided an unparalleled buying experience. Their attention to detail and knowledge of supercars is impressive. I couldn\'t be happier with my new LaFerrari!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Professional Race Car Driver',
    content: 'As someone who lives and breathes high-performance cars, I can confidently say that Velocity Exotics stands out. Their selection is top-notch, and the personalized service is second to none.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Robert Müller',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Luxury Car Collector',
    content: 'I\'ve purchased several vehicles from Velocity Exotics, and each experience has been exceptional. Their passion for supercars shines through in every interaction.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Elena Rossi',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Entrepreneur',
    content: 'The team at Velocity Exotics made my dream of owning a Bugatti Chiron a reality. Their expertise and commitment to customer satisfaction are truly commendable.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Alexander Petrov',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Investment Banker',
    content: 'Velocity Exotics offers a curated selection of the world\'s finest automobiles. Their professionalism and attention to detail throughout the buying process were impeccable.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Olivia Thompson',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Luxury Lifestyle Blogger',
    content: 'From the moment I stepped into Velocity Exotics, I knew I was in for a treat. The showroom, the cars, and the service are all simply exquisite. A true 5-star experience!',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white">
      <header className="w-full bg-primary text-primary-foreground py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">What Our Customers Say</h1>
          <p className="text-xl mt-4">Hear from the discerning enthusiasts who trust Velocity Exotics</p>
        </div>
      </header>
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg">{testimonial.name}</h2>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <Quote className="w-8 h-8 text-primary mt-4 mb-2" />
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

function DescriptionService() {
  const services = [
    {
      title: "Curated Selection",
      description: "We offer a meticulously curated selection of the world's finest supercars, ensuring only the best for our discerning clients. Our showroom features a rotating collection of rare and exclusive vehicles, each handpicked for its exceptional performance, design, and pedigree.",
      image: "/placeholder.svg?height=400&width=800",
      alt: "Luxury supercar showroom with various high-end vehicles on display"
    },
    {
      title: "Personalized Experience",
      description: "Our expert team provides a personalized buying experience tailored to your unique preferences and requirements. From the moment you step into our showroom, you'll be guided by passionate automotive specialists who understand the nuances of each supercar and can help you find the perfect match for your lifestyle.",
      image: "/placeholder.svg?height=400&width=800",
      alt: "Client consulting with a supercar specialist in a luxurious setting"
    },
    {
      title: "Exclusive Access",
      description: "Gain exclusive access to limited edition and rare models that are not available to the general public. Our extensive network and relationships with manufacturers allow us to offer you first access to the most coveted supercars, often before they hit the market.",
      image: "/placeholder.svg?height=400&width=800",
      alt: "Unveiling of a rare, limited edition supercar model to VIP clients"
    },
    {
      title: "Bespoke Customization",
      description: "Transform your supercar into a one-of-a-kind masterpiece with our bespoke customization options. Our state-of-the-art workshop and partnerships with world-renowned designers allow you to personalize every aspect of your vehicle, from unique paint finishes to custom interiors.",
      image: "/placeholder.svg?height=400&width=800",
      alt: "Customization workshop showcasing various supercar personalization options"
    }
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white">
  <header className="w-full bg-primary text-primary-foreground py-16">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">What Our Customers Say</h1>
      <p className="text-xl mt-4">Hear from the discerning enthusiasts who trust Velocity Exotics</p>
    </div>
  </header>

  <main className="w-full px-0 sm:px-6 lg:px-8 py-16">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{testimonial.name}</h2>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <StarRating rating={testimonial.rating} />
            <Quote className="w-8 h-8 text-primary mt-4 mb-2" />
            <p className="text-gray-700 italic">{testimonial.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </main>
</div>
  )
}
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Velocity Exotics</h3>
            <p className="mb-4">Experience the pinnacle of automotive luxury and performance.</p>
            <div className="flex space-x-4">
              <a href="#"><Facebook size={24} /></a>
              <a href="#"><Instagram size={24} /></a>
              <a href="#"><Twitter size={24} /></a>
              <a href="#"><Linkedin size={24} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/catalog">Our Collection</Link></li>
              <li><Link href="#">Services</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contanct">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                123 Supercar Lane, Luxury City, 90210
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                info@velocityexotics.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and supercar news.</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700" />
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-gray-800" />
        <div className="text-center text-sm">
          <p>&copy; 2023 Velocity Exotics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
