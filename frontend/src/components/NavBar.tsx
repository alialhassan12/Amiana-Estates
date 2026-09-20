import { useEffect, useRef, useState } from "react";
import { useGetHero } from "../hooks/useHero";
import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger,
    SheetClose 
} from "./ui/sheet";
import { 
    MenuIcon, 
    XIcon, 
    ChevronRight 
} from "lucide-react";

const NavBar = () => {
    const navLinks = [
        { label: 'home', path: 'home' },
        { label: 'the estate', path: 'the-estate' },
        { label: 'residences', path: 'residences' },
        { label: 'penthouse', path: 'penthouse' },
        { label: 'estate experience', path: 'estate-experience' },
        { label: 'Amiana Philosophy', path: 'design-philosophy' },
        { label: 'gallery', path: 'gallery' },
        { label: 'location', path: 'location' },
        { label: 'enquiry', path: 'enquiry' }
    ];

    const { data: heroData } = useGetHero();
    const hero = heroData?.hero;

    // track whether navbar is visible
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // keep visible when near the top of the page 
            if (currentScrollY < 50) {
                setIsVisible(true);
            }
            // hide navbar when scrolling down
            else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
                setIsVisible(false);
            }
            // reveal navbar when scrolling up
            else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 5) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`sticky top-0 left-0 right-0 z-30 bg-white/70 backdrop-blur-sm flex flex-row items-center justify-between px-6 sm:px-10 py-4 w-full transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full"
            }`}
        >
            {/* logo */}
            <a href="/#home" className="flex flex-col group text-left">
                <h2 className="body-text uppercase tracking-wider text-base sm:text-lg text-neutral-900 group-hover:text-primary transition-colors">
                    {hero?.name || "AMIANA ESTATES"}
                </h2>
                <div className="flex flex-row items-center gap-1.5">
                    <span className="uppercase body-text text-[10px] sm:text-[11px] text-primary tracking-wider font-medium">aberdeen</span>
                    <span className="w-1 h-1 rounded-full bg-primary/70"></span>
                    <span className="uppercase body-text text-[10px] sm:text-[11px] text-primary tracking-wider font-medium">sierra leone</span>
                </div>
            </a>

            {/* desktop nav links */}
            <ul className="flex-row items-center gap-4 hidden xl:flex">
                {navLinks.map((link, index) => {
                    return (
                        <li key={index}>
                            <a 
                                href={`/#${link.path}`} 
                                className="uppercase body-text text-xs tracking-widest text-neutral-800 hover:text-primary hover:font-semibold transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        </li>
                    );
                })}
            </ul>

            {/* md / sm / mobile screens sheet */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger 
                    className="flex xl:hidden p-2 -mr-2 rounded-full text-neutral-800 hover:text-primary hover:bg-neutral-100/70 transition-colors cursor-pointer focus:outline-none"
                >
                    <MenuIcon className="h-6 w-6" />
                </SheetTrigger>
                
                <SheetContent 
                    side="right" 
                    showCloseButton={false}
                    className="w-[88vw] sm:w-[420px] max-w-full p-0 flex flex-col h-full bg-neutral-950 text-neutral-100 border-l border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <SheetHeader className="px-6 py-5 border-b border-white/10 bg-neutral-900/60 backdrop-blur-md">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col text-left">
                                <span className="title uppercase tracking-widest text-lg text-white font-medium">
                                    {hero?.name || "AMIANA ESTATES"}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="uppercase body-text text-[10px] text-primary tracking-[0.2em] font-medium">Aberdeen</span>
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span className="uppercase body-text text-[10px] text-primary tracking-[0.2em] font-medium">Sierra Leone</span>
                                </div>
                            </div>
                            
                            <SheetClose 
                                className="p-2 -mr-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
                            >
                                <XIcon className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </div>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetDescription className="sr-only">
                            Navigate through Amiana Estates residences, penthouse, lifestyle amenities, and inquiries.
                        </SheetDescription>
                    </SheetHeader>

                    {/* Navigation Menu Links */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-1 divide-y divide-white/5">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium pb-2">
                            Explore The Estate
                        </p>
                        {navLinks.map((link, index) => {
                            const linkNumber = String(index + 1).padStart(2, "0");
                            return (
                                <div key={index} className="pt-2">
                                    <a
                                        href={`/#${link.path}`}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="group flex items-center justify-between py-2.5 text-left transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-[11px] font-mono text-primary/70 tracking-widest group-hover:text-primary transition-colors">
                                                {linkNumber}
                                            </span>
                                            <span className="body-text uppercase text-sm tracking-[0.18em] font-light text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                                                {link.label}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}

export default NavBar;