import { User } from "lucide-react";

export const Header = () => {
  const userName = "João"; // This would come from auth context in a real app

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">LojaSimples</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Olá, {userName}</span>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};