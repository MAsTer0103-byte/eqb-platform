/**
 * Dashboard Layout
 */
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">EQB Platform</h1>
              <div className="space-x-4">
                <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </a>
                <a href="/appointments" className="text-gray-700 hover:text-gray-900">
                  Appuntamenti
                </a>
                <a href="/profile" className="text-gray-700 hover:text-gray-900">
                  Profilo
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
