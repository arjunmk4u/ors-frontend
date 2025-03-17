import { Link } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import OutfitRecommendation from "./Recommend"

const Nav = () => {
    return (
        <div className="bg-amber-50">
            <div className="container  ">
                <div className="wrapper  md:flex items-center justify-between hidden py-3 w-full text-2xl text-gray-700">
                    <div className="logo mx-10 px-12">
                        LOGO
                    </div>
                    <div className="nav">
                        <div className="nav-items flex justify-around  drop-shadow-2xl ">
                            <ul className="flex text-center  ">
                                <Link to='/' className="mx-6">HOME</Link>
                                {/* <Link to='' className="mx-6">ABOUT</Link> */}
                            </ul>
                        </div>
                    </div>
                    <Link to='/predict' className="text-white rounded-xl bg-yellow-500 p-2 font-bold shadow hover:scale-105 transition">GET RECOMMENDATIONS</Link>
                </div>
            </div>

        </div>
    )
}

export default Nav
