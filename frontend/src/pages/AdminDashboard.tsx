import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import { Button } from "../components/ui/button";
import { Menu, PanelLeftClose } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./adminDashboardPages/Dashboard";
import Home from "./adminDashboardPages/Home";

const AdminDashboard = () => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);

    return (
        <div className="min-h-screen w-full flex flex-row bg-[#FAF9F6] text-neutral-900">
            {/* Sidebar */}
            <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

            {/* Main Content Area*/}
            <div className="flex-1 min-w-0 w-full flex flex-col transition-all duration-300 ease-in-out">
                
                {/* Top header bar */}
                <header className="sticky top-0 z-20 h-16 border-b border-[#ECE9E5] bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOpenSidebar(!openSidebar)}
                            className="hover:bg-[#E9E8E5] text-neutral-800 transition-colors p-2 h-9 w-9 rounded-md flex items-center justify-center cursor-pointer"
                            title={openSidebar ? "Collapse sidebar" : "Expand sidebar"}
                            aria-label={openSidebar ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {openSidebar ? (
                                <PanelLeftClose className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                        <span className="uppercase body-text text-xs sm:text-sm tracking-wider font-semibold text-neutral-800">
                            Dashboard
                        </span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/home" element={<Home/>}/>
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
