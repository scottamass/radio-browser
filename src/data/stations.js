// supabaseUtils.js
import { supabase } from './lib/supabaseClient';

export const fetchStations = async () => {
  try {
    const { data, error } = await supabase.from('stations').select('*');
    if (error) {
      throw new Error(`Error fetching stations from Supabase: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

