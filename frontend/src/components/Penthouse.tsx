import { useInView } from "../hooks/useInView";
import { useGetPenthouse } from "../hooks/usePenthouse";
import Gallery from "./Gallery";
import { Skeleton } from "./ui/skeleton";

const Penthouse = () => {
    const { ref, isInView } = useInView({ rootMargin: "250px" });

    const { data: penthouseData, isPending } = useGetPenthouse(isInView);
    
    const penthouse = penthouseData?.penthouse;
    const features = penthouseData?.features;
    const media = penthouse?.penthouse_media;

    if (isPending) {
        return <PenthouseSkeleton ref={ref} />;
    }

    const featureCount = features?.length || 0;

    const getFeaturesGridCols = () => {
        if (featureCount <= 2) return "grid-cols-1 sm:grid-cols-2";
        if (featureCount === 3) return "grid-cols-1 sm:grid-cols-3";
        if (featureCount === 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
    };

    const featuresGridCols = getFeaturesGridCols();

    return (
        <div ref={ref} className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20 mt-6 sm:mt-10 text-white max-w-7xl mx-auto w-full">
            {/* heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {penthouse?.title}
                </p>
                <h1 data-aos="fade-up" data-aos-delay="200" className="title uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full lg:w-3/4 xl:w-2/3 leading-tight">
                    {penthouse?.subTitle}
                </h1>
                <p data-aos="fade-up" data-aos-delay="300" className="body-text text-sm sm:text-base text-[#C1C2CD] font-normal leading-relaxed w-full lg:w-3/4 xl:w-2/3">
                    {penthouse?.description}
                </p>
            </div>

            {/* features */}
            {features && features.length > 0 && (
                <div className={`mt-8 sm:mt-10 grid ${featuresGridCols} gap-px bg-[#161513] border border-[#21211E]`}>
                    {features.map((feature: any, index: number) => {
                        return (
                            <div 
                                data-aos="fade-up" 
                                data-aos-delay={index * 150} 
                                key={feature.id} 
                                className="flex flex-col text-start items-start justify-center gap-1.5 p-3.5 sm:p-5 border-r border-[#21211E] last:border-r-0"
                            >
                                <p className="body-text text-[10px] sm:text-xs text-primary font-bold uppercase tracking-widest">
                                    {feature?.title}
                                </p>
                                <p className="body-text text-xs sm:text-sm text-white font-bold">
                                    {feature?.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* monograph filmstrip carousel gallery */}
            <div data-aos="fade-up" data-aos-delay="300" className="mt-8 sm:mt-12 w-full">
                <Gallery media={media} />
            </div>
        </div>
    );
};

export default Penthouse;

const PenthouseSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <div ref={ref} className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20 mt-6 sm:mt-10 text-white w-full max-w-7xl mx-auto animate-pulse">
            {/* heading skeleton */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <Skeleton className="h-4 w-32 bg-primary/25" />
                <div className="w-full lg:w-3/4 xl:w-2/3 space-y-3">
                    <Skeleton className="h-8 sm:h-10 md:h-12 w-4/5 bg-neutral-800" />
                    <Skeleton className="h-8 sm:h-10 md:h-12 w-3/5 bg-neutral-800" />
                </div>
                <div className="w-full lg:w-3/4 xl:w-2/3 space-y-2 mt-2">
                    <Skeleton className="h-4 w-full bg-neutral-800" />
                    <Skeleton className="h-4 w-11/12 bg-neutral-800" />
                    <Skeleton className="h-4 w-4/5 bg-neutral-800" />
                </div>
            </div>

            {/* features skeleton */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#21211E] border border-[#21211E]">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div 
                        key={item}
                        className="flex flex-col text-start items-start justify-center gap-1.5 p-3.5 sm:p-5 bg-[#161513]"
                    >
                        <Skeleton className="h-3 w-20 bg-primary/30" />
                        <Skeleton className="h-4 w-28 bg-neutral-800" />
                    </div>
                ))}
            </div>

            {/* monograph filmstrip carousel gallery skeleton */}
            <div className="mt-8 sm:mt-12 flex flex-col gap-4 w-full">
                <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[550px] bg-[#161513] border border-[#21211E] overflow-hidden">
                    <Skeleton className="w-full h-full rounded-none bg-neutral-900" />
                    <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
                        <Skeleton className="h-3 w-20 bg-primary/30" />
                        <Skeleton className="h-6 w-48 sm:w-64 bg-neutral-800" />
                        <Skeleton className="h-3.5 w-60 sm:w-80 bg-neutral-800/80" />
                    </div>
                </div>

                {/* thumbnail filmstrip skeleton */}
                <div className="flex gap-4 overflow-hidden pt-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton 
                            key={i} 
                            className="h-16 sm:h-20 w-24 sm:w-32 shrink-0 rounded-none bg-[#161513] border border-[#21211E]" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};