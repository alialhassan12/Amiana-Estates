import { ArrowRight } from "lucide-react";
import { useGetResidence } from "../hooks/useResidence";
import PropertyTypeCard from "./PropertyTypeCard";
import { useInView } from "../hooks/useInView";

const Residences=()=>{

    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });
    

    const {data}=useGetResidence(isInView);
    console.log(data);
    const residence=data?.residence;
    const featuredProperty=data?.featuredProperty;    
    const propertyTypes=data?.propertyTypes;

    return(
        <div ref={ref} className="flex flex-col gap-5 py-10 mt-20">
            {/* heading */}
            <div className="flex flex-col gap-2 ">
                <p data-aos="fade-up" className="text-primary tracking-wider uppercase text-sm font-normal">
                    {residence?.title}
                </p>
                <h1 data-aos="fade-up" data-aos-delay="200" className="title uppercase text-5xl w-1/2 leading-tight">
                    {residence?.subTitle}
                </h1>
            </div>

            {/* featured property */}
            <div className="w-full flex flex-row items-center gap-10 pb-10 pr-20 bg-[#F4F3F0] group">
                <div className="max-w-[60%] w-full h-full overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" src={featuredProperty?.image_url} alt="" />
                </div>
                <div data-aos="fade-up" data-aos-delay="500" className="flex flex-1 flex-col items-start gap-4">
                    <p className="body-text tracking-widest text-primary uppercase text-xs">
                        Residence {featuredProperty?.display_order}
                    </p>
                    <h1 className="title text-3xl">
                        {featuredProperty?.title}
                    </h1>
                    <h2 className="title text-2xl text-[#4A465D]">
                        Approx. {featuredProperty?.area}{featuredProperty?.area_unit}
                    </h2>
                    <p className="body-text text-[#504C51] text-sm leading-relaxed">
                        {featuredProperty?.description}
                    </p>
                    {/* features */}
                    <div className="flex flex-col mt-4 gap-3 w-full">
                        {featuredProperty?.features?.map((feature)=>{
                            return(
                                <div key={feature.id} className="flex flex-row items-center justify-between">
                                    <p className="body-text text-[#504C51] font-semibold text-xs">
                                        {feature?.title}
                                    </p>
                                    <p className="body-text text-xs ">
                                        {feature?.value}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* discover button */}
                    <button className="flex flex-row items-center gap-2 tracking-widest text-sm uppercase mt-8 px-3 py-4 bg-black text-white hover:bg-primary transition-all duration-300 cursor-pointer group/discover-btn">
                        Discover {featuredProperty?.title} 
                        <ArrowRight size={24} className="group-hover/discover-btn:translate-x-1 transition-transform duration-300"/>
                    </button>
                </div>
            </div>

            {/* Property tyes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                {propertyTypes?.map((type)=>{
                    return(
                        <PropertyTypeCard key={type.id} propertyType={type}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Residences;