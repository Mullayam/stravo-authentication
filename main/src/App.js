import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import MyActivity from "./component/MyActivity";
import ProtectedLayout from "./component/ProtectedLayout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} index />

        <Route
          path="/my-activities"
          element={
            <ProtectedLayout>
              <MyActivity />
            </ProtectedLayout>
          }
        ></Route>

        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
