import { useGetEstate } from "../hooks/useEstate";
import { useInView } from "../hooks/useInView";
import { Skeleton } from "./ui/skeleton";

const Estate = () => {
    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });

    const { data: estate, isPending } = useGetEstate(isInView);

    const stats = [
        {
            "key": "Level of Architecture",
            "value": estate?.levelOfArchitecture
        },
        {
            "key": "Residencies",
            "value": estate?.totalResidences
        },
        {
            "key": "Crown Penthouses",
            "value": estate?.propertyTypeArea
        },
    ];

    if (isPending) {
        return <EstateSkeleton ref={ref} />;
    }

    return (
        <div ref={ref} className="flex flex-col gap-5 py-10">
            {/* heading */}
            <div className="flex flex-col gap-2 ">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-sm font-normal">
                    {estate?.estate?.title}
                </p>
                <div className="flex flex-row items-center justify-between ">
                    <h1 data-aos="fade-up" data-aos-delay="200" className="title uppercase text-5xl w-1/2 leading-tight">
                        {estate?.estate?.subTitle}
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="300" className="body-text text-md font-normal leading-normal w-1/2 text-gray-900">
                        {estate?.estate?.description}
                    </p>
                </div>
            </div>

            {/* body */}
            <div className="relative w-full h-dvh overflow-hidden group">
                <img 
                    src={estate?.estate?.media_url}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                <div className="absolute w-full bottom-0 py-10 z-20 bg-black/20 backdrop-blur-sm">
                    <div className="flex flex-row items-center justify-evenly">
                        {
                            stats.map((item, index) => (
                                <div data-aos="fade-up" data-aos-delay={index * 200} className="flex flex-col items-center " key={index}>
                                    <h1 className="title text-5xl text-white font-normal">{item.value}</h1>
                                    <p className="body-text text-sm text-primary uppercase">{item.key}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estate;

const EstateSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <div ref={ref} className="flex flex-col gap-5 py-10 w-full animate-pulse">
            {/* heading skeleton */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-32 bg-primary/25" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-3">
                        <Skeleton className="h-10 sm:h-12 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-10 sm:h-12 w-3/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-2.5">
                        <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                </div>
            </div>

            {/* body image skeleton */}
            <div className="relative w-full h-dvh overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50">
                <Skeleton className="w-full h-full rounded-none bg-neutral-200/70 dark:bg-neutral-800/70" />
                
                {/* stats bar skeleton */}
                <div className="absolute w-full bottom-0 py-10 z-20 bg-black/30 backdrop-blur-sm border-t border-white/10">
                    <div className="flex flex-row items-center justify-evenly">
                        {[0, 1, 2].map((index) => (
                            <div className="flex flex-col items-center gap-2.5" key={index}>
                                <Skeleton className="h-10 sm:h-12 w-20 sm:w-28 bg-white/20" />
                                <Skeleton className="h-3.5 w-24 sm:w-36 bg-primary/40" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};