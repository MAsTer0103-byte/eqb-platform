/**
 * Shared types for EQB Platform
 * Used by both frontend and backend
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COWORKER';
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  createdAt: Date;
  updatedAt: Date;
}

export interface CoworkerProfile {
  id: string;
  userId: string;
  phone?: string;
  bio?: string;
  specializations: string[];
  profileImageUrl?: string;
  iban?: string;
  taxId?: string;
  companyName?: string;
  isActive: boolean;
  hasRestriction: boolean;
  restrictionReason?: string;
}

// ============================================================================
// CLIENTS & APPOINTMENTS
// ============================================================================

export interface Client {
  id: string;
  email: string;
  name: string;
  phone?: string;
  taxId?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  birthDate?: Date;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  coworkerId: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  durationHours: number;
  type: string;
  notes?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'MODIFIED';
  roomType: 'Training' | 'Treatment';
  roomNumber?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentWithRelations extends Appointment {
  coworker: CoworkerProfile;
  client: Client;
}

// ============================================================================
// MODIFICATION & AUTHORIZATION
// ============================================================================

export interface ModificationRequest {
  id: string;
  appointmentId: string;
  coworkerId: string;
  requestType: 'RESCHEDULE' | 'CANCEL_WITH_CHANGE' | 'EXTEND';
  newStartTime?: Date;
  newEndTime?: Date;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// BACKLOG & INVOICING
// ============================================================================

export interface BacklogEntry {
  id: string;
  appointmentId: string;
  coworkerId: string;
  hoursWorked: number;
  roomType: string;
  month: number;
  year: number;
  dayWorked: number;
  status: 'OPEN' | 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'CONTESTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlyRecap {
  id: string;
  coworkerId: string;
  month: number;
  year: number;
  totalHours: number;
  trainingHours: number;
  treatmentHours: number;
  appointmentCount: number;
  status: 'OPEN' | 'REQUESTED' | 'CONFIRMED' | 'CONTESTED' | 'APPROVED';
  confirmedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  coworkerId: string;
  month: number;
  year: number;
  totalAmount: number;
  currency: string;
  hoursWorked: number;
  hourlyRate: number;
  invoiceNumber: string;
  pdfUrl?: string;
  backlogAttachmentUrl?: string;
  status: 'GENERATED' | 'SENT' | 'RECEIVED' | 'ARCHIVED';
  sentAt?: Date;
  receivedAt?: Date;
  paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE';
  paymentDate?: Date;
  paymentMethod?: string;
  paymentReference?: string;
  paymentEvidence?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateAppointmentRequest {
  coworkerId: string;
  clientId: string;
  startTime: string;
  endTime: string;
  type: string;
  roomType: 'Training' | 'Treatment';
  roomNumber?: number;
  notes?: string;
}

export interface ModifyAppointmentRequest {
  appointmentId: string;
  newStartTime?: string;
  newEndTime?: string;
  reason: string;
}

export interface ConfirmRecapRequest {
  recapId: string;
}

export interface ContestRecapRequest {
  recapId: string;
  reason: string;
}

// ============================================================================
// ANALYTICS & CAPACITY
// ============================================================================

export interface CapacitySnapshot {
  id: string;
  month: number;
  year: number;
  totalAvailableHours: number; // 1500
  totalUsedHours: number;
  utilisationPercentage: number;
  trainingUsedHours: number;
  treatmentUsedHours: number;
  activeCoworkers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  capacityUtilization: number;
  monthlyRevenue: number;
  pendingAuthorizations: number;
  overdueInvoices: number;
  activeCoworkers: number;
  totalClients: number;
  monthlyAppointments: number;
}
