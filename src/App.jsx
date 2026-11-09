import { InventarioProvider } from "./context/InventarioContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <InventarioProvider>
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-4 py-6">
        <AppRoutes />
      </main>
    </InventarioProvider>
  );
}

export default App;
