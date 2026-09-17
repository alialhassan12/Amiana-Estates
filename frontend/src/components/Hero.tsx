import { useGetHero } from "../hooks/useHero";

const Hero = () => {
    const { data: heroData } = useGetHero();
    const hero = heroData?.hero;

    const words: string[] = (hero?.hero_title || "").trim().split(/\s+/).filter(Boolean);
    const isVideo = hero?.hero_media_type === "video" || 
        (typeof hero?.hero_media_url === "string" && (
            hero.hero_media_url.endsWith(".mp4") || 
            hero.hero_media_url.endsWith(".webm") || 
            hero.hero_media_url.endsWith(".mov")
        ));

    return (
        <section className="w-full min-h-screen flex flex-col justify-center relative px-6 sm:px-10 md:px-16 lg:px-20 py-20 mb-10 overflow-hidden">
            {/* Background Media */}
            {isVideo ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={hero?.hero_media_url}
                />
            ) : hero?.hero_media_url ? (
                <img
                    src={hero?.hero_media_url}
                    alt={hero?.hero_title || "Amiana Estates"}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-0" />
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl">
                {/* Main heading */}
                <h1 data-aos="fade-up" data-aos-delay="200" className="title font-normal text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 leading-tight break-words">
                    {words.map((word, index) => {
                        if (index === words.length - 1) {
                            return (
                                <span key={index} className="italic text-primary ml-1.5 sm:ml-2 inline-block">
                                    {word}
                                </span>
                            );
                        }
                        return <span key={index}>{word}{" "}</span>;
                    })}
                </h1>

                {/* Subtext */}
                <p data-aos="fade-up" data-aos-delay="300" className="body-text text-sm sm:text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
                    {hero?.hero_description}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8"> 
                    {hero?.hero_cta1_text && (
                        <button 
                            // data-aos="fade-up" 
                            // data-aos-delay="400" 
                            onClick={() => hero?.hero_cta1_url && window.open(hero.hero_cta1_url, '_blank')}
                            className="bg-white py-3 px-6 text-xs sm:text-sm text-black hover:bg-primary hover:text-white transition-all cursor-pointer duration-300 font-medium uppercase tracking-wider text-center"
                        >
                            {hero.hero_cta1_text}
                        </button>
                    )}
                    {hero?.hero_cta2_text && (
                        <button 
                            // data-aos="fade-up" 
                            // data-aos-delay="500" 
                            onClick={() => hero?.hero_cta2_url && window.open(hero.hero_cta2_url, '_blank')}
                            className="bg-white/20 backdrop-blur-xl text-xs sm:text-sm py-3 px-6 text-white hover:bg-white hover:text-black transition-all cursor-pointer duration-300 font-medium uppercase tracking-wider text-center"
                        >
                            {hero.hero_cta2_text}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
