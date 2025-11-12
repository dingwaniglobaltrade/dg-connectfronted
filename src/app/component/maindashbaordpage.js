// component/dashboard/ProtectedDashboard.js
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import MainDashboard from "@/app/component/Admindashboard/main";
import ProtectedRoute from "@/app/component/protectedroute";

const ProtectedDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="h-[100vh] w-full ">
        {/* Desktop View */}
        <div className="lg:flex md:hidden sm:hidden hidden">
          <SideNavbar />
          <div className="flex flex-col w-full">
            <Upernavbar pagename="Dashboard" />
            <MainDashboard />
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden md:flex sm:flex flex flex-col w-full">
          <SideNavbar />
          <MainDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedDashboard;
