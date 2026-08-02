"use client"
import { CauseData } from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Causes = () => {
    const settings = {
        autoplay: false,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    autoplay: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <section className="lg:py-28 py-16 bg-grey dark:bg-darkmode">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <h2 className="text-center text-3xl font-medium mb-3" data-aos="fade-left">
                    Rehabilitation Statistics about people
                </h2>
                <p className="text-base text-muted dark:text-white/60 text-center">
                Through rehabilitation we can quantify how many people have we Reached, Treated and Places Reached <br className="lg:block hidden" />  to understand how we solve Substance abuse & Addiction. In a bid to create lasting change!
                </p>
                <div className="mt-20">
                    <Slider {...settings}>
                        {CauseData.slice(0, 3).map((item, index) => (
                            <Link href={`/cause/${item.slug}`} key={index} className="px-4">
                                <div className="bg-white group dark:bg-dark rounded-4 overflow-hidden " data-aos="fade-up" data-aos-delay={`${(index) * 250}`}>
                                    <div className="overflow-hidden ">
                                        <Image
                                            src={item.image}
                                            alt="image"
                                            width={350}
                                            height={250}
                                            className="w-full h-auto group-hover:scale-110 duration-300"
                                        />
                                    </div>
                                    <div className="px-8 pt-8 pb-6 shadow-cause-shadow dark:shadow-darkmd">
                                        <h4 className="text-lg font-bold dark:text-white group-hover:text-primary mb-4">
                                            {item.title}
                                        </h4>
                                        <p className="text-muted dark:text-white/60 text-base pb-8 border-b-2 border-border relative after:content-[''] after:absolute after:w-70% after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-linear-to-r after:from-primary after:to-secondary">
                                            {item.text}
                                        </p>
                                        <div className="flex gap-4 mt-4">
                                            <div className="pr-4 border-r-2 dark:border-dark_border">
                                                <h4 className=" text-muted dark:text-white/60 text-sm mb-1">
                                                    Current
                                                </h4>
                                                <h5 className="text-2xl ">
                                                    {item.raised}
                                                </h5>
                                            </div>
                                            <div className="">
                                                <h4 className=" text-muted dark:text-white/60 text-sm mb-1">
                                                    Goal
                                                </h4>
                                                <h5 className="text-2xl ">
                                                    {item.goal}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Causes;