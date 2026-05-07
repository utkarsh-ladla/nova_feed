import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {

    return (
        <div className="min-h-screen bg-[#020817] text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-6">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default MainLayout;