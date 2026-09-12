import { useInView } from "../hooks/useInView";
import { useGetPenthouse } from "../hooks/usePenthouse";
import Gallery from "./Gallery";

const Penthouse=()=>{

    const {ref,isInView}=useInView({rootMargin:"250px"})

    const {data:penthouseData}=useGetPenthouse(isInView);
    
    const penthouse=penthouseData?.penthouse;
    const features=penthouseData?.features;
    const media=penthouse?.penthouse_media;

    return(
        <div ref={ref} className="flex flex-col px-10 py-10 mt-10 text-white">
            {/* heading */}
            <div className="flex flex-col gap-2 ">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-sm font-normal">
                    {penthouse?.title}
                </p>
                <h1 data-aos="fade-up" data-aos-delay="200" className="title  uppercase text-5xl w-1/2 leading-tight">
                    {penthouse?.subTitle}
                </h1>
                <p data-aos="fade-up" data-aos-delay="300" className="body-text text-md text-[#C1C2CD] font-normal leading-normal w-1/2">
                    {penthouse?.description}
                </p>
            </div>

            {/* features */}
            <div className="mt-6 flex flex-row gap-4  bg-[#161513] border border-[#21211E]">
                {features?.map((feature: any, index: number)=>{
                    return(
                        <div data-aos="fade-up" data-aos-delay={index*200} key={feature.id} 
                            className="flex flex-col text-start items-start justify-center gap-2 px-4 py-4 border-r border-[#21211E] last:border-r-0 w-1/4"
                        >
                            <p className="body-text text-xs text-primary font-bold uppercase tracking-widest">
                                {feature?.title}
                            </p>
                            <p className="body-text text-xs text-white font-bold">
                                {feature?.value}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* monograph filmstrip carousel gallery */}
            <div data-aos="fade-up" data-aos-delay="300" className="mt-12">
                <Gallery media={media} />
            </div>
        </div>
    );
}

export default Penthouse;