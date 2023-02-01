import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { Modal } from "./components/modal/modal";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const homeLocation = location.state && location.state.ingredientModal;
  return (
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
      {homeLocation && (
        <Route
          path="/ingredients/:id"
          element={
            <Modal handleClose={() => navigate(-1)} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      <Route path="/ingredients/:id" element={<IngredientPage />} />
      {/* <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<IngredientPage />} accessType="authorized" />}
          /> */}
      {/* <Route
            path="/profile/orders/:id"
            element={<ProtectedRouteElement element={<IngredientPage />} accessType="authorized" />}
          /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
