import { createClient } from "@supabase/supabase-js";



const projectURL = process.env.REACT_APP_SUPABASE_URL;
const projectKey = process.env.REACT_APP_SUPABASE_ANON_KEY; 
export const supabase = createClient(projectURL, projectKey);