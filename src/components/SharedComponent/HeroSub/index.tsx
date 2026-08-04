import React, { FC } from "react";

interface HeroSubProps {
    title: string;
}

const HeroSub: FC<HeroSubProps> = ({ title }) => {
    return (
        <section className="relative py-40 bg-[url('/images/all/xray.jpg')] bg-no-repeat bg-cover bg-center lg:mt-40 sm:mt-44 mt-20 overflow-hidden">
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
            
            {/* Content */}
            <div className="relative container mx-auto lg:max-w-(--breakpoint-xl) px-4 z-10">
                <h2 
                    className="text-white md:text-6xl text-4xl font-medium drop-shadow-lg" 
                    data-aos="fade-right"
                >
                    {title}
                </h2>
            </div>
        </section>
    );
};

export default HeroSub;