import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Articulos from '../Paginas/Inventario/Inventario';
import Carrito from '../Paginas/Catalogo/Catalogo';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/carrito" element={<Carrito />} />
       
      </Routes>
    </Router>
  );
};

export default AppRouter;
