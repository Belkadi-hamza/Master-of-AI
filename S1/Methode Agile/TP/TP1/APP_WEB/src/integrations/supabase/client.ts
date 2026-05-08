// This file is deprecated - the project now uses Firebase instead of Supabase
// Keeping this file for reference but Supabase is no longer used

// NOTE: This application has been migrated to Firebase.
// All authentication and database operations now use Firebase Auth and Firestore.
// This file is kept for backwards compatibility but should not be imported.

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase is disabled - using Firebase instead
export const isSupabaseConfigured = false;

// Create a dummy client that will throw errors if used
// This prevents import errors but ensures Supabase is not accidentally used
const supabase = new Proxy({} as SupabaseClient<Database>, {
  get() {
    throw new Error(
      'Supabase is no longer used in this project. The application has been migrated to Firebase.\n' +
      'Please use Firebase Auth and Firestore instead.\n' +
      'Import from: @/integrations/firebase/config'
    );
  }
});

export { supabase };