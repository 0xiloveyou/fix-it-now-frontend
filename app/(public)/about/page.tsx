import {
  ShieldCheck,
  Users,
  Wrench,
  Clock,
} from "lucide-react";


const features = [
  {
    title:"Trusted Technicians",
    description:
      "We connect customers with skilled and verified service professionals.",
    icon:Users,
  },
  {
    title:"Quality Service",
    description:
      "Our platform helps you find reliable home services easily.",
    icon:Wrench,
  },
  {
    title:"Secure Booking",
    description:
      "Book services with confidence using our secure system.",
    icon:ShieldCheck,
  },
  {
    title:"Fast Response",
    description:
      "Get quick assistance whenever you need professional help.",
    icon:Clock,
  },
];



export default function AboutPage(){


  return (

    <div className="mx-auto max-w-6xl space-y-12 p-6">


      <section className="text-center">


        <h1 className="text-4xl font-bold">
          About FixItNow
        </h1>


        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">

          FixItNow is a home service marketplace that
          connects customers with professional technicians.
          From repairs to maintenance, we make finding
          trusted experts simple and convenient.

        </p>


      </section>






      <section className="grid gap-6 md:grid-cols-4">


        {
          features.map((item)=>{


            const Icon=item.icon;


            return (

              <div
                key={item.title}
                className="rounded-xl border p-6"
              >

                <Icon
                  className="mb-4 h-8 w-8"
                />


                <h3 className="font-semibold">
                  {item.title}
                </h3>


                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>


              </div>

            );

          })
        }


      </section>






      <section className="rounded-xl border p-8">


        <h2 className="text-2xl font-bold">
          Our Mission
        </h2>


        <p className="mt-3 text-muted-foreground">

          Our mission is to build a trusted platform where
          customers can easily find skilled technicians and
          technicians can grow their service business.

        </p>


      </section>



    </div>

  );

} 