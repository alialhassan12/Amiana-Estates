import { ArrowUpRight } from "lucide-react";
import type { PropertyType } from "../@types/propertyType";

const PropertyTypeCard = ({ propertyType }: { propertyType: PropertyType }) => {
    return (
        <div className="flex flex-col items-center bg-[#F4F3F0] group">
            <div className="w-full h-[320px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    src={propertyType.image_url} 
                    alt={propertyType.title || "Property Type"} 
                />
            </div>
            <div className="flex flex-col items-start w-full py-5 px-5 sm:px-8 lg:px-10 gap-3 sm:gap-4">
                <p className="body-text tracking-widest text-primary uppercase text-xs">
                    Residence {propertyType?.display_order}
                </p>
                <h1 className="title text-2xl sm:text-3xl">
                    {propertyType?.title}
                </h1>
                <h2 className="title text-xl sm:text-2xl text-[#4A465D]">
                    Approx. {propertyType?.area}{propertyType?.area_unit}
                </h2>
                <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                    {propertyType?.description}
                </p>
                {/* features */}
                <div className="flex flex-col mt-2 sm:mt-4 gap-2.5 sm:gap-3 w-full">
                    {propertyType?.features?.map((feature) => {
                        return (
                            <div key={feature.id} className="flex flex-row items-center justify-between">
                                <p className="body-text text-[#504C51] font-semibold text-xs">
                                    {feature?.title}
                                </p>
                                <p className="body-text text-xs">
                                    {feature?.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* discover button */}
                <button className="flex flex-row items-center gap-2 text-xs sm:text-sm uppercase mt-6 sm:mt-8 tracking-widest text-black hover:text-primary transition-all duration-300 cursor-pointer group/discover-btn">
                    Discover {propertyType?.title} 
                    <ArrowUpRight 
                        size={22} 
                        className="text-black group-hover/discover-btn:translate-x-1 group-hover/discover-btn:-translate-y-1 group-hover/discover-btn:text-primary transition-transform duration-300"
                    />
                </button>
            </div>
        </div>
    );
};

export default PropertyTypeCard;