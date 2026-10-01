import { useGetDifference } from "../hooks/useDifference";
import { useInView } from "../hooks/useInView";
import { Skeleton } from "./ui/skeleton";
import type { Difference as DifferenceType } from "../@types/difference";


const Difference = () => {
    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });
    const { data: differenceData, isLoading, isPending } = useGetDifference(isInView);
    const difference = differenceData?.difference as DifferenceType | undefined;
    console.log(difference);

    if (isLoading || isPending) {
        return <DifferenceSkeleton ref={ref} />;
    }

    const currentImage =difference?.image_url;

    return (
        <section
            ref={ref}
            className="relative w-full py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* Left Editorial Narrative Column */}
                <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
                    {/* Category Pre-heading */}
                    <div
                        data-aos="fade-up"
                        className="inline-flex items-center gap-2 mb-3 sm:mb-4"
                    >
                        <p className="text-primary tracking-widest uppercase text-xs sm:text-sm font-medium">
                            {difference?.title }
                        </p>
                    </div>

                    {/* Headline */}
                    <h2
                        data-aos="fade-up"
                        data-aos-delay="120"
                        className="title uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-neutral-900 dark:text-white max-w-2xl"
                    >
                        {difference?.subTitle }
                    </h2>

                    {/* Narrative Description */}
                    <p
                        data-aos="fade-up"
                        data-aos-delay="220"
                        className="body-text text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-4 sm:mt-6 max-w-2xl"
                    >
                        {difference?.description }
                    </p>
                </div>

                {/* Right Visual Showcase Column */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="lg:col-span-6 xl:col-span-5 relative w-full group"
                >
                    {/* Image Container */}
                    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl">
                        <img
                            src={currentImage}
                            alt={difference?.title || "Amiana Estates Difference"}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />

                        {/* Luxury Gradient Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Difference;

export const DifferenceSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <section
            ref={ref}
            className="w-full py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12 animate-pulse"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* Left Skeleton */}
                <div className="lg:col-span-6 xl:col-span-7 space-y-4">
                    <Skeleton className="h-4 w-36 bg-primary/25" />
                    <Skeleton className="h-10 sm:h-12 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    <Skeleton className="h-10 sm:h-12 w-3/5 bg-neutral-200 dark:bg-neutral-800" />
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
                        {[0, 1, 2].map((i) => (
                            <Skeleton
                                key={i}
                                className="h-20 bg-neutral-200/80 dark:bg-neutral-800/80"
                            />
                        ))}
                    </div>
                </div>

                {/* Right Image Skeleton */}
                <div className="lg:col-span-6 xl:col-span-5 relative">
                    <Skeleton className="w-full h-[320px] sm:h-[420px] lg:h-[500px] bg-neutral-200 dark:bg-neutral-800" />
                </div>
            </div>
        </section>
    );
};