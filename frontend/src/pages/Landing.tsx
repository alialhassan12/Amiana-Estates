import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Estate from "../components/Estate";
import Residences from "../components/Residences";
import Penthouse from "../components/Penthouse";
import EstateExperience from "../components/EstateExperience";
import DesignPhilosophy from "../components/DesignPhilosophy";
import Location from "../components/Location";
import Footer from "../components/Footer";

const Landing = () => {
    return (
        <div>
            <NavBar/>
            <div className="flex flex-col gap-10">
                <div id="home" >
                    <Hero/>
                </div>
                <div className="px-10">
                    <div id="the-estate">
                        <Estate/>
                    </div>
                    <div id="residences">
                        <Residences/>
                    </div>
                </div>
                <div id="penthouse" className="bg-black">
                    <Penthouse/>
                </div>
                <div className="px-10">
                    <div id="estate-experience">
                        <EstateExperience/>
                    </div>
                    <div id="design-philosophy">
                        <DesignPhilosophy/>
                    </div>
                    <div id="location">
                        <Location/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Landing;