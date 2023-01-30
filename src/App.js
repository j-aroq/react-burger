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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement
              element={<LoginPage />}
              accessType="unauthorized"
            />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement
              element={<RegistrationPage accessType="unauthorized" />}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement
              element={<ForgotPasswordPage />}
              accessType="unauthorized"
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement
              element={<ResetPasswordPage />}
              accessType="unauthorized"
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              element={<ProfilePage />}
              accessType="authorized"
            />
          }
        />
        {/* <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<IngredientPage />} accessType="authorized" />}
          /> */}
        {/* <Route
            path="/profile/orders/:id"
            element={<ProtectedRouteElement element={<IngredientPage />} accessType="authorized" />}
          /> */}
        {/* <Route
            path="/ingredients/:id"
            element={<ProtectedRouteElement element={<IngredientPage />} accessType="unauthorized" />}
          /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
