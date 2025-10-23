import { SignInButton, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ChefHat, Code, CookingPot, Database, Globe, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";


export default async function HomePage() {
 const user = await currentUser();

    if (user) {
    redirect("/key");
    }

  return (

    <div className="min-h-screen bg-[#FFF9F2]">
   <header className="bg-[#E74C3C] text-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-md flex items-center justify-center">
           <CookingPot />
        </div>
        <h1 className="text-xl font-bold">LutongPinoyAPI</h1>
      </div>
      
      <nav className="flex items-center space-x-6">
        <a href="#features" className="text-white hover:text-gray-200 text-sm">Features</a>
        <a href="#about" className="text-white hover:text-gray-200 text-sm">About</a>
        
        
        <div className="flex space-x-3">
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-[#E74C3C] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition">
                Get API Key
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="text-white hover:text-gray-200 px-3 py-2 text-sm">
                Sign Out
              </button>
            </SignOutButton>
            <Link href="/dashboard" className="bg-white text-[#E74C3C] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition">
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </nav>
    </div>
  </header>

  {/* Hero Section */}
  <section className="relative text-white py-16 min-h-[400px] flex items-center">
    <div className="absolute inset-0 bg-black/30">
      <img 
        src="https://www.seriouseats.com/thmb/sNOqOuOaiILj05PSuunyT3FuyPY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Filipino-Features-Soups-and-Stews-1e81ba12ce10481caf3ff58981c347ab.jpg" 
        alt="Filipino food spread"
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="container mx-auto px-4 text-center relative">
      <h1 className="text-4xl font-bold mb-4">Discover Filipino Cuisine Through API</h1>
      <p className="text-xl max-w-2xl mx-auto mb-6">
        Access authentic Filipino recipes programmatically with our comprehensive API
      </p>
      <div className="flex justify-center space-x-4">
        <SignedOut>
          <SignInButton>
            <button className="bg-white text-[#E74C3C] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition shadow-md">
              Get Started
            </button>
          </SignInButton>
     
        <Link href="/docs">
          <button className="border-2 border-white hover:bg-white hover:text-[#E74C3C] px-6 py-3 rounded-md font-medium transition">
            View Documentation
          </button>
        </Link>
   
          </SignedOut>
      </div>
    </div>
  </section>

  {/* Introduction Section */}
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4 max-w-5xl text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">What is LutongPinoyAPI?</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
       LutongPinoy API is an API designed to provide a wide and abundant range of Filipino
recipes that cater users to explore and create Filipino dishes. This API is a source
of culinary inspiration which can be utilized by food enthusiasts to integrate.
It serves as a rich resource for those in search of Filipino cuisine in an API way, it primarily
serves as an inspiration for people who want to explore traditional and contemporary Filipino dishes. 
This API is also a way to share the richness culture of the Filipinos when it comes to culinary
to local and global audiences.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="text-[#E74C3C] text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Rich Database</h3>
          <p className="text-gray-600">Hundreds of authentic recipes with detailed information</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="text-[#E74C3C] text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Developer Friendly</h3>
          <p className="text-gray-600">RESTful API with clear documentation and examples</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="text-[#E74C3C] text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Cultural Heritage</h3>
          <p className="text-gray-600">Preserving and sharing Filipino culinary traditions</p>
        </div>
      </div>
    </div>
  </section>

  {/* Features Section */}
  <section id="features" className="py-12 bg-[#FFF5F0]">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">API Features</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-[#E74C3C]">Complete Recipe Data</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Ingredients with measurements</li>
            <li>Step-by-step cooking instructions</li>
            <li>Preparation and cooking times</li>
            <li>Difficulty levels</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-[#E74C3C]">Advanced Filtering</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Filter by region (Luzon, Visayas, Mindanao)</li>
            <li>Filter by meal type (breakfast, lunch, dinner)</li>
            <li>Search by ingredients</li>
            <li>Dietary restrictions</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-[#E74C3C]">Cultural Context</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Recipe origins and history</li>
            <li>Traditional serving occasions</li>
            <li>Regional variations</li>
            <li>Cultural significance</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-[#E74C3C]">Developer Features</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>JSON responses</li>
            <li>Pagination support</li>
            <li>Detailed error messages</li>
            <li>Webhook support for updates</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* Use Cases Section */}
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Who Can Use Our API?</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-[#E74C3C] text-3xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">App Developers</h3>
          <p className="text-gray-600">Build cooking apps, meal planners, or grocery list generators with authentic Filipino recipes</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-[#E74C3C] text-3xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Educators</h3>
          <p className="text-gray-600">Create educational content about Filipino culture and cuisine for students</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-[#FFF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="text-[#E74C3C] text-3xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Food Businesses</h3>
          <p className="text-gray-600">Enhance your restaurant website, food blog, or culinary service with recipe data</p>
        </div>
      </div>
    </div>
  </section>

  {/* About Section */}
  <section id="about" className="py-12 bg-[#FFF5F0]">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="md:flex items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Project</h2>
          <p className="text-gray-600 mb-4">
            LutongPinoyAPI was created to preserve and share the rich culinary heritage of the Philippines with 
            developers around the world. Our team of Filipino chefs, historians, and developers have worked 
            tirelessly to create the most comprehensive database of authentic Filipino recipes available through an API.
          </p>
          <p className="text-gray-600">
            We're committed to maintaining the accuracy and cultural authenticity of every recipe in our database, 
            ensuring that developers can build applications that truly represent Filipino cuisine.
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://www.goforlokal.com/wp/wp-content/uploads/2022/10/Filipino-Food-10-Best-Filipino-Dishes-That-Will-Satisfy-Your-Appetite-1068x559.jpg" 
            alt="Filipino chefs preparing food" 
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  </section>




  {/* Footer */}
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">LutongPinoyAPI</h3>
          <p className="text-gray-400">The premier API for authentic Filipino recipes</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Data Usage</a></li>
          </ul>
        </div>
      </div>
    
    </div>
  </footer>
</div>
  );
}
