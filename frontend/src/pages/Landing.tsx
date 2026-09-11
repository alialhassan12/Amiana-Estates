import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Estate from "../components/Estate";
import Residences from "../components/Residences";

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
            </div>
        </div>
    )
}

export default Landing;