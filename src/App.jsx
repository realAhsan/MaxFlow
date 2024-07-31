import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import CommonLayout from "./components/common-layout";
import TaskPage from "./pages/task";
import SrcumBoardPage from "./pages/srucm-board";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tasks" element={<CommonLayout />}>
          <Route path="list" element={<TaskPage />} />
          <Route path="scrum-board" element={<SrcumBoardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
