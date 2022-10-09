
import './App.css';
import {Route,Routes,Navigate} from "react-router-dom";
import {MainLayout} from "./Layouts";
import {ProductPage, ProductsPage} from "./Pages";

function App() {
  return (
    <Routes>
      <Route path={'/'} element = {<MainLayout/>}>
          <Route index element={<Navigate to={'products'}/>}/>
          <Route path={'products'} element={<ProductsPage/>}>
              <Route path={':productId'} element={<ProductPage/>}/>
          </Route>
      </Route>
    </Routes>
  );
}

export default App;
