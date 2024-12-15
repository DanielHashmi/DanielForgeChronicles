import Ext_Navbar from "./Ext_Navbar"
import Navs_Part from "./Navs_Part"
import Logo_Part from "./Logo_Part"

const Navbar = () => {
    return (
        <div className={`flex w-full justify-center backdrop-blur-xl pt-6 top-0 fixed flex-col z-50 items-center`}>
            <div className="w-[90vw] flex justify-between items-center">
                <Logo_Part />
                <Navs_Part />
              
            </div>
            
            <Ext_Navbar />
        </div>
    )
}

export default Navbar