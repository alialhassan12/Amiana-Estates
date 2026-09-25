import type { EstateExperienceCardData } from "../@types/estateExperience";

const EstateExperienceCard = ({ card }: { card: EstateExperienceCardData }) => {
    return (
        <div className="w-full h-auto lg:h-[550px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 my-8 sm:my-10 pr-0 lg:pr-20 bg-[#F4F3F0] group overflow-hidden">
            <div className="relative w-full lg:max-w-[60%] h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden shrink-0">
                {card?.card_image_url ? (
                    <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        src={card?.card_image_url}
                        alt={card?.card_title || "Estate Experience"}
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 uppercase text-xs tracking-wider">
                        No Image Available
                    </div>
                )}
                {card?.card_image_heading && (
                    <div className="absolute p-3 sm:p-4 bg-black text-primary bottom-3 sm:bottom-4 left-3 sm:left-4 max-w-[90%]">
                        <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase truncate sm:whitespace-normal">
                            {card?.card_image_heading}
                        </p>
                    </div>
                )}
            </div>

            <div
                data-aos="fade-up"
                data-aos-delay="500"
                className="flex flex-1 flex-col items-start gap-3 sm:gap-4 p-5 sm:p-8 lg:p-0 w-full"
            >
                <p className="body-text tracking-widest text-primary uppercase text-xs">
                    {card?.card_title}
                </p>
                {card?.card_quote && (
                    <h1 className="title text-2xl sm:text-3xl italic leading-snug">
                        "{card?.card_quote}"
                    </h1>
                )}
                <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                    {card?.card_description}
                </p>
            </div>
        </div>
    );
};

export default EstateExperienceCard;
