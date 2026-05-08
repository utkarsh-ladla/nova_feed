import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {

    return (
        <div className="h-screen flex flex-col bg-[#020817] text-white overflow-hidden">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default MainLayout;