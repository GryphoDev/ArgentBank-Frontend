// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";

export function MainLayout() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
