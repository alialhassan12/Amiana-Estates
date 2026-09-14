import type { EstateExperienceCardData } from "../@types/estateExperience";

const EstateExperienceCard=({card}:{
    card:EstateExperienceCardData,
})=>{
    return (
        <div className="w-full h-[550px] flex flex-row items-center gap-10 mb-10 mt-10 pr-20 bg-[#F4F3F0] group">
            <div className="relative max-w-[60%] w-full h-full overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    src={card?.card_image_url}
                />
                {card?.card_image_heading && (
                    <div className="absolute p-4 bg-black text-primary bottom-4 left-4">
                        <p className="text-xs font-semibold tracking-widest uppercase">{card?.card_image_heading}</p>
                    </div>
                )}
            </div>
            
            <div data-aos="fade-up" data-aos-delay="500" className="flex flex-1 flex-col items-start gap-4">
                <p className="body-text tracking-widest text-primary uppercase text-xs">
                    {card?.card_title}
                </p>
                {
                    card?.card_quote &&(
                        <h1 className="title text-3xl italic">
                            "{card?.card_quote}"
                        </h1>
                    )
                }
                <p className="body-text text-[#504C51] text-sm leading-relaxed">
                    {card?.card_description}
                </p>
            </div>
        </div>
    );
}

export default EstateExperienceCard;