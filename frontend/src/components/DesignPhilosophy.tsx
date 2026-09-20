import { useGetDesignPhilosophy } from "../hooks/useDesignPhilosophy";
import { useInView } from "../hooks/useInView";
import { Skeleton } from "./ui/skeleton";
import type { DesignPhilosophy as DesignPhilosophyType } from "../@types/designPhilosophy";

const DesignPhilosophy = () => {
    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });
    const { data: designPhilosophy, isPending, isLoading } = useGetDesignPhilosophy(isInView); 

    if (isPending || isLoading) {
        return <DesignPhilosophySkeleton ref={ref} />;
    }

    const typedDesignPhilosophy = designPhilosophy as DesignPhilosophyType | undefined;

    return (
        <div ref={ref} className="flex flex-col gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12">
            {/* heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p data-aos="fade-up" className="text-primary tracking-widest uppercase text-xs sm:text-sm font-normal">
                    {typedDesignPhilosophy?.title}
                </p>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                    <h2 data-aos="fade-up" data-aos-delay="150" className="title uppercase text-3xl sm:text-4xl lg:text-5xl w-full lg:w-3/5 leading-[1.15] tracking-tight text-neutral-900 dark:text-white">
                        {typedDesignPhilosophy?.subTitle}
                    </h2>
                    <p data-aos="fade-up" data-aos-delay="250" className="body-text text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed w-full lg:w-2/5 lg:max-w-xl">
                        {typedDesignPhilosophy?.description}
                    </p>
                </div>
            </div>

            {/* body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch w-full">
                {/* left */}
                <div 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    className="lg:col-span-5 xl:col-span-5 group relative w-full h-[360px] sm:h-[460px] lg:h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800"
                >
                    <img 
                        src={typedDesignPhilosophy?.image_url}
                        alt={typedDesignPhilosophy?.title || "Design Philosophy"}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to1-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* right */}
                <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 h-full">
                        {typedDesignPhilosophy?.design_philosophy_principles?.map((item, index) => (
                            <div 
                                data-aos="fade-up" 
                                data-aos-delay={index * 120}
                                key={item.id ?? index} 
                                className="group/card relative flex flex-col justify-between p-6 sm:p-7 bg-[#F4F3F0]/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-[#F4F3F0] dark:hover:bg-neutral-900 transition-all duration-300 min-h-[170px]"
                            >
                                <div>
                                    {/* index number and top line */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <span className="title text-2xl sm:text-3xl text-primary/80 group-hover/card:text-primary transition-colors duration-300 font-normal">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800 group-hover/card:bg-primary/40 transition-colors duration-300" />
                                    </div>

                                    {/* title */}
                                    <h3 className="title uppercase text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-normal tracking-wide group-hover/card:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* description */}
                                {item.description && (
                                    <p className="body-text text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-3">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignPhilosophy;

export const DesignPhilosophySkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <section ref={ref} className="flex flex-col gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12 w-full animate-pulse">
            {/* heading skeleton */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-32 bg-primary/25" />
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                    <div className="w-full lg:w-3/5 space-y-3">
                        <Skeleton className="h-9 sm:h-12 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-9 sm:h-12 w-3/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                    <div className="w-full lg:w-2/5 space-y-2.5">
                        <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                </div>
            </div>

            {/* body skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch w-full">
                {/* left image skeleton */}
                <div className="lg:col-span-5 xl:col-span-5 relative w-full h-[360px] sm:h-[460px] lg:h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/80 overflow-hidden">
                    <Skeleton className="w-full h-full rounded-none bg-neutral-200/80 dark:bg-neutral-800/80" />
                    <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 flex items-center gap-2">
                        <Skeleton className="h-7 w-36 bg-white/20 dark:bg-white/10" />
                    </div>
                </div>

                {/* right principles skeleton */}
                <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 h-full">
                    {[0, 1, 2, 3].map((index) => (
                        <div 
                            key={index} 
                            className="p-6 sm:p-7 bg-[#F4F3F0]/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 flex flex-col justify-between min-h-[170px]"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <Skeleton className="h-7 w-10 bg-primary/25" />
                                    <Skeleton className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                                </div>
                                <Skeleton className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800" />
                            </div>
                            <div className="space-y-2 mt-4">
                                <Skeleton className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800" />
                                <Skeleton className="h-3.5 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};