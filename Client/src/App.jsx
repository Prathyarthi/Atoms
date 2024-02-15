import "./App.css";
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import PageNotFound from './components/PageNotFound';
import RoomPage from "./pages/RoomPage";
import { Route, Routes } from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <div className="App h-[100vh] flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/live" element={<Room />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route
          path="/reset-password/:resetPasswordToken"
          element={<ResetPassword />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;