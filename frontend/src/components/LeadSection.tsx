import googlePartner from "../img/leads/CoreslashTechnologies-solutions-Google-Partner.webp";
import metaPartner from "../img/leads/CoreslashTechnologies-solutions-Meta-Business-Partner.webp";

import person1 from "../img/leads/CoreslashTechnologies_no_1_company_ (1).png";
import person2 from "../img/leads/CoreslashTechnologies_no_1_company_ (2).png";
import person3 from "../img/leads/CoreslashTechnologies_no_1_company_ (3).png";
import person4 from "../img/leads/CoreslashTechnologies_no_1_company_ (4).png";

import bgImage from "../img/process/CoreslashTechnologiestechnologiesstep4.avif"; // your background image


export default function LeadSection() {

    return (

        <section className="relative py-24">

            {/* BACKGROUND IMAGE */}

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(12px)",
                }}
            />

            {/* DARK OVERLAY */}

            <div className="absolute inset-0 bg-black/60 z-0" />


            {/* CONTENT */}

            <div className="relative z-10 max-w-7xl mx-auto px-4">

                <div className="grid lg:grid-cols-2 gap-10">


                    {/* LEFT */}

                    <div className="space-y-6">


                        {/* Partner cards */}

                        <div className="grid grid-cols-2 gap-6">


                            {/* Google */}

                            <div className="glass-card">

                                <h3 className="glass-title">

                                    Google Ads Partner

                                </h3>

                                <div className="glass-img">

                                    <img src={googlePartner} />

                                </div>

                            </div>


                            {/* Meta */}

                            <div className="glass-card">

                                <h3 className="glass-title">

                                    Meta Ads Partner

                                </h3>

                                <div className="glass-img">

                                    <img src={metaPartner} />

                                </div>

                            </div>


                        </div>



                        {/* Rating Card */}

                        <div className="glass-card-full">


                            <h3 className="glass-title">

                                Best Digital Marketing Agency

                            </h3>


                            <div className="flex items-center gap-6 mt-4">


                                {/* avatars */}

                                <div className="flex -space-x-3">

                                    <img src={person1} className="avatar" />

                                    <img src={person2} className="avatar" />

                                    <img src={person3} className="avatar" />

                                    <img src={person4} className="avatar" />

                                </div>



                                {/* stars */}

                                <div>

                                    <div className="flex items-center">


                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className="star">?</span>
                                        ))}

                                        <span className="star half">?</span>


                                    </div>


                                    <p className="text-gray-200 text-sm">

                                        From Happy Clients

                                    </p>


                                </div>


                            </div>


                        </div>


                    </div>




                    {/* RIGHT FORM */}

                    <div className="glass-form">


                        <h3 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
                            Book Your 30 Minutes
                            <span className="relative inline-block ml-2">
                                {/* Soft Glow behind the text */}
                                <span className="absolute -inset-1 bg-orange-600/20 blur-xl rounded-full animate-pulse" />

                                {/* The Text */}
                                <span className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 bg-clip-text text-transparent font-black italic drop-shadow-sm text-5xl">
                                    FREE
                                </span>
                            </span>
                            <span className="text-white"> Session</span>
                        </h3>



                        <form className="space-y-4">


                            <input className="glass-input" placeholder="Full Name" />

                            <input className="glass-input" placeholder="Contact Number" />

                            <input className="glass-input" placeholder="City" />


                            <select className="glass-input text-white bg-transparent">

                                <option className="text-black bg-white">Select Service</option>

                                <option className="text-black bg-white">New Website Development</option>

                                <option className="text-black bg-white">Website Re-Designing</option>

                                <option className="text-black bg-white">Social Media Management</option>

                                <option className="text-black bg-white">Facebook (Meta) Ads</option>

                                <option className="text-black bg-white">Google Ads & PPC</option>

                                <option className="text-black bg-white">Content Creation</option>

                                <option className="text-black bg-white">Other Services</option>

                            </select>




                            <button className="glass-btn">

                                Book Session

                            </button>


                        </form>


                    </div>


                </div>

            </div>

        </section>

    );

}

