import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const CertificationsPage = lazy(() => import('@/pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminProjectsPage = lazy(() => import('@/pages/admin/AdminProjectsPage').then((m) => ({ default: m.AdminProjectsPage })));
const AdminExperiencePage = lazy(() => import('@/pages/admin/AdminExperiencePage').then((m) => ({ default: m.AdminExperiencePage })));
const AdminCertificationsPage = lazy(() => import('@/pages/admin/AdminCertificationsPage').then((m) => ({ default: m.AdminCertificationsPage })));
const AdminPersonalPage = lazy(() => import('@/pages/admin/AdminPersonalPage').then((m) => ({ default: m.AdminPersonalPage })));
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/experience" element={<PublicLayout><ExperiencePage /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
        <Route path="/certifications" element={<PublicLayout><CertificationsPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Admin routes */}
        <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminLoginPage /></Suspense>} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageLoader />}><AdminProjectsPage /></Suspense>} />
          <Route path="experience" element={<Suspense fallback={<PageLoader />}><AdminExperiencePage /></Suspense>} />
          <Route path="certifications" element={<Suspense fallback={<PageLoader />}><AdminCertificationsPage /></Suspense>} />
          <Route path="personal" element={<Suspense fallback={<PageLoader />}><AdminPersonalPage /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageLoader />}><AdminSettingsPage /></Suspense>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
