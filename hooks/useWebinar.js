import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const checkWebinar = async () => {
    const { data, error } = await supabase
        .from('webinars')
        .select('id, title, held_on, open_registration')
        .eq('open_registration', true)
        .single();

    if (error) throw new Error(error.message);

    return data;
};

export const useWebinar = () => {
    return useQuery('webinar', checkWebinar);
};
