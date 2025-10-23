"use client";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
import {
  AlertTriangle,
  BookOpen,
  Code,
  CookingPot,
  Key,
  KeyIcon,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const baseurl =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";

export default function DocsPage() {
  const [key, setkey] = useState("");
  const [out, setout] = useState("");
  const [postBody, setPostBody] = useState("Hello World");

  async function runGET() {
    const res = await fetch(`${baseurl}/api/ping`, {
      headers: { "x-api-key": key },
    });
    setout(JSON.stringify(await res.json(), null, 2));
  }

  async function runPOST() {
    const res = await fetch(`${baseurl}/api/echo`, {
      method: "POST",
      headers: {
        "x-api-key": key,
        "content-Type": "application/json",
      },
      body: JSON.stringify({ postBody }),
    });
    setout(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <div className="flex h-screen bg-[#FFF5EB]">
      {/* Sidebar Navigation */}
      <div className="flex w-64 flex-col bg-gradient-to-b from-[#E74C3C] to-[#F39C12] p-4 text-white">
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <BookOpen size={20} />
            LutongPinoyAPI Docs
          </h1>
          <p className="mt-1 text-sm text-white/80">
            Authentic Filipino Recipes
          </p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <a
                href="#introduction"
                className="block w-full rounded-md bg-white/20 px-4 py-2 text-left font-medium"
              >
                <BookOpen size={16} className="mr-2 inline" />
                Introduction
              </a>
            </li>
            <li>
              <a
                href="#authentication"
                className="block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-white/10"
              >
                <KeyIcon size={16} className="mr-2 inline" />
                Authentication
              </a>
            </li>
            <li>
              <a
                href="#endpoints"
                className="block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-white/10"
              >
                <ListOrdered size={16} className="mr-2 inline" />
                API Endpoints
              </a>
            </li>
            <li>
              <a
                href="#examples"
                className="block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-white/10"
              >
                <Code size={16} className="mr-2 inline" />
                Code Examples
              </a>
            </li>
            <li>
              <a
                href="#errors"
                className="block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-white/10"
              >
                <AlertTriangle size={16} className="mr-2 inline" />
                Error Handling
              </a>
            </li>
          </ul>
        </nav>

        <div className="border-t border-white/20 pt-4">
          <Link href="/key">
            <Button className="w-full bg-white font-bold text-[#E74C3C] hover:bg-gray-100">
              <Key size={16} className="mr-2" />
              Manage API Keys
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header - Matches your homepage styling */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#E74C3C] to-[#F39C12] p-4 text-white shadow-lg">
          <h2 className="font-serif text-lg font-bold">
            API Documentation Guide
          </h2>
          <div className="flex gap-2">
            <div className="flex items-center pr-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-white",
                    userButtonPopoverCard: "bg-white",
                  },
                }}
              />
            </div>
            <Link href="/key">
              <Button
                variant={"outline"}
                className="cursor-pointer bg-white/90 px-4 font-bold text-[#E74C3C] hover:bg-white"
              >
                <Key size={16} className="mr-2" />
                API Key
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-auto bg-[#FFF5EB] p-6">
          {/* Introduction Section */}
          <section
            id="introduction"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <div className="flex items-center bg-[#E74C3C] px-6 py-4">
              <BookOpen className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                Introduction to LutongPinoyAPI
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                A comprehensive REST API for accessing authentic Filipino
                recipes, ingredients, and cooking techniques. Our API provides
                structured data to power your culinary applications.
              </p>

              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-[#FFE0D6] bg-[#FFF5F0] p-4">
                  <h3 className="mb-2 font-semibold text-[#E74C3C]">
                    📚 500+ Recipes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Traditional and modern Filipino dishes
                  </p>
                </div>
                <div className="rounded-lg border border-[#FFE0D6] bg-[#FFF5F0] p-4">
                  <h3 className="mb-2 font-semibold text-[#E74C3C]">
                    ⚡ RESTful API
                  </h3>
                  <p className="text-sm text-gray-600">
                    Standard HTTP methods and responses
                  </p>
                </div>
                <div className="rounded-lg border border-[#FFE0D6] bg-[#FFF5F0] p-4">
                  <h3 className="mb-2 font-semibold text-[#E74C3C]">
                    🔐 Secure
                  </h3>
                  <p className="text-sm text-gray-600">
                    API key authentication with rate limiting
                  </p>
                </div>
              </div>

              <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800">
                Getting Started
              </h3>
              <ol className="list-inside list-decimal space-y-2 text-gray-700">
                <li>Obtain your API key from the dashboard</li>
                <li>Review the authentication requirements</li>
                <li>Explore available endpoints</li>
                <li>Integrate with your application</li>
              </ol>
            </div>
          </section>

          {/* Authentication Section */}
          <section
            id="authentication"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <div className="flex items-center bg-gradient-to-r from-[#E74C3C] to-[#F39C12] px-6 py-4">
              <KeyIcon className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                API Authentication
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                All API requests require authentication using your API key.
                Include it in the Authorization header of every request.
              </p>

              <div className="mb-6 rounded-lg bg-gray-800 p-4">
                <pre className="overflow-x-auto text-orange-200">
                  <code>
                    {`// Example using fetch
            fetch('https://api.lutongpinoy.com/recipes', {
              headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE',
                'Content-Type': 'application/json'
              }
            })`}
                  </code>
                </pre>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="flex items-start text-yellow-700">
                  <span className="mr-2 font-bold text-yellow-500">•</span>
                  <span>
                    <strong>Important:</strong> Keep your API key secure and
                    never expose it in client-side code.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Endpoints Section */}
          <section
            id="endpoints"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>How Authentication Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  Authenticate using the{" "}
                  <code>Authorization: Bearer YOUR_API_KEY</code> header. Create
                  a key in <code>/key</code> and store it securely.
                </p>
                <Separator />
                <div>
                  <h3 className="font-semibold">Base Url</h3>
                  <pre className="overflow-x-auto">
                    <code>{baseurl + "/api"}</code>
                  </pre>
                </div>
                <Separator />
                <div>
                  <div>
                    <h4 className="font-semibold">GET /api/ping</h4>
                    <pre className="overflow-x-auto text-sm">
                      <code>{`curl -H "x-api-key: <YOUR_KEY>" ${baseurl}/api/ping`}</code>
                    </pre>
                    <pre className="overflow-x-auto text-sm">
                      <code>{`const res = await fetch('${baseurl}/api/ping', {
                              headers: { 'x-api-key': process.env.MY_KEY }
                                  });`}</code>
                    </pre>
                  </div>
                  <Separator />
                  <h4 className="font-semibold">POST /api/ping</h4>
                  <pre className="overflow-x-auto text-sm">
                    <code>{`curl -X POST \\
  -H "x-api-key: <YOUR_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"hello":"world"}' \\
  ${baseurl}/api/echo
`}</code>
                  </pre>
                  <pre className="overflow-x-auto text-sm">
                    <code>{`const res = await fetch('${baseurl}/api/echo', {
  method: "POST",
  headers: {
    'x-api-key': process.env.MY_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ hello: 'world' })
});
`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Examples Section */}
          <section
            id="examples"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={key}
                  placeholder="Paste your API key (sk_...)"
                  onChange={(e) => setkey(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={runGET}>Test GET /api/ping</Button>
                  <Button onClick={runPOST} variant="secondary">
                    Test POST /api/echo
                  </Button>
                </div>
                <Label className="text-sm font-medium">POST body (JSON)</Label>
                <Textarea
                  rows={5}
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                />
                <Label className="font medium text-sm">Responses</Label>
                <Textarea rows={5} readOnly value={out} />
              </CardContent>
            </Card>
          </section>

          {/* API Endpoints Documentation Section - Add this after the Authentication section */}
          <section
            id="api-endpoints"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <div className="flex items-center bg-[#E74C3C] px-6 py-4">
              <ListOrdered className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                API Endpoints & Usage
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                LutongPinoyAPI provides two main endpoints for accessing
                Filipino recipe data. Use GET for listing with
                pagination/filtering, and POST for advanced search capabilities.
              </p>

              {/* Endpoint Overview Cards */}
              <div className="mb-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[#FFE0D6] bg-[#FFF5F0] p-4">
                  <h3 className="mb-2 font-semibold text-[#E74C3C]">
                    📋 GET /api/ping
                  </h3>
                  <p className="text-sm text-gray-600">
                    List recipes with pagination, filtering by category, and
                    sorting options
                  </p>
                </div>
                <div className="rounded-lg border border-[#FFE0D6] bg-[#FFF5F0] p-4">
                  <h3 className="mb-2 font-semibold text-[#E74C3C]">
                    🔍 POST /api/echo
                  </h3>
                  <p className="text-sm text-gray-600">
                    Advanced search for recipes by title or ingredients
                  </p>
                </div>
              </div>

              {/* GET Endpoint Details */}
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  GET /api/ping - Recipe Listing
                </h3>

                <div className="mb-4">
                  <h4 className="mb-2 font-medium text-gray-700">
                    Query Parameters:
                  </h4>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="grid gap-2 text-sm">
                      <div>
                        <code className="rounded bg-gray-200 px-2 py-1">
                          page
                        </code>{" "}
                        - Page number (default: 1)
                      </div>
                      <div>
                        <code className="rounded bg-gray-200 px-2 py-1">
                          limit
                        </code>{" "}
                        - Items per page (default: 10)
                      </div>
                      <div>
                        <code className="rounded bg-gray-200 px-2 py-1">
                          category
                        </code>{" "}
                        - Filter by category (optional)
                      </div>
                      <div>
                        <code className="rounded bg-gray-200 px-2 py-1">
                          sortBy
                        </code>{" "}
                        - Sort field: title, prepTime, cookTime (default: title)
                      </div>
                      <div>
                        <code className="rounded bg-gray-200 px-2 py-1">
                          order
                        </code>{" "}
                        - Sort order: asc, desc (default: asc)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="mb-2 font-medium text-gray-700">
                      Basic Usage:
                    </h5>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="overflow-x-auto text-sm text-green-400">
                        <code>{`# Get all recipes (page 1, default limit)
GET ${baseurl}/api/ping

# Response:
{
  "ok": true,
  "message": "Items retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10
  }
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-2 font-medium text-gray-700">
                      With Pagination:
                    </h5>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="overflow-x-auto text-sm text-green-400">
                        <code>{`# Get page 2 with 5 items per page
GET ${baseurl}/api/ping?page=2&limit=5`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-2 font-medium text-gray-700">
                      With Filtering & Sorting:
                    </h5>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="overflow-x-auto text-sm text-green-400">
                        <code>{`# Filter by category and sort by prep time (descending)
GET ${baseurl}/api/ping?category=chicken&sortBy=prepTime&order=desc

# Filter by category and sort by cook time (ascending)
GET ${baseurl}/api/ping?category=pork&sortBy=cookTime&order=asc`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* POST Endpoint Details */}
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  POST /api/echo - Advanced Search
                </h3>

                <p className="mb-4 text-gray-600">
                  Search for recipes by title or ingredients using partial
                  matching. Perfect for finding specific dishes.
                </p>

                <div className="space-y-4">
                  <div>
                    <h5 className="mb-2 font-medium text-gray-700">
                      Search by Recipe Name:
                    </h5>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="overflow-x-auto text-sm text-green-400">
                        <code>{`# Search for "adobo" recipes
POST ${baseurl}/api/echo
Content-Type: application/json

{
  "postBody": "adobo"
}

# Response:
{
  "ok": true,
  "message": "Recipe(s) found successfully",
  "recipes": [
    {
      "id": 1,
      "title": "Chicken Adobo",
      "description": "A classic Filipino dish...",
      "prepTime": 15,
      "cookTime": 45,
      "servings": 4
    }
  ]
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-2 font-medium text-gray-700">
                      Search by Ingredient:
                    </h5>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="overflow-x-auto text-sm text-green-400">
                        <code>{`# Find all recipes with "chicken"
POST ${baseurl}/api/echo
Content-Type: application/json

{
  "postBody": "chicken"
}

# This will return all recipes with "chicken" in the title`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* JavaScript Examples */}
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  JavaScript Examples
                </h3>

                <div className="rounded-lg bg-gray-800 p-4">
                  <pre className="overflow-x-auto text-sm text-blue-300">
                    <code>{`// Fetch recipes with pagination and filtering
async function getRecipes(page = 1, category = '', sortBy = 'title') {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: '10',
    sortBy,
    order: 'asc'
  });
  
  if (category) queryParams.append('category', category);
  
  const response = await fetch('${baseurl}/api/ping?' + queryParams, {
    headers: {
      'x-api-key': 'YOUR_API_KEY_HERE'
    }
  });
  
  return response.json();
}

// Search for specific recipes
async function searchRecipes(searchTerm) {
  const response = await fetch('${baseurl}/api/echo', {
    method: 'POST',
    headers: {
      'x-api-key': 'YOUR_API_KEY_HERE',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postBody: searchTerm })
  });
  
  return response.json();
}

// Usage examples:
const recipes = await getRecipes(1, 'chicken', 'prepTime');
const searchResults = await searchRecipes('adobo');`}</code>
                  </pre>
                </div>
              </div>

              {/* Common Use Cases */}
              <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-700">
                  💡 Common Use Cases
                </h4>
                <ul className="space-y-1 text-sm text-blue-600">
                  <li>
                    • Browse all recipes with pagination:{" "}
                    <code>GET /api/ping?page=1&limit=20</code>
                  </li>
                  <li>
                    • Find chicken recipes sorted by cooking time:{" "}
                    <code>GET /api/ping?category=chicken&sortBy=cookTime</code>
                  </li>
                  <li>
                    • Search for specific dishes: <code>POST /api/echo</code>{" "}
                    with <code>{`{"postBody": "sisig"}`}</code>
                  </li>
                  <li>
                    • Get quick cooking recipes:{" "}
                    <code>GET /api/ping?sortBy=prepTime&order=asc&limit=5</code>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Error Handling Section */}
          <section
            id="errors"
            className="mb-12 max-w-4xl overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl"
          >
            <div className="flex items-center bg-gradient-to-r from-[#E74C3C] to-[#F39C12] px-6 py-4">
              <AlertTriangle className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                Error Handling
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                The API uses standard HTTP status codes to indicate success or
                failure:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-700">
                    401 Unauthorized
                  </h4>
                  <p className="text-sm text-red-600">
                    Invalid or missing API key
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-700">404 Not Found</h4>
                  <p className="text-sm text-red-600">
                    Requested resource doesn't exist
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-700">
                    429 Too Many Requests
                  </h4>
                  <p className="text-sm text-red-600">Rate limit exceeded</p>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-700">
                    500 Internal Server Error
                  </h4>
                  <p className="text-sm text-red-600">
                    Server encountered an error
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
