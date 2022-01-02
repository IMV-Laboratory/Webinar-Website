import { useQuery, useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const checkWebinarDate = async () => {
    const { data, error } = await supabase
        .from('webinars')
        .select('held_on, open_registration')
        .eq('open_registration', true)
        .single();

    if (error) throw new Error(error.message);
    console.log('DATE:', data.held_on);

    return data.held_on;
};

export const useWebinarDate = () => {
    return useQuery('webinar_date', checkWebinarDate);
};

const registerParticipant = async (fullname, email, phone, major) => {
    console.log(fullname, email, phone, major);

    if (!fullname || !email || !phone || !major) {
        throw new Error('Semua data wajib diisi!');
    }

    const { data: activeWebinar, error: activeWebinarError } = await supabase
        .from('webinars')
        .select()
        .eq('open_registration', true)
        .single();

    if (activeWebinarError) throw new Error(activeWebinarError.message);

    console.log('Active Webinar:', activeWebinar);

    if (activeWebinar) {
        const { data: existingParticipant, error: existingParticipantError } =
            await supabase
                .from('webinar_participants')
                .select('fullname, email, webinar')
                .eq('webinar', activeWebinar.id)
                .or(`email.eq.${email},fullname.eq.${fullname}`);

        if (existingParticipantError)
            throw new Error(existingParticipantError.message);

        if (existingParticipant.length > 0) {
            throw new Error(
                `Halo ${existingParticipant[0].fullname}, kamu sudah terdaftar sebagai peserta webinar. Mohon ditunggu informasi selanjutnya ya 😊.`
            );
        } else {
            const { error: registartionError } = await supabase
                .from('webinar_participants')
                .insert({
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    major: major,
                    webinar: activeWebinar.id,
                    status: 'Mahasiswa',
                    organization: 'Telkom University',
                    attendance: false,
                });

            if (registartionError) throw new Error(registartionError.message);

            const message = `Selamat ${fullname}, kamu sudah terdaftar sebagai peserta webinar. Mohon ditunggu informasi selanjutnya ya 😊.`;
            return message;
        }
    } else {
        throw new Error('There is no active webinar currently!');
    }
};

export const useRegistration = (fullname, email, phone, major) => {
    return useMutation(() =>
        registerParticipant(fullname, email, phone, major)
    );
};
