import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  IngredientPage,
  NotFoundPage,
} from "./pages/login";
import { RegistrationPage } from "./pages/register";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";
import { ProtectedRouteElement } from "./components/protected-route";
import { ProfilePage } from "./pages/profile";
import { ProvideAuth } from "./utils/auth";

export default function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            // element={<ProtectedRouteElement element={<HomePage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
    </ProvideAuth>
  );
}
