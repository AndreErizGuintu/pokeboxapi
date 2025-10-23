"use client";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import {
  BookOpen,
  CookingPot,
  CopyIcon,
  Flame,
  KeyIcon,
  PieChart,
  Plus,
  ShieldIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import Copybutton from "~/components/copy-button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { set } from "zod";
import { useEffect, useState } from "react";
import { listKeys } from "~/server/key";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: number | string;
  revoked: boolean;
};

export default function KeyPage() {
  const [name, setName] = useState("My Api Key");
  const [items, setItems] = useState<KeyItem[]>([]);
  const [justCreated, setJustCreated] = useState<{
    key: string;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCreatedKey, setShowCreatedKey] = useState(false);

  const toggleCreatedKeyVisibility = () => {
    setShowCreatedKey(!showCreatedKey);
  };

  const { userId } = useAuth(); // Get the logged-in user's ID

  async function createKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }), // Pass userId to the backend
      });
      const data = await res.json();
      if (res.ok) {
        setJustCreated({ key: data.key, id: data.id });
        setShowCreatedKey(false); // Hide the newly created key by default
      } else {
        throw new Error(data?.error || "Failed to create key");
      }
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    if (!userId) return;
    const res = await fetch(`/api/keys?userId=${userId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setItems(data.items ?? []);
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/api/keys?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) alert(data?.error || "Failed to revoke key");
    await load();
  }

  useEffect(() => {
    if (userId) {
      load();
    }
  }, [userId]); 

  return (
    <SignedIn>
      <div className="min-h-screen bg-[#FFF5EB]">
        {/* Header with Filipino-inspired gradient */}
        <header className="bg-gradient-to-r from-[#E74C3C] to-[#F39C12] text-white shadow-lg">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <CookingPot className="text-white" size={24} />
              </div>
              <h1 className="font-serif text-2xl font-bold">LutongPinoyAPI</h1>
            </div>

            <div className="flex items-center space-x-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-white",
                    userButtonPopoverCard: "bg-white",
                  },
                }}
              />
              <Link href="/docs">
                <button className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-[#E74C3C] shadow-md transition-all hover:bg-white hover:shadow-lg">
                  <BookOpen size={16} />
                  API Docs
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content container */}
        <div className="relative container mx-auto max-w-7xl px-4 py-8">
          {/* API Key Generator Section */}

          <div className="relative z-10 mb-10 overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl">
            <div className="flex items-center bg-[#E74C3C] px-8 py-5">
              <CookingPot className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                Create New API Key
              </h2>
            </div>
            <div className="p-7">
              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="key-name"
                    className="mb-2 block flex items-center text-sm font-bold text-gray-700"
                  >
                    <KeyIcon className="mr-2 text-[#E74C3C]" size={16} />
                    Key Name
                  </label>
                  <Input
                    placeholder="Key Nam (e.g. 'My Adobo App')"
                    className="w-full rounded-xl border-2 border-[#FFE0D6] px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#E74C3C]"
                    aria-label="API key name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Button
                  className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-[#E74C3C] to-[#F39C12] px-7 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:from-[#C0392B] hover:to-[#D35400] hover:shadow-lg"
                  onClick={createKey}
                  disabled={loading}
                >
                  <Plus size={18} />
                  Generate Key
                </Button>
              </div>

              {/* API Key Display with Copy Functionality */}
              {justCreated && (
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-[#FFD1C2] bg-[#FFF5F0] p-5">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#E74C3C] opacity-10"></div>
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center text-sm font-bold text-[#E74C3C]">
                        <ShieldIcon className="mr-2" size={16} />
                        YOUR SECRET API KEY
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleCreatedKeyVisibility}
                          className="h-8 w-8 p-0 text-[#E74C3C] hover:bg-[#FFE0D6]"
                        >
                          {showCreatedKey ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                        <Copybutton value={justCreated.key} />
                      </div>
                    </div>
                    <code className="mb-3 rounded-lg border border-[#FFE0D6] bg-white p-4 font-mono text-sm break-all text-gray-800">
                      {showCreatedKey
                        ? justCreated.key
                        : "••••••••••••••••••••••••••••••••"}
                    </code>
                    <p className="mt-7 flex items-start text-xs text-gray-600">
                      <span className="mr-1 font-bold text-[#E74C3C]">•</span>
                      This key will only be shown once. Store it securely in a
                      password manager.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* API Keys Management Table */}
          <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-[#FFE0D6] bg-white shadow-xl">
            <div className="flex items-center bg-[#E74C3C] px-8 py-5">
              <KeyIcon className="mr-3 text-white" size={22} />
              <h2 className="font-serif text-xl font-bold text-white">
                Your API Keys
              </h2>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#FFE0D6]">
                  <thead className="bg-[#F8F1E9]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700 uppercase"
                      >
                        Key Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700 uppercase"
                      >
                        Preview
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700 uppercase"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-bold tracking-wider text-gray-700 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <TableBody className="divide-y divide-[#FFE0D6] bg-white">
                    {items.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="font-mono">
                          {row.masked}
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {row.revoked ? (
                            <Badge variant="secondary">Revoked</Badge>
                          ) : (
                            <Badge variant="default">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={row.revoked}
                            onClick={() => revokeKey(row.id)}
                          >
                            Revoke
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}
