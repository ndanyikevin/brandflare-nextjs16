// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function HomePage() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      
      {/* Full-Page Hero Section */}
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center text-center"
      >
        {/* <div className="absolute inset-0 bg-black/50"></div> overlay */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            BrandFlare <span className="inline">Woodworks</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium Interior Design, Roofing & Modern Finishing for Stylish Homes
          </p>
          <Button size="lg" >
            Get a Free Consultation
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-24 px-4 flex flex-col items-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
          
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Interior Design</CardTitle>
            </CardHeader>
            <CardContent>
              Transform your spaces with modern and elegant designs tailored to your taste.
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Roofing Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              Durable and stylish roofing services designed for modern homes that last.
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Modern Finishing</CardTitle>
            </CardHeader>
            <CardContent>
              Complete finishing services including cabinetry, ceilings, and custom woodwork.
            </CardContent>
          </Card>

        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gray-100 py-24 px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Home?
        </h2>
        <p className="mb-8 max-w-xl">
          Contact BrandFlare Woodworks today and get a free consultation for your interior design, roofing, or finishing project.
        </p>
        <Button size="lg" className="bg-black text-white hover:bg-gray-800">
          Schedule Your Consultation
        </Button>
      </section>

      <footer className="w-full py-8 bg-white text-center text-gray-500">
        &copy; {new Date().getFullYear()} BrandFlare Woodworks. All rights reserved.
      </footer>
    </main>
  );
}
