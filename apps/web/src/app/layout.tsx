import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EQB Platform - Appointment Booking & Invoice Management',
  description: 'Manage appointments and invoices for your wellness center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
