import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  HomePage,
  IngredientPage,
  NotFoundPage,
} from "./pages";
import { ProtectedRouteElement } from "./components/protected-route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRouteElement element={<HomePage />} />}
        />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          /> */}
        {/* <Route
            path="/ingredients/:id"
            element={<ProtectedRouteElement element={<IngredientPage />} />}
          /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
