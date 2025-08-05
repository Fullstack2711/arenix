"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function Section() {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-screen-xl mx-auto  px-4 py-2 md:px-8">
        <div className="space-y-4 max-w-4xl  mx-auto text-center ">
          <motion.h2
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl text-white font-extrabold mx-auto md:text-5xl"
          >
            Katta turnirlarni kuzatib boring va ishtirok eting
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto"
          >
            <Image
              src="/game/dota.png"
              alt="Description of image"
              width={800}
              height={300}
              className="mx-auto"
            />
          </motion.div>
         
        </div>
      </div>
      <div
        className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
    </section>
  );
}

export default Section;