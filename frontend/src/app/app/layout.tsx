import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./_components/navbar'), { ssr: false })

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