import './Home.css'
import bg from '../assets/bg.jpg'
const Home = () => {
  return (
    <div>
      <div className="container-md">
        <div className="backdrop w-full h-screen bg-cover bg-center " style={{ backgroundImage: `url(${bg})` }}>
          <div className="layout h-screen w-full flex  md:py-28 font-black justify-between md:px-10 md:text-6xl text-3xl  text-yellow-500">
            <div className="left-side mx-6 px-7 drop-shadow-xl hidden md:block">
              Get<br/> Ready<br/> with<br/> Me
            </div>
            <div className=" right-side font-serif md:text-gray-900 drop-shadow-lg hover:animate-pulse">
              Outfit<br/> Recommendation<br/> System
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
