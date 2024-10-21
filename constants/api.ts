export enum DatabaseNames {
  MAIN = "physiotherapy",
}

export enum Collections {
  DOCTORS = "doctors",
  BOOKINGS = "bookings",
}

export enum ApiEndpoints {
  DOCTORS = "/api/doctors",
  BOOKINGS = "/api/bookings",
  SEED = "/api/seed",
}

export enum ApiErrors {
  FETCH_DOCTORS = "Failed to fetch doctors.",
  CREATE_BOOKING = "Failed to create booking.",
  SEED_DATA = "Failed to seed data.",
  DATABASE_CONNECTION = "Database connection failed.",
}
