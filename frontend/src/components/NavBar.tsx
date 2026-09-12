import { useEffect, useRef, useState } from "react";
import { useGetHero } from "../hooks/useHero";

const NavBar=()=>{
    const navLinks=[
        {'label':'home','path':'home'},
        {'label':'the estate','path':'the-estate'},
        {'label':'residences','path':'residences'},
        {'label':'penthouse','path':'penthouse'},
        {'label':'estate experience','path':'estate-experience'},
        {'label':'wellines','path':'wellines'},
        {'label':'gallery','path':'gallery'},
        {'label':'location','path':'location'},
        {'label':'enquiry','path':'enquiry'}
    ];

    const {data:heroData}=useGetHero();
    const hero=heroData?.hero;

    // track wether navbar is visible
    const [isVisible,setIsVisible]=useState<boolean>(true);
    const lastScrollY=useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // 1. Always keep visible when near the top of the page (within 50px)
            if (currentScrollY < 50) {
                setIsVisible(true);
            }
            // 2. Scrolling DOWN -> Hide navbar
            else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
                setIsVisible(false);
            }
            // 3. Scrolling UP -> Reveal navbar
            else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 5) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    
    return(
        <nav className={`fixed top-0 left-0 right-0 z-30 bg-white/70 backdrop-blur-sm flex flex-row items-center justify-between px-10 py-4 w-full transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full"
            }`}
        >
            {/* logo */}
            <div className="flex flex-col">
                <h2 className="body-text uppercase tracking-wider text-lg">
                    {hero?.name}
                </h2>
                <div className="flex flex-row items-center gap-1">
                    <span className="uppercase body-text text-[11px] text-primary tracking-wider">aberdeen</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-primary"></span>
                    <span className="uppercase body-text text-[11px] text-primary tracking-wider">sierra leone </span>
                </div>
            </div>

            {/* nav links */}
            <ul className="flex flex-row items-center gap-3 ">
                {navLinks.map((link,index)=>{
                    return(
                        <li key={index}>
                            <a href={`/#${link.path}`} className="uppercase body-text text-sm tracking-wider text-black hover:text-primary hover:font-bold transition-colors">
                                {link.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}
export default NavBar;