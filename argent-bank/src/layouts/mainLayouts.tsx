// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}
