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

    return (
        <div ref={ref} className="flex flex-col px-10 py-20 mt-10 text-white">
            {/* heading */}
            <div className="flex flex-col gap-2 ">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-sm font-normal">
                    {penthouse?.title}
                </p>
                <h1 data-aos="fade-up" data-aos-delay="200" className="title uppercase text-5xl w-1/2 leading-tight">
                    {penthouse?.subTitle}
                </h1>
                <p data-aos="fade-up" data-aos-delay="300" className="body-text text-md text-[#C1C2CD] font-normal leading-normal w-1/2">
                    {penthouse?.description}
                </p>
            </div>

            {/* features */}
            <div className="mt-6 flex flex-row gap-4 bg-[#161513] border border-[#21211E]">
                {features?.map((feature: any, index: number) => {
                    return (
                        <div data-aos="fade-up" data-aos-delay={index * 200} key={feature.id} 
                            className="flex flex-col text-start items-start justify-center gap-2 px-4 py-4 border-r border-[#21211E] last:border-r-0 w-1/4"
                        >
                            <p className="body-text text-xs text-primary font-bold uppercase tracking-widest">
                                {feature?.title}
                            </p>
                            <p className="body-text text-xs text-white font-bold">
                                {feature?.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* monograph filmstrip carousel gallery */}
            <div data-aos="fade-up" data-aos-delay="300" className="mt-12">
                <Gallery media={media} />
            </div>
        </div>
    );
};

export default Penthouse;

const PenthouseSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <div ref={ref} className="flex flex-col px-10 py-10 mt-10 text-white w-full animate-pulse">
            {/* heading skeleton */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32 bg-primary/25" />
                <div className="w-full lg:w-1/2 space-y-3">
                    <Skeleton className="h-10 sm:h-12 w-4/5 bg-neutral-800" />
                    <Skeleton className="h-10 sm:h-12 w-3/5 bg-neutral-800" />
                </div>
                <div className="w-full lg:w-1/2 space-y-2 mt-2">
                    <Skeleton className="h-4 w-full bg-neutral-800" />
                    <Skeleton className="h-4 w-11/12 bg-neutral-800" />
                    <Skeleton className="h-4 w-4/5 bg-neutral-800" />
                </div>
            </div>

            {/* features skeleton */}
            <div className="mt-6 flex flex-row gap-4 bg-[#161513] border border-[#21211E]">
                {[1, 2, 3, 4].map((item) => (
                    <div 
                        key={item}
                        className="flex flex-col text-start items-start justify-center gap-2 px-4 py-4 border-r border-[#21211E] last:border-r-0 w-1/4"
                    >
                        <Skeleton className="h-3 w-20 bg-primary/30" />
                        <Skeleton className="h-4 w-28 bg-neutral-800" />
                    </div>
                ))}
            </div>

            {/* monograph filmstrip carousel gallery skeleton */}
            <div className="mt-12 flex flex-col gap-4">
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-[#161513] border border-[#21211E] overflow-hidden">
                    <Skeleton className="w-full h-full rounded-none bg-neutral-900" />
                    <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
                        <Skeleton className="h-3 w-20 bg-primary/30" />
                        <Skeleton className="h-6 w-64 bg-neutral-800" />
                        <Skeleton className="h-3.5 w-80 bg-neutral-800/80" />
                    </div>
                </div>

                {/* thumbnail filmstrip skeleton */}
                <div className="flex gap-4 overflow-hidden pt-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton 
                            key={i} 
                            className="h-20 w-32 shrink-0 rounded-none bg-[#161513] border border-[#21211E]" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};