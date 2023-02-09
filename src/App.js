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
  OrdersPage,
  FeedPage,
  OrderPage,
} from "./pages";
import { ProtectedRouteElement } from "./components/protected-route";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { Modal } from "./components/modal/modal";
import { Order } from "./components/order/order";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeLocation = location.state && location.state.ingredientModal;
  const isFeedLocation = location.state && location.state.feedOrderModal;
  const isProfileLocation = location.state && location.state.profileOrderModal;
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
            element={<RegistrationPage />}
            accessType="unauthorized"
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
      <Route
        path="/profile/orders"
        element={
          <ProtectedRouteElement
            element={<OrdersPage />}
            accessType="authorized"
          />
        }
      />
      {isProfileLocation && (
        <Route
          path="/profile/orders/:id"
          element={
            <Modal handleClose={() => navigate(-1)} title="order_number">
              <Order />
            </Modal>
          }
        />
      )}
      <Route
        path="/profile/orders/:id"
        element={
          <ProtectedRouteElement
            element={<OrderPage />}
            accessType="authorized"
          />
        }
      />
      {isHomeLocation && (
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
      {isFeedLocation && (
        <Route
          path="/feed/:id"
          element={
            <Modal handleClose={() => navigate(-1)} title="order_number">
              <Order />
            </Modal>
          }
        />
      )}
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/feed/:id" element={<OrderPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
