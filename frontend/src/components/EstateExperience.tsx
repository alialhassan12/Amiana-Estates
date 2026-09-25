import { useGetEstateExperience } from "../hooks/useEstateExperience";
import { useInView } from "../hooks/useInView";
import EstateExperienceCard from "./EstateExperienceCard";
import {
    CircleParking,
    Shield,
    Video,
    ArrowUpDown,
    PhoneCall,
    Zap,
    Droplet,
    Wifi,
    Eye,
    Store
} from "lucide-react"

const iconMap= {
    CircleParking,
    Shield,
    Video,
    ArrowUpDown,
    PhoneCall,
    Zap,
    Droplet,
    Wifi,
    Eye,
    Store,
};

const EstateExperience=()=>{
    const {ref,isInView}=useInView({rootMargin:"250px"});
    const {data,isPending}=useGetEstateExperience(isInView);
    const estateExperience=data?.estateExperience;

    // split specifications into two columns
    const specifications=estateExperience?.specifications || [];
    const firstColumnSpecifications=specifications.slice(0,Math.ceil(specifications.length/2));
    const secondColumnSpecifications=specifications.slice(Math.ceil(specifications.length/2));


    if(isPending){
        return(
            <EstateExperienceSkeleton ref={ref}/>
        );
    }

    return (
        <div ref={ref} className="flex flex-col py-10 sm:py-16 md:py-20 w-full">
            {/* heading */}
            <div className="flex flex-col gap-2 pb-5">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {estateExperience?.title}
                </p>
                <h1
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="title uppercase text-3xl sm:text-4xl md:text-5xl w-full md:w-3/4 lg:w-1/2 leading-tight"
                >
                    {estateExperience?.subTitle}
                </h1>
            </div>

            {/* card 1 */}
            <EstateExperienceCard
                card={{
                    card_image_url: estateExperience?.card_1_image_url || "",
                    card_image_heading: estateExperience?.card_1_image_heading,
                    card_title: estateExperience?.card_1_title || "",
                    card_quote: estateExperience?.card_1_quote,
                    card_description: estateExperience?.card_1_description || "",
                }}
            />

            {/* specifications */}
            <div className="flex flex-col mt-6 sm:mt-10 w-full pb-5 mb-5">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-5 gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                            {estateExperience?.specifications_title}
                        </p>
                        <h1 className="title text-2xl sm:text-3xl tracking-wider leading-tight">
                            {estateExperience?.specifications_subTitle}
                        </h1>
                    </div>
                    <p className="body-text w-full md:w-1/3 lg:w-1/4 leading-normal text-xs sm:text-sm text-[#504C51]">
                        {estateExperience?.specifications_description}
                    </p>
                </div>
                <div className="mt-8 sm:mt-10 border-t border-b flex flex-col md:flex-row w-full md:gap-4 lg:gap-8 divide-y md:divide-y-0">
                    {/* first col */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        {firstColumnSpecifications.map((specification: any, index: number) => {
                            const Icon = iconMap[specification?.icon as keyof typeof iconMap];
                            return (
                                <div
                                    key={specification.id}
                                    className="flex flex-row items-center justify-between border-b p-3.5 sm:p-4 last:border-b-0 w-full hover:bg-[#F4F3F0] transition-colors duration-200 group"
                                >
                                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                                        <p className="body-text text-xs sm:text-sm text-primary font-mono shrink-0">
                                            {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="body-text text-xs sm:text-sm font-bold tracking-widest uppercase">
                                                {specification?.title}
                                            </p>
                                            <p className="body-text text-[11px] sm:text-[13px] text-[#504C51]">
                                                {specification?.short_description}
                                            </p>
                                        </div>
                                    </div>
                                    {Icon && (
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-black transition-colors duration-200 shrink-0 ml-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* second col */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        {secondColumnSpecifications.map((specification: any, index: number) => {
                            const Icon = iconMap[specification?.icon as keyof typeof iconMap];
                            return (
                                <div
                                    key={specification.id}
                                    className="flex flex-row items-center justify-between border-b p-3.5 sm:p-4 last:border-b-0 w-full hover:bg-[#F4F3F0] transition-colors duration-200 group"
                                >
                                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                                        <p className="body-text text-xs sm:text-sm text-primary font-mono shrink-0">
                                            {firstColumnSpecifications.length + index + 1 < 10
                                                ? "0" + (firstColumnSpecifications.length + index + 1)
                                                : firstColumnSpecifications.length + index + 1}
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="body-text text-xs sm:text-sm font-bold tracking-widest uppercase">
                                                {specification?.title}
                                            </p>
                                            <p className="body-text text-[11px] sm:text-[13px] text-[#504C51]">
                                                {specification?.short_description}
                                            </p>
                                        </div>
                                    </div>
                                    {Icon && (
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-black transition-colors duration-200 shrink-0 ml-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* card 2 */}
            <EstateExperienceCard
                card={{
                    card_image_url: estateExperience?.card_2_image_url || "",
                    card_title: estateExperience?.card_2_title || "",
                    card_description: estateExperience?.card_2_description || "",
                }}
            />

            {/* closing statement */}
            <div className="mt-8 sm:mt-10 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-2 border-primary bg-[#F4F3F0] p-5 sm:p-7 md:p-8">
                <div className="flex-1">
                    <div className="flex flex-col gap-1">
                        <p className="body-text tracking-widest text-primary uppercase text-xs">
                            {estateExperience?.closing_title}
                        </p>
                        <h1 className="title text-xl sm:text-2xl italic leading-snug">
                            " {estateExperience?.closing_statement} "
                        </h1>
                    </div>
                </div>
                <div className="w-full md:w-auto shrink-0 flex justify-start md:justify-end">
                    <button
                        className="w-full md:w-auto bg-black py-3 px-6 text-xs sm:text-sm text-white hover:bg-primary hover:text-white transition-all cursor-pointer duration-300 font-medium uppercase text-center"
                    >
                        Schedule Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EstateExperience;

const EstateExperienceSkeleton=({ ref }: { ref?: React.Ref<HTMLDivElement> })=>{
    return(
        <div ref={ref}>
            
        </div>
    );
}