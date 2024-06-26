enum Status {
  Active = 'active',
  Suspended = 'suspended',
}
enum UserRole {
  Admin = 'admin',
  SuperAdmin = 'super-admin',
  Patient = 'patient',
  Doctor = 'doctor',
}

enum RolePermissions {
  Admin = 'admin',
  Doctor = 'doctor',
  Master = 'master',
  Queries = 'queries',
  Patient = 'patient',
  Pharmacy = 'pharmacy',
  Diagnostics = 'diagnostics',
  CustomerCare = 'customer-care',
  EmergencyRequests = 'emergency-requests',
  BloodDonorRequest = 'blood-donor-request',
  MedicalRepresentatives = 'medical-representatives',
}

enum Gender {
  Male = 'male',
  Female = 'female',
}

export { Status, UserRole, RolePermissions, Gender };
