import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import EmailVerification from "./pages/EmailVerification";
import EnterEmail from "./pages/EnterEmail";
import CallModal from "./components/VideoCallModal";
import Edit from "./pages/Edit";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/home" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/notification" element={<Notifications />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route
          path="/email-verification"
          element={<EmailVerification />}
        ></Route>
        <Route path="/enter-email" element={<EnterEmail />}></Route>
        <Route path="vc" element={<CallModal />}></Route>
        <Route path="edit-profile" element={<Edit />}></Route>
      </Routes>
    </>
  );
};

export default App;
