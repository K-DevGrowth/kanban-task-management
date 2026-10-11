import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Boardpage from "./components/Boardpage";
import Dashboardpage from "./components/Dashboardpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboardpage />} />
          <Route path='boards/:boardId/columns' element={<Boardpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
