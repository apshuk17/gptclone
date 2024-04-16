import { SidebarHeader } from "@/components/sidebar";
import NavLinks from "@/components/navlinks";
import MemberProfile from "@/components/member-profile";

function Sidebar() {
    return (
        <div className='px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]'>
            {/* first row */}
            <SidebarHeader />
            {/* second row */}
            <NavLinks />
            {/* third row */}
            <MemberProfile />
        </div>
    );
}

export default Sidebar;