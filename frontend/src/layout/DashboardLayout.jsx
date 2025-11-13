import Sidebar from "../components/user/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
