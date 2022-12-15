import { Routes, Route } from "react-router-dom"

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
        <Route index element={<div>Jira Page Home</div>} />

        {/* User Route */}
        <Route path="users" element={<UserList />} />
        <Route path="users/:userId" element={<UserDetail />} />

        {/* Project Route */}
        <Route path="projects" element={<ProjectList />} />

        {/* My Projects Route */}
        <Route path="my-works" element={<MyProjects />} />


        <Route path="*" element={<Page404 />} />
      </Route>

      {/* Project Route */}
      <Route path="/jira/projects/:projectId" element={<ProjectLayout />}>
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
