import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components2/navbar"
export default function AboutPage() {
  return <>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold">About Velocity Apex</h1>
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-black dark:text-white">
              <h2 className="text-3xl font-bold mb-4">Our Passion for Performance</h2>
              <p className="text-lg mb-6">
                At Velocity Apex, we're not just selling cars; we're curating experiences. Our passion for high-performance vehicles drives us to bring you the most exclusive and exhilarating supercars on the planet.
              </p>
              <Link href='/catalog'><Button size="lg">Explore Our Collection</Button></Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://www.topgear.com/sites/default/files/2022/12/2%20Bugatti%20Chiron%20DRIFT.jpg"
                alt="Luxury supercar in showroom"
                className="w-full h-1/2 object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Velocity Apex?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Unmatched Expertise", description: "Our team of supercar specialists brings decades of combined experience." },
              { icon: Clock, title: "24/7 Concierge", description: "Round-the-clock support for all your automotive needs." },
              { icon: MapPin, title: "Global Reach", description: "We source the finest vehicles from around the world, delivered to your doorstep." }
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 text-black dark:text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://g-jashvwmaree.vusercontent.net/placeholder.svg"
                alt="Velocity Apex team"
                className="w-full h-4/5 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg mb-6">
                Our diverse team of automotive enthusiasts, engineers, and luxury specialists work tirelessly to ensure you have access to the world's most coveted vehicles and an unparalleled buying experience.
              </p>
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Join Our Team
              </Button>
            </div>
          </div>
        </section>
        <section className="text-black dark:text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Commitment to Excellence</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            At Velocity Apex, we're committed to providing not just cars, but a lifestyle. From the moment you engage with us to long after your purchase, we ensure a seamless, luxurious experience that matches the caliber of vehicles we offer.
          </p>
        </section>
      </main>
    </div>
  </>
}