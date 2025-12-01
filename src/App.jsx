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
import Edit from "./pages/Edit";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/email-verification"
          element={<EmailVerification />}
        ></Route>
        <Route path="/enter-email" element={<EnterEmail />}></Route>
        <Route
          path="edit-profile"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/user/:username"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
