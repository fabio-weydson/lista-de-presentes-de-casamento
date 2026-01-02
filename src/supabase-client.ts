import { createClient } from '@supabase/supabase-js';

const {
    REACT_APP_SUPABASE_URL = "",
    REACT_APP_SUPABASE_KEY = ""
  } = process.env;


export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);