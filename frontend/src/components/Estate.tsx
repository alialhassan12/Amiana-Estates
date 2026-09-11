import image from "../assets/images/estate2.jpeg"
import { useGetEstate } from "../hooks/useEstate";

const Estate=()=>{

    const {data:estate}=useGetEstate();

    const stats=[
        {
            "key":"Level of Architecture",
            "value":estate?.levelOfArchitecture
        },
        {
            "key":"Residencies",
            "value":estate?.totalResidences
        },
        {
            "key":"Crown Penthouses",
            "value":estate?.propertyTypeArea
        },
    ];

    return(
        <div className="flex flex-col gap-5 py-10">
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
                            stats.map((item,index)=>(
                                <div data-aos="fade-up" data-aos-delay={index*200} className="flex flex-col items-center " key={index}>
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