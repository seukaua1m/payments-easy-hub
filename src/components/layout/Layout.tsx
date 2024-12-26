import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};