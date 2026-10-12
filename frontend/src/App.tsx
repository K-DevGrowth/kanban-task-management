import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Boardpage from "./components/Boardpage";
import Dashboardpage from "./components/Dashboardpage";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route path="/boards" element={<Dashboardpage />} />
          <Route path="boards/:boardId" element={<Boardpage />} />
        </Route>

        <Route path="/*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
