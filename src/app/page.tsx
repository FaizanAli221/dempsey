"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Press from "@/components/Press";
import MenuPreview from "@/components/MenuPreview";
import Specials from "@/components/Specials";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <>
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />
      <main>
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />
        <Press />
        <MenuPreview />
        <Specials />
        <Gallery />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
