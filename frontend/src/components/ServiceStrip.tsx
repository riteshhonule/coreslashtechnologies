

import React from "react";
import { Link } from "react-router-dom";

const services = [
    { title: "App Development", link: "/services/app-development" },
    { title: "Website Development", link: "/services/website-development" },
    { title: "Software Development", link: "/services/software-development" },
    { title: "Digital Marketing", link: "/services/ppc" },
];

export default function ServiceStrip() {
    return (
        <div
            className="hidden md:block absolute top-0 left-0 w-full z-40
            bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900
            mt-[64px] md:mt-[88px]
            border-b border-white/60
            shadow-[0_1px_0_rgba(255,255,255,0.4)]"
        >

            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">

                <div className="flex flex-col md:flex-row items-center justify-center py-1.5 md:py-2 gap-2 md:gap-0">

                    {services.map((service, index) => (
                        <React.Fragment key={index}>

                            <Link
                                to={service.link}
                                className="group relative px-3 lg:px-6 py-0.5 text-center transition-all duration-300"
                            >
                                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-gray-300 group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                </span>

                                {/* Hover Indicator */}
                                <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1px] bg-white group-hover:w-1/2 -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100" />

                            </Link>

                            {index < services.length - 1 && (
                                <div className="hidden md:block w-px h-3 bg-white/30 mx-1 lg:mx-2" />
                            )}

                        </React.Fragment>
                    ))}

                </div>

            </div>

        </div>
    );
}
