import Navbar from "./_components/navbar";


export default function AppLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row overflow-hidden">
            <Navbar />
            <div className="w-full h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    )
}