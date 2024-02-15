import "@/app/globals.css";
import SidebarSection from "./components/sidebar";
import NavbarBottomSection from "./components/navbarBottom";
import NavbarTopSection from "./components/navbarTop";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className="block sm:flex">
          <div className="block sm:hidden"><NavbarTopSection /></div> {/* mobile view */}
          <div className="block sm:hidden"><NavbarBottomSection /></div> {/* mobile view */}
          <div className="hidden sm:block"><SidebarSection /></div> {/* pc view */}
          <div className="w-full px-5 pt-0 sm:pt-10">
            {children}</div>
        </div>
      </body>
    </html>
  );
}
