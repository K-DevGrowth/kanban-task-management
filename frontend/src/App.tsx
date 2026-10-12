import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Boardpage from "./components/BoardPage";
import LoginPage from "./components/LoginPage";
import BoardHeader from "./components/BoardHeader";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route
            path="boards/:boardId"
            element={
              <>
                <BoardHeader />
                <Boardpage />
              </>
            }
          />
        </Route>

        <Route path="/*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
