import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom"

import DefaultLayout from "./layouts/DefaultLayout";
import ProjectLayout from "./layouts/ProjectLayout";

import Login from './pages/Login'
import Register from './pages/Register'
import Page404 from './pages/Page404'
// import Home from "./pages/Home";
import Entry from "./pages/Entry";

import MyProjects from "./pages/MyProjects";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import ProjectList from "./pages/ProjectList";

import KanbanBoard from "./pages/KanbanBoard";
import ProjectSetting from "./pages/ProjectSetting";
import UnderDevelopment from "./pages/UnderDevelopment";

import { useSelector, useDispatch } from "react-redux";
import { logout, checkToken, clearAuthInfo } from './redux/slices/authSlice'
import { toast } from "react-toastify";

const ProtectRoute = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user, isTokenValid, isCheckingToken, isUserLogout } = useSelector(state => state.auth)
  console.log('protect render')

  useEffect(() => {
    // Nếu không có user được lưu trong store thì không cần check token
    if (!user) return
    dispatch(checkToken())
  }, [user])

  if (!user) {
    console.log("isUserLogout", isUserLogout)
    let url = `/login?redirectUrl=${location.pathname}`
    toast.info("You need login to use this feature")
    return <Navigate to={url} />
  }

  if (isCheckingToken) {
    if (isTokenValid) {
      return children
    }
    else {
      toast.info("Your athenticate is expired or not invalid, please try again!")
      dispatch(logout())
      return null
    }
  }



  return null
}

function App() {
  return (
    <Routes>
      {/* Entry Route */}
      <Route path="/" element={<Entry />} />

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />



      {/* Manage Route */}
      <Route path="/jira" element={<DefaultLayout />}>
        {/* Jira Home Page */}
        <Route index element={<div>J{console.log("???????")}ira Page Home</div>} />

        {/*----------------------------- Protect Route -----------------------------------------*/}
        <Route element={<ProtectRoute><Outlet /></ProtectRoute>}>

          {/* User Route */}
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetail />} />

          {/* Project Route */}
          <Route path="projects" element={<ProjectList />} />

          {/* My Projects Route */}
          <Route path="my-works" element={<MyProjects />} />


          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>

      {/*----------------------------- Protect Route -----------------------------------------*/}
      {/* Project Route */}
      <Route path="/jira/projects/:projectId" element={<ProtectRoute><ProjectLayout /></ProtectRoute>}>
        <Route index element={<Page404 />} />

        <Route path="kanban-board" element={<KanbanBoard />} />
        <Route path="project-setting" element={<ProjectSetting />} />
        <Route path='*' element={<UnderDevelopment />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
