import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LearnMorePage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-14">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-bold">
          Learn More About FixItNow
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          FixItNow connects homeowners with trusted technicians for
          fast, reliable, and affordable home repair services. From
          plumbing and electrical work to appliance repair and home
          maintenance, everything can be managed from one platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/services">
            <Button size="lg">
              Browse Services
            </Button>
          </Link>

          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Why Choose FixItNow?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>
                Verified Technicians
              </CardTitle>
            </CardHeader>

            <CardContent>
              Every technician is reviewed before joining the
              platform to ensure quality and professionalism.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Easy Booking
              </CardTitle>
            </CardHeader>

            <CardContent>
              Book appointments within minutes by choosing your
              preferred service and available time slot.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Secure Payments
              </CardTitle>
            </CardHeader>

            <CardContent>
              Complete payments securely through Stripe after your
              booking is accepted.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Real-Time Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              Track every booking from request to completion from
              your customer dashboard.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Customer Reviews
              </CardTitle>
            </CardHeader>

            <CardContent>
              Read genuine customer reviews and ratings before
              selecting a technician.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Transparent Pricing
              </CardTitle>
            </CardHeader>

            <CardContent>
              Know the service cost upfront with no hidden charges.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          How It Works
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 text-4xl font-bold text-primary">
                1
              </div>

              <h3 className="font-semibold">
                Choose a Service
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Browse available services offered by experienced
                technicians.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 text-4xl font-bold text-primary">
                2
              </div>

              <h3 className="font-semibold">
                Book a Time Slot
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Select an available schedule that fits your
                convenience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 text-4xl font-bold text-primary">
                3
              </div>

              <h3 className="font-semibold">
                Pay Securely
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Complete payment safely after the booking is
                accepted.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 text-4xl font-bold text-primary">
                4
              </div>

              <h3 className="font-semibold">
                Enjoy the Service
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                The technician completes the work and you can leave
                a review afterward.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-20 rounded-xl border bg-muted/30 py-12">
        <div className="grid gap-8 text-center md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold text-primary">
              500+
            </h3>

            <p className="mt-2 text-muted-foreground">
              Certified Technicians
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-primary">
              10K+
            </h3>

            <p className="mt-2 text-muted-foreground">
              Successful Repairs
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-primary">
              4.9★
            </h3>

            <p className="mt-2 text-muted-foreground">
              Customer Rating
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-primary">
              24/7
            </h3>

            <p className="mt-2 text-muted-foreground">
              Emergency Support
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 rounded-xl bg-primary px-8 py-14 text-center">
        <h2 className="text-4xl font-bold text-primary-foreground">
          Ready to Get Started?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
          Join thousands of homeowners who trust FixItNow for fast,
          secure, and reliable home repair services.
        </p>

        <div className="mt-8">
          <Link href="/services">
            <Button
              size="lg"
              variant="secondary"
            >
              Explore Services
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}