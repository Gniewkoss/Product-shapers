import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticlesMain } from "./pages/ArticlesMain";
import { HomeMain } from "./pages/HomeMain";
import { HiringPage } from "./pages/HiringPage";
import { SzkoleniaMain } from "./pages/SzkoleniaMain";
import { UsemeMain } from "./pages/UsemeMain";

function AdminRedirect() {
  useEffect(() => {
    window.location.replace("https://product-shapers-cms.onrender.com/admin/");
  }, []);

  return null;
}

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomeMain />} />
          <Route path="szkolenia" element={<SzkoleniaMain />} />
          <Route path="hiring" element={<HiringPage />} />
          <Route path="useme" element={<UsemeMain />} />
          <Route path="artykuly" element={<ArticlesMain />} />
          <Route path="artykuly/:slug" element={<ArticlePage />} />
        </Route>
        <Route path="admin" element={<AdminRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
