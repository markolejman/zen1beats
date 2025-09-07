"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Music,
  Instagram,
  Youtube,
  Headphones,
  MessageCircle,
  Mail,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function ZEN1Landing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFile(selectedFile);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, file);
    // Handle form submission here
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Image
            src="/zen1-logo.png"
            alt="ZEN1 Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("socials")}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Music and Socials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "max-h-48" : "max-h-0"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="container mx-auto px-4 py-2 flex flex-col gap-4 bg-zinc-50/70 dark:bg-zinc-950/70">
            <button
              onClick={() => {
                scrollToSection("socials");
                setIsMobileMenuOpen(false);
              }}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-left py-2"
            >
              Music and Socials
            </button>
            <button
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-left py-2"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="relative">
            <div className="flex justify-center mb-8">
              <Image
                src="/zen1-logo.png"
                alt="ZEN1 Logo"
                width={600}
                height={200}
                className="max-w-full h-auto"
                priority
              />
            </div>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 text-pretty">
              Feel the Rhythm of House and Trap
            </p>
            <div className="flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-200 mb-8">
              <Music className="w-6 h-6" />
              <span className="text-lg font-medium">
                Producer • House Music • Trap Beats
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-zinc-900 dark:text-zinc-100">
                About ZEN1
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              <div className="w-64 h-64 mx-auto mb-8">
                <Image
                  src="/zen1-profile.jpg"
                  alt="ZEN1 Profile"
                  width={256}
                  height={256}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">
                Marko, AKA ZEN1, has been making music since 7th grade,
                exploring genres like Hardstyle, Techno, House, and Rap/Trap.
                Growing up in Finland and Sweden, he developed a deep passion
                for music production, refining his skills at Fryshuset and
                APAcademy. With a solid foundation in sound design and a
                creative mindset, Marko produces whatever inspires him – always
                with professionalism and a unique touch.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Links Section */}
      <section id="socials" className="py-16 px-4 bg-zinc-100 dark:bg-zinc-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12">
            Music and Socials
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.youtube.com/@ZEN1BEATS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                YouTube
              </Button>
            </a>
            <a
              href="https://www.beatstars.com/zen1beats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Music className="w-5 h-5" />
                BeatStars
              </Button>
            </a>
            <a
              href="https://open.spotify.com/artist/5qYaJzLxghIOfZoBVNzLX8?si=_KPlq9LvRl2qO1fv0gpvFQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Headphones className="w-5 h-5" />
                Spotify
              </Button>
            </a>
            <a
              href="https://www.instagram.com/zen1beats/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </Button>
            </a>
            <a
              href="https://www.tiktok.com/@zen1beats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                TikTok
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
                <Mail className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
                Get In Touch
              </CardTitle>
              <CardDescription className="text-lg text-zinc-600 dark:text-zinc-400">
                Ready to collaborate or have a question? Drop me a message!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-zinc-900 dark:text-zinc-100"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-zinc-900 dark:text-zinc-100"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-zinc-900 dark:text-zinc-100"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What's on your mind"
                    required
                    rows={4}
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="file"
                    className="text-zinc-900 dark:text-zinc-100"
                  >
                    Add a file if you like (Max 5MB)
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*,.mp3,.wav,.m4a,.aac"
                      className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                    <Upload className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  {file && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Selected: {file.name} (
                      {(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        <div className="container mx-auto text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} ZEN1. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
            House Music • Trap Beats • Electronic Production
          </p>
        </div>
      </footer>
    </div>
  );
}
