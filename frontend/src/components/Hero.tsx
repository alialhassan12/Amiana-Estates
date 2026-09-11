import vid1 from "../assets/videos/vid1.mp4";
import { useGetHero } from "../hooks/useHero";

const Hero=()=>{

    const {data:heroData}=useGetHero();
    const hero=heroData?.hero;


    return(
        <section className="w-full min-h-screen flex flex-col justify-center relative px-10 mb-10 ">
            {/* Video background */}
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source
                    src={vid1}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video> */}

            {/* image */}
            <img
                src={hero?.hero_media_url}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Content */}
            <div className="relative z-20  max-w-7xl ">
                {/* Main heading */}
                <h1 data-aos="fade-up" data-aos-delay="200" className="title font-normal text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6">
                    {
                        hero?.hero_title.split(' ').map((word,index)=>{
                            if(index===hero?.hero_title.split(' ').length-1){
                                return (
                                    <span key={index} className="italic text-primary ml-2">{word}&nbsp;</span>
                                )
                            }else{
                                return (
                                    <span key={index}>{word}&nbsp;</span>
                                )
                            }
                        })
                    }
                </h1>

                {/* Subtext */}
                <p data-aos="fade-up" data-aos-delay="300" className="body-text text-lg text-white/70 max-w-lg">
                    {hero?.hero_description}
                </p>

                <div className="flex flex-row items-center gap-2 mt-6"> 
                    <button data-aos="fade-up" data-aos-delay="400" 
                        onClick={()=>window.open(hero?.hero_cta1_url,'_blank')}
                        className="bg-white py-3 px-6 text-sm text-black hover:bg-primary hover:text-white transition-all cursor-pointer duration-300 font-medium uppercase"
                    >
                        {hero?.hero_cta1_text}
                    </button>
                    <button data-aos="fade-up" data-aos-delay="500" 
                        onClick={()=>window.open(hero?.hero_cta2_url,'_blank')}
                        className="bg-white/20 backdrop-blur-xl text-sm py-3 px-6 text-white hover:bg-white hover:text-black transition-all cursor-pointer duration-300 font-medium uppercase"
                    >
                        {hero?.hero_cta2_text}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;