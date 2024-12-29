import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-32"> {/* Reduced margin-left to 32 */}
      <Header />
      <main className="flex-1 pt-4 mt-4 overflow-hidden">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;