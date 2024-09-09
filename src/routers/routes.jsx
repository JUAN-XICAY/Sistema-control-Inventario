import { Routes, Route } from "react-router-dom";
import {
  Configuracion,
  ErrorMolecula,
  Home,
  Login,
  Marca,
  ProtectedRoute,
  SpinnerLoader,
  UserAuth,
  useEmpresaStore,
  useUsuariosStore,
  Categorias,
  Productos,
  Usuarios,
  Kardex,
  Reportes,
  Empresa,
  StockActualMinimos,
  ReporteKardexProducto,
  StockActualPorProductos,
  KardexEntradaSalida,
  StockInventarioValorado,
  StockInventarioValoradoVenta,
  Layout,
  PageNot,
} from "../index";
import { useQuery } from "@tanstack/react-query";
import StockActualTodos from "../components/organismos/report/StockActualTodos";

export function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accessBy="non-authenticated">
            <Login />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configurar"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Configuracion />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configurar/marca"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Marca />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configurar/categorias"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Categorias />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configurar/productos"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Productos />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configurar/personal"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Usuarios />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/kardex"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Kardex />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reportes"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Reportes />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route
          path="stock-actual-por-producto"
          element={<StockActualPorProductos />}
        />
        <Route path="stock-actual-todos" element={<StockActualTodos />} />
        <Route path="stock-bajo-minimo" element={<StockActualMinimos />} />
        <Route path="reporte-kardex" element={<ReporteKardexProducto />} />
        <Route
          path="kardex-entradas-salidas"
          element={<KardexEntradaSalida />}
        />
        <Route
          path="inventario-valorado-compra"
          element={<StockInventarioValorado />}
        />
        <Route
          path="inventario-valorado-venta"
          element={<StockInventarioValoradoVenta />}
        />
      </Route>

      <Route
        path="/configurar/empresa"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Empresa />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<PageNot />}></Route>

      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/configurar" element={<Configuracion />} /> */}
      {/* <Route path="/configurar/marca" element={<Marca />} /> */}

      {/* <Route path="/configurar/categorias" element={<Categorias />} /> */}
      {/* <Route path="/configurar/productos" element={<Productos />} /> */}
      {/* <Route path="/configurar/personal" element={<Usuarios />} /> */}
      {/* <Route path="/kardex" element={<Kardex />} /> */}
      {/* <Route path="/reportes" element={<Reportes />}>
        <Route
          path="stock-actual-por-producto"
          element={<StockActualPorProductos />}
        />
        <Route path="stock-actual-todos" element={<StockActualTodos />} />
        <Route path="stock-bajo-minimo" element={<StockActualMinimos />} />
        <Route path="reporte-kardex" element={<ReporteKardexProducto />} />
        <Route
          path="kardex-entradas-salidas"
          element={<KardexEntradaSalida />}
        />
        <Route
          path="inventario-valorado-compra"
          element={<StockInventarioValorado />}
        />
        <Route
          path="inventario-valorado-venta"
          element={<StockInventarioValoradoVenta />}
        />
      </Route> */}
      {/* <Route path="/configurar/empresa" element={<Empresa />} /> */}
    </Routes>
  );
}
