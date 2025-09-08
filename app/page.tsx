"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
  Mail,
  Menu,
  X,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ZEN1Landing() {
  const carouselImages = [
    { src: "/instudio.jpeg", alt: "Studio Setup" },
    { src: "/zen1logocrystal.png", alt: "ZEN1 Crystal Logo" },
    { src: "/greece1.jpeg", alt: "Greece 1" },
    { src: "/greece2.jpeg", alt: "Greece 2" },
    { src: "/greece3.jpg", alt: "Greece 3" },
    { src: "/studio.jpg", alt: "Studio" },
  ];

  // Set up carousel autoplay with infinite loop
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize intersection observer for About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const aboutContainer = document.getElementById("about-container");
        if (aboutContainer) {
          if (entry.isIntersecting) {
            aboutContainer.classList.remove("opacity-0");
            aboutContainer.classList.add("opacity-100");
          } else {
            aboutContainer.classList.remove("opacity-100");
            aboutContainer.classList.add("opacity-0");
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/zen1-logo.png"
              alt="ZEN1 Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </button>

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
              onClick={() => scrollToSection("about")}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              About
            </button>
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
                scrollToSection("about");
                setIsMobileMenuOpen(false);
              }}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-left py-2"
            >
              About
            </button>
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
      <section className="pt-20 pb-24 md:pb-32 px-4">
        <div className="container mx-auto text-center">
          <div className="relative">
            <div className="flex justify-center mb-8">
              <Image
                src="/zen1-logo.png"
                alt="ZEN1 Logo"
                width={1000}
                height={333}
                className="max-w-full h-auto"
                priority
              />
            </div>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 text-pretty">
              Swedish Producer • House Music • Trap Beats
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 md:h-24" />

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div
          className="container mx-auto max-w-4xl opacity-0 transition-opacity duration-500"
          id="about-container"
        >
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
                Marko, AKA ZEN1, has been making music for more than 15 years -
                since 7th grade, exploring genres like Hardstyle, Techno, House,
                and Rap/Trap. Growing up in Finland and Sweden, he developed a
                deep passion for music production, refining his skills at
                Fryshuset and APAcademy. With a solid foundation in sound design
                and a creative mindset, Marko produces whatever inspires him –
                always with professionalism and a unique touch.
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
                <Image
                  src="/youtube.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                />
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
                <Image
                  src="/beatstars.png"
                  alt="BeatStars"
                  width={20}
                  height={20}
                />
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
                <Image
                  src="/spotify.png"
                  alt="Spotify"
                  width={20}
                  height={20}
                />
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
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
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
                <Image src="/tiktok.png" alt="TikTok" width={20} height={20} />
                TikTok
              </Button>
            </a>
            <a
              href="https://voloco.resonantcavity.com/applinks/creator?id=9952890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Image src="/voloco.png" alt="Voloco" width={20} height={20} />
                Voloco
              </Button>
            </a>
            <a
              href="https://music.youtube.com/channel/UCTtrPzermORuGsyP3T5n0PQ?si=PixmFLaJzR6882td"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
              >
                <Image
                  src="/youtubemusic.png"
                  alt="YouTube Music"
                  width={20}
                  height={20}
                />
                YouTube Music
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-full">
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
                      <div className="relative w-full">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                          onClick={() =>
                            document.getElementById("file")?.click()
                          }
                        >
                          <Upload className="w-5 h-5" />
                          {file ? file.name : "Choose file"}
                        </Button>
                        <input
                          id="file"
                          type="file"
                          onChange={handleFileChange}
                          accept="audio/*,.mp3,.wav,.m4a,.aac"
                          className="hidden"
                        />
                      </div>
                    </div>
                    {file && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        File size: {(file.size / 1024 / 1024).toFixed(2)} MB
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
            <div className="relative h-[300px] md:h-full overflow-hidden rounded-2xl">
              <div className="w-full h-full relative">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1 text-center md:text-left space-y-4">
              <Image
                src="/zen1-logo.png"
                alt="ZEN1 Logo"
                width={120}
                height={40}
                className="h-8 w-auto mx-auto md:mx-0"
              />
              <div className="space-y-2">
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  Music Publisher
                </p>
                <Image
                  src="/sonymusicpublishing.png"
                  alt="Sony Music Publishing"
                  width={360}
                  height={120}
                  className="h-24 w-auto mx-auto md:mx-0"
                />
              </div>
              <div className="space-y-2">
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  Performing Rights Organization (PRO)
                </p>
                <Image
                  src="/stim.png"
                  alt="STIM"
                  width={120}
                  height={40}
                  className="h-8 w-auto mx-auto md:mx-0"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("socials")}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    Music and Socials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2"
                  >
                    <ArrowUp className="w-4 h-4" />
                    Back to Top
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Follow Me
              </h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.youtube.com/@ZEN1BEATS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  YouTube
                </a>
                <a
                  href="https://www.beatstars.com/zen1beats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  BeatStars
                </a>
                <a
                  href="https://open.spotify.com/artist/5qYaJzLxghIOfZoBVNzLX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Spotify
                </a>
                <a
                  href="https://www.instagram.com/zen1beats/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@zen1beats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  TikTok
                </a>
                <a
                  href="https://voloco.resonantcavity.com/applinks/creator?id=9952890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Voloco
                </a>
                <a
                  href="https://music.youtube.com/channel/UCTtrPzermORuGsyP3T5n0PQ?si=PixmFLaJzR6882td"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  YouTube Music
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Contact
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Email:{" "}
                <a
                  href="mailto:zen1producer@gmail.com"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  zen1producer@gmail.com
                </a>
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mt-4">
                © {new Date().getFullYear()} ZEN1
                <br />
                All rights reserved.
                <br />
                <span className="mt-2 inline-block">
                  Website built by{" "}
                  <a
                    href="https://www.linkedin.com/company/lejtech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
                  >
                    LEJTECH
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
