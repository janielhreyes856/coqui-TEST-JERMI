import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69e68155f53a2a1a55959e4f/c3898b501_generated_4fcf9859.png"
          alt="Alma Cocina restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Experience <span className="italic">Alma Cocina</span>?
        </h2>
        <p className="font-body text-primary-foreground/70 text-lg mb-8">
          Join us for an unforgettable dining experience. Book your table today.
        </p>
        <Link
          to="/reservations"
          className="inline-flex bg-primary text-primary-foreground px-8 py-4 rounded-full font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          Make a Reservation
        </Link>
      </motion.div>
    </section>
  );
}
