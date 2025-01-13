import { Outlet } from "react-router-dom";
import { NavBar } from "../../shared";


export const StoreLayout = () => {
  return (
    <div className="flex flex-col min-h-screen pb-10 border-2 border-white m-4">
      <NavBar />
      
      <div className="flex px-10 border-2 border-white m-4">
        <Outlet />
      </div>
    </div>
  )
}
