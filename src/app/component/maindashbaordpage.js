// component/dashboard/ProtectedDashboard.js
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import MainDashboard from "@/app/component/Admindashboard/main";
import ProtectedRoute from "@/app/component/protectedroute";

const ProtectedDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="h-screen w-full">
        {/* Desktop View */}
        <div className="hidden sm:flex md:flex w-full">
          <SideNavbar />
          <div className="flex flex-col w-full">
            <Upernavbar pagename="Dashboard" />
            <MainDashboard />
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden sm:hidden w-full">
          <SideNavbar />
          <MainDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedDashboard;
