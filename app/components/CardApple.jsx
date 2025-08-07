import { CardSpotlight } from "../../components/ui/card-spotlight";
import Image from "next/image";

export function CardSpotlightDemo({ img, name }) {
  return (
    <div className="perspective-1000 hover:perspective-500 transition-all duration-500">
      <CardSpotlight className="h-80 w-72 relative transform-style-preserve-3d hover:rotateY-5 hover:rotateX-5 transition-transform duration-500 flex flex-col items-center justify-around gap-4 overflow-visible">
        
        {/* Logo center */}
        <div className="relative z-50 -mt-30 ">
          <Image 
            src={img}
            alt="Logo"
            width={160}
            height={160}
            className="w-40 h-40 sm:w-44 sm:h-44 lg:w-58 lg:h-58 rounded-full hover:scale-110 transition-transform duration-500 animate-float relative z-50 "
            style={{
              filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.5)) drop-shadow(0 40px 70px rgba(0, 0, 0, 0.4))',
              transform: 'translateZ(60px)',
            }}
          />
        </div>

        {/* Name under the logo */}
        <p className="text-xl font-bold text-white text-center z-20 mt-2 px-4">
          {name}
        </p>

      </CardSpotlight>
    </div>
  );
}
