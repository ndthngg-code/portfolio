import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Cursor       from './components/Cursor.jsx';
import Navbar       from './components/Navbar.jsx';
import ContactFloat from './components/ContactFloat.jsx';
import { useSite }  from './context/SiteContext.jsx';

import Home          from './pages/public/Home.jsx';
import Works         from './pages/public/Works.jsx';
import ProjectDetail from './pages/public/ProjectDetail.jsx';
import Playground    from './pages/public/Playground.jsx';
import NotFound      from './pages/public/NotFound.jsx';

import AdminLogin    from './pages/admin/AdminLogin.jsx';
import AdminLayout   from './pages/admin/AdminLayout.jsx';
import AdminDash     from './pages/admin/AdminDash.jsx';
import AdminProjects from './pages/admin/AdminProjects.jsx';
import AdminForm     from './pages/admin/AdminForm.jsx';
import AdminMessages from './pages/admin/AdminMessages.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import AdminSite     from './pages/admin/AdminSite.jsx';
import AdminPageBuilder from './pages/admin/AdminPageBuilder.jsx';

function PublicShell() {
  const { settings } = useSite();
  return (
    <>
      <Cursor/>
      <Navbar social={settings?.social || {}}/>
      <ContactFloat/>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => { document.body.style.cursor = isAdmin ? 'auto' : 'none'; }, [isAdmin]);

  return (
    <>
      {!isAdmin && <PublicShell/>}
      <Routes>
        <Route path="/"                   element={<Home/>} />
        <Route path="/works"              element={<Works/>} />
        <Route path="/works/:category"    element={<Works/>} />
        <Route path="/project/:slug"      element={<ProjectDetail/>} />
        <Route path="/playground"         element={<Playground/>} />
        <Route path="/admin/login"        element={<AdminLogin/>} />
        <Route path="/admin"              element={<AdminLayout/>}>
          <Route index                    element={<AdminDash/>} />
          <Route path="projects"          element={<AdminProjects/>} />
          <Route path="projects/new"      element={<AdminForm/>} />
          <Route path="projects/edit/:id" element={<AdminForm/>} />
          <Route path="messages"          element={<AdminMessages/>} />
          <Route path="settings"          element={<AdminSettings/>} />
          <Route path="site"              element={<AdminSite/>} />
          <Route path="pages"             element={<AdminPageBuilder/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}
