import "./App.css";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import PageNotFound from './components/PageNotFound';
import RoomPage from "./pages/RoomPage";
import { Route, Routes } from "react-router-dom";
import Room from "./pages/Room";
import Layout from "./Layout";
import { RequiredAuth } from "./components/Auth/RequiredAuth";
import Denied from "./pages/Denied";
import NotRequiredAuth from "./components/Auth/NotRequiredAuth";
import CommunityCard from './components/CommunityCard'
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/denied" element={<Denied />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:resetPasswordToken"
          element={<ResetPassword />}
        />

        <Route element={<NotRequiredAuth />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<RequiredAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/live" element={<Room />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/community" element={<CommunityCard />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;