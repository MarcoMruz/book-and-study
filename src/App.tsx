import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { UserProfile as UserAccount } from "@clerk/clerk-react";
import { Home } from "./routes/home";
import { About } from "./routes/about";
import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";
import { Navigation } from "./components/navigation";
import { UserProfile } from "./routes/profile/me";
import { ProtectedRoute } from "./components/protected-route";
import { NoMatch } from "./routes/no-match";
import { Settings } from "./routes/profile/settings";
import { MyReservations } from "./routes/reservations/me";
import { ReserveLab } from "./routes/reservations/reserve-lab";

function App() {
  return (
    <>
      <Navigation />
      <Container maxW="5xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/profile">
            <Route
              path="me"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <UserAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/reservations">
            <Route
              path="me"
              element={
                <ProtectedRoute>
                  <MyReservations />
                </ProtectedRoute>
              }
            />

            <Route
              path="reserve-lab"
              element={
                <ProtectedRoute>
                  <ReserveLab />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
