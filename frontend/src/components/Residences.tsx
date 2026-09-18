import { ArrowRight } from "lucide-react";
import { useGetResidence } from "../hooks/useResidence";
import PropertyTypeCard from "./PropertyTypeCard";
import { useInView } from "../hooks/useInView";
import { Skeleton } from "./ui/skeleton";

const Residences = () => {
    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });

    const { data, isPending } = useGetResidence(isInView);
    const residence = data?.residence;
    const featuredProperty = data?.featuredProperty;    
    const propertyTypes = data?.propertyTypes;

    if (isPending) {
        return <ResidencesSkeleton ref={ref} />;
    }

    return (
        <div ref={ref} className="flex flex-col gap-6 sm:gap-8 lg:gap-10 py-8 sm:py-10 mt-10 sm:mt-16 lg:mt-20">
            {/* heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {residence?.title}
                </p>
                <h1 data-aos="fade-up" data-aos-delay="200" className="title uppercase text-3xl sm:text-4xl lg:text-5xl w-full lg:w-2/3 xl:w-1/2 leading-tight tracking-tight">
                    {residence?.subTitle}
                </h1>
            </div>

            {/* featured property */}
            <div className="w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 pb-6 sm:pb-8 lg:pb-10 pr-0 lg:pr-16 xl:pr-20 bg-[#F4F3F0] group overflow-hidden">
                <div className="w-full lg:max-w-[60%] h-[320px] sm:h-[420px] lg:h-[500px] xl:h-[550px] overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" src={featuredProperty?.image_url} alt={featuredProperty?.title || "Featured Residence"} />
                </div>
                <div data-aos="fade-up" data-aos-delay="500" className="flex flex-1 flex-col items-start gap-3 sm:gap-4 w-full p-5 sm:p-8 lg:p-0">
                    <p className="body-text tracking-widest text-primary uppercase text-xs">
                        Residence {featuredProperty?.display_order}
                    </p>
                    <h1 className="title text-2xl sm:text-3xl lg:text-4xl">
                        {featuredProperty?.title}
                    </h1>
                    <h2 className="title text-xl sm:text-2xl text-[#4A465D]">
                        Approx. {featuredProperty?.area}{featuredProperty?.area_unit}
                    </h2>
                    <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                        {featuredProperty?.description}
                    </p>
                    {/* features */}
                    <div className="flex flex-col mt-2 sm:mt-4 gap-2.5 sm:gap-3 w-full">
                        {featuredProperty?.features?.map((feature: any) => {
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
                    <button className="flex flex-row items-center justify-center sm:justify-start gap-2 tracking-widest text-xs sm:text-sm uppercase mt-4 sm:mt-6 lg:mt-8 px-5 py-3.5 sm:px-6 sm:py-4 bg-black text-white hover:bg-primary transition-all duration-300 cursor-pointer group/discover-btn w-full sm:w-auto">
                        Discover {featuredProperty?.title} 
                        <ArrowRight size={20} className="group-hover/discover-btn:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Property types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                {propertyTypes?.map((type: any) => {
                    return (
                        <PropertyTypeCard key={type.id} propertyType={type} />
                    );
                })}
            </div>
        </div>
    );
};

export default Residences;

const ResidencesSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <div ref={ref} className="flex flex-col gap-5 py-10 mt-20 w-full animate-pulse">
            {/* heading skeleton */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32 bg-primary/25" />
                <div className="w-full md:w-1/2 space-y-3">
                    <Skeleton className="h-10 sm:h-12 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    <Skeleton className="h-10 sm:h-12 w-3/5 bg-neutral-200 dark:bg-neutral-800" />
                </div>
            </div>

            {/* featured property skeleton */}
            <div className="w-full flex flex-col lg:flex-row items-center gap-10 pb-10 pr-0 lg:pr-20 bg-[#F4F3F0] dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="w-full lg:max-w-[60%] h-[360px] sm:h-[450px] lg:h-[550px] overflow-hidden">
                    <Skeleton className="w-full h-full rounded-none bg-neutral-300/80 dark:bg-neutral-800" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-4 p-6 lg:p-0 w-full">
                    <Skeleton className="h-3 w-28 bg-primary/30" />
                    <Skeleton className="h-8 w-3/4 bg-neutral-300 dark:bg-neutral-800" />
                    <Skeleton className="h-6 w-1/2 bg-neutral-300 dark:bg-neutral-800" />
                    
                    <div className="w-full space-y-2 mt-2">
                        <Skeleton className="h-3.5 w-full bg-neutral-300 dark:bg-neutral-800" />
                        <Skeleton className="h-3.5 w-11/12 bg-neutral-300 dark:bg-neutral-800" />
                        <Skeleton className="h-3.5 w-4/5 bg-neutral-300 dark:bg-neutral-800" />
                    </div>

                    {/* features skeleton */}
                    <div className="flex flex-col mt-4 gap-3 w-full">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex flex-row items-center justify-between">
                                <Skeleton className="h-3 w-24 bg-neutral-300 dark:bg-neutral-800" />
                                <Skeleton className="h-3 w-16 bg-neutral-300 dark:bg-neutral-800" />
                            </div>
                        ))}
                    </div>

                    {/* discover button skeleton */}
                    <Skeleton className="h-12 w-48 bg-neutral-900/80 dark:bg-neutral-700 mt-6 rounded-none" />
                </div>
            </div>

            {/* Property types grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[1, 2].map((card) => (
                    <div key={card} className="flex flex-col items-center bg-[#F4F3F0] dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
                        <div className="w-full h-[380px] sm:h-[500px] overflow-hidden">
                            <Skeleton className="w-full h-full rounded-none bg-neutral-300/80 dark:bg-neutral-800" />
                        </div>
                        <div className="flex flex-col items-start w-full py-5 px-6 sm:px-10 gap-4">
                            <Skeleton className="h-3 w-24 bg-primary/30" />
                            <Skeleton className="h-7 w-3/4 bg-neutral-300 dark:bg-neutral-800" />
                            <Skeleton className="h-5 w-1/2 bg-neutral-300 dark:bg-neutral-800" />
                            <div className="w-full space-y-2">
                                <Skeleton className="h-3.5 w-full bg-neutral-300 dark:bg-neutral-800" />
                                <Skeleton className="h-3.5 w-4/5 bg-neutral-300 dark:bg-neutral-800" />
                            </div>
                            <div className="flex flex-col mt-4 gap-3 w-full">
                                {[1, 2, 3].map((f) => (
                                    <div key={f} className="flex flex-row items-center justify-between">
                                        <Skeleton className="h-3 w-20 bg-neutral-300 dark:bg-neutral-800" />
                                        <Skeleton className="h-3 w-16 bg-neutral-300 dark:bg-neutral-800" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-8 w-40 bg-neutral-300 dark:bg-neutral-800 mt-4 rounded-none" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};