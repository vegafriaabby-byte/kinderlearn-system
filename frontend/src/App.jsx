import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Activities from "./pages/Activities";
import ActivityAnswer from "./pages/ActivityAnswer";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";

import OfflineStatus from "./components/OfflineStatus";

function App() {

  return (

    <BrowserRouter>

      <OfflineStatus />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />

        <Route
          path="/parent"
          element={<ParentDashboard />}
        />

        <Route
          path="/activities"
          element={<Activities />}
        />

        <Route
          path="/activities/:activityId"
          element={<ActivityAnswer />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;