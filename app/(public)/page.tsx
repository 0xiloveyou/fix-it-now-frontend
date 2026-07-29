import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/shared/footer'

export default function Page() {
  const services = [
    { icon: '🔧', title: 'Plumbing', description: 'Expert plumbing repairs and installations' },
    { icon: '⚡', title: 'Electrical', description: 'Licensed electricians for all your needs' },
    { icon: '🏠', title: 'General Repairs', description: 'Drywall, painting, and maintenance' },
    { icon: '❄️', title: 'HVAC', description: 'Heating and cooling system specialists' },
    { icon: '🪟', title: 'Windows & Doors', description: 'Installation and replacement services' },
    { icon: '🧹', title: 'Appliance Repair', description: 'All major appliance brands covered' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      text: 'FixItNow technicians were professional, punctual, and fixed our plumbing issue in no time!',
    },
    {
      name: 'Michael Chen',
      role: 'Property Manager',
      text: 'Reliable service across multiple properties. Their response time is exceptional.',
    },
    {
      name: 'Emma Davis',
      role: 'Homeowner',
      text: 'Great communication and transparent pricing. I&apos;ll definitely use them again.',
    },
  ]

  return (
    <main className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your Home Repair Experts
            </h1>
            <p className="text-pretty mt-6 text-lg text-muted-foreground sm:text-xl">
              Connect with certified technicians in your area. Fast, reliable, and transparent pricing for all your home repair needs.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book a Technician
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We cover a wide range of home repair and maintenance services
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-border bg-card px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl font-bold text-primary">500+</div>
              <h3 className="mb-2 text-lg font-semibold">Certified Technicians</h3>
              <p className="text-muted-foreground">
                All background checked and fully licensed
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl font-bold text-primary">4.9★</div>
              <h3 className="mb-2 text-lg font-semibold">Average Rating</h3>
              <p className="text-muted-foreground">
                Trusted by thousands of homeowners
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl font-bold text-primary">24/7</div>
              <h3 className="mb-2 text-lg font-semibold">Emergency Support</h3>
              <p className="text-muted-foreground">
                Available for urgent repairs anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">★★★★★</p>
                  <CardDescription className="text-base text-foreground">
                    &quot;{testimonial.text}&quot;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Get Your Home Fixed?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/90">
            Join thousands of homeowners who trust FixItNow for their home repair needs.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
