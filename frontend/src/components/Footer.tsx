import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useGetHero } from "../hooks/useHero";
import { useGetLocation } from "../hooks/useLocation";
import { useGetSocials } from "../hooks/useSocials";
import { useInView } from "../hooks/useInView";

const exploreLinks = [
    { label: "Residences", href: "/#residences" },
    { label: "Penthouse", href: "/#penthouse" },
    { label: "Location", href: "/#location" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

const Footer = () => {
    const {isInView,ref}=useInView({rootMargin:"250px"})
    
    const { data: heroData } = useGetHero(isInView);
    const { data: location } = useGetLocation(isInView);
    const {data:socials}=useGetSocials(isInView);

    const companyName = heroData?.hero?.name || "AMIANA ESTATES";
    const address = location?.address || "Aberdeen, Sierra Leone";

    return (
        <footer ref={ref} className="bg-[#161513] px-6 py-10 text-white sm:px-10 sm:py-12 md:px-16 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:pb-10">
                    <div className="max-w-xl">
                        <p className="body-text mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
                            Private residences
                        </p>
                        <h2 className="title text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {companyName}
                        </h2>
                    </div>

                    <a
                        href="/#home"
                        className="group flex w-fit items-center gap-2.5 border-b border-primary/60 pb-2 body-text text-xs uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:text-white"
                    >
                        <span>Back to top</span>
                        <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </div>

                <div className="grid gap-8 py-8 sm:grid-cols-3 sm:gap-6">
                    <div className=" flex flex-col items-start gap-2">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
                        <div className="flex flex-col items-start gap-2">
                            <a
                                href="/#location"
                                className="group flex w-fit items-start gap-2 body-text text-xs uppercase leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{address}</span>
                            </a>
                            <a
                                href="/"
                                className="group flex w-fit items-start gap-2 body-text text-xs leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{heroData?.hero?.contact_email}</span>
                            </a>
                            <a
                                href="/"
                                className="group flex w-fit items-start gap-2 body-text text-xs uppercase leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{heroData?.hero?.contact_phone}</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Explore</p>
                        <div className="flex flex-col items-start gap-2">
                            {exploreLinks.map((link) => (
                                <a key={link.label} href={link.href} className="body-text text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white cursor-pointer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Follow</p>
                        <div className="flex flex-col items-start gap-2">
                            {socials?.map((link) => (
                                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="body-text text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white cursor-pointer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="body-text flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} {companyName}</p>
                    <div className="flex items-center gap-4">
                        {legalLinks.map((link) => (
                            <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
