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
import { Settings } from "./routes/profile/me/settings";
import { MyReservations } from "./routes/profile/me/reservations";
import { ReserveLab } from "./routes/labs/id/reserve";
import { LabDetail } from "./routes/labs/id";
import { Labs } from "./routes/labs";
import { CreateLab } from "./routes/profile/me/create-lab";
import { TeacherProtectedRoute } from "./components/teacher-protected-route";

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
            >
              <Route path="settings" element={<Settings />} />
              <Route
                path="reservations"
                element={
                  <ProtectedRoute>
                    <MyReservations />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <UserAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-lab"
              element={
                <TeacherProtectedRoute>
                  <CreateLab />
                </TeacherProtectedRoute>
              }
            />
          </Route>

          <Route path="/labs" element={<Labs />} />
          <Route path="/labs/:labId" element={<LabDetail />} />
          <Route path="/labs/:labId/reserve" element={<ReserveLab />} />
          <Route path="/labs:labId/free-slots" element={<LabDetail />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
