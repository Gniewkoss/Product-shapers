import { Outlet } from "react-router-dom";
import { SitePayloadProvider } from "../context/SitePayloadContext";
import { NavBar } from "./NavBar";
import { SiteFooter } from "./SiteFooter";

export function MainLayout() {
  return (
    <SitePayloadProvider>
      <div className="min-h-screen w-full min-w-0 bg-white">
        <NavBar />
        <div className="flex w-full min-w-0 flex-col items-stretch">
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </SitePayloadProvider>
  );
}
