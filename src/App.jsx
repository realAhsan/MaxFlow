import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import CommonLayout from "./components/common-layout";
import TaskPage from "./pages/task";
import SrcumBoardPage from "./pages/srucm-board";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tasks" element={<CommonLayout />}>
          <Route path="list" element={<TaskPage />} />
          <Route path="scrum-board" element={<SrcumBoardPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
