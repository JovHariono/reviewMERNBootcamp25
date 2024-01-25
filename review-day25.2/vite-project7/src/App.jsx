import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import { ContextApplication } from "./libs/config/contexts";
import PageCommonOutlet from "./pages/commons/PageCommonOutlet";
import PageBarangList from "./pages/barang/PageBarangList";
import PageBarangCreate from "./pages/barang/PageBarangCreate";
import PageBarangDetail from "./pages/barang/PageBarangDetail";
import PageTerimaList from "./pages/terima/PageTerimaList";
import PageTerimaPrint from "./pages/terima/PageTerimaPrint";
import PageKasList from "./pages/kas/PageKasList";
import PageTerimaAmbil from "./pages/terima/PageTerimaAmbil";

// const MyComponent = () => {
//   //ambil params dari usenavigate pakai ini
//   // const location = useLocation();

//   //ambil dari Link pakai ini
//   // const params = useParams()

//   return (
//     <div>
//       <h1>Hello</h1>

//       {/* ambil usenavigate menggunakan useLocation */}
//       {/* {JSON.stringify(location.state)} */}

//       {/* ambil Link menggunakan */}
//       {/* {JSON.stringify(params)} */}
//     </div>
//   );
// };

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <ContextApplication.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageBarangList />} />
              {/* useNavigate */}
              <Route path={"new"} element={<PageBarangCreate />} />
              {/* Link */}
              {/* <Route path={"new/:id1/:id2/:id3"} element={<PageBarangCreate />} /> */}
              <Route path={"detail/:id"} element={<PageBarangDetail />} />
            </Route>

            <Route path="/terima" element={<PageCommonOutlet />}>
            <Route index={true} element={<PageTerimaList />} />
            <Route path={"print"} element={<PageTerimaPrint />} />
            {/* <Route path={"ambil"} element={<PageTerimaAmbil />} /> */}
            </Route>

            <Route path="/kas" element={<PageCommonOutlet />}>
            <Route index={true} element={<PageKasList />} />            
            </Route>
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  );
};

export default App;
