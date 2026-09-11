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
    
    
    return(
        <nav className=" sticky top-0 z-30 bg-white/70 backdrop-blur-sm flex flex-row items-center justify-between px-10 py-4 w-full">
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