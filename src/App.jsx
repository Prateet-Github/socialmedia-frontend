import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

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
import EnterResetOtp from "./pages/EnterResetOtp";
import Edit from "./pages/Edit";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import ChatBoxMobile from "./components/ChatboxMobile";
import ResetPassword from "./pages/ResetPassword";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "./redux/notificationSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (user?._id) {
      // attach userId for future auth (optional)
      socket.auth = { userId: user._id };

      // MUST connect manually
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("frontend socket connected:", socket.id);

      if (user?._id) {
        socket.emit("join", user._id);
        console.log("user joined socket:", user._id);
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [user?._id]);

  // Only fetch notifications when authenticated
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchNotifications());
    }
  }, [isAuthenticated, user?._id, dispatch]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/reset-otp" element={<EnterResetOtp />}></Route>
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
          path="/profile/post/:postId"
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
        <Route path="/enter-reset-otp" element={<EnterResetOtp />}></Route>
        <Route
          path="edit-profile"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/messages/:chatId" element={<ChatBoxMobile />} />
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