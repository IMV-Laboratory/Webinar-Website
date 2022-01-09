import { useQuery, useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const checkWebinarDate = async () => {
    const { data, error } = await supabase
        .from('webinars')
        .select('held_on, open_registration')
        .eq('open_registration', true)
        .single();

    if (error) throw new Error(error.message);

    return data.held_on;
};

export const useWebinarDate = () => {
    return useQuery('webinar_date', checkWebinarDate);
};

const registerParticipant = async (
    fullname,
    email,
    phone,
    igUsername,
    isFollower,
    major,
    year,
    profile
) => {
    console.log(fullname, email, phone, igUsername, isFollower, major, year);

    if (
        !fullname ||
        !email ||
        !phone ||
        !igUsername ||
        !major ||
        !year ||
        !profile
    ) {
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
            if (!isFollower) {
                throw new Error(
                    'Anda belum mengikuti @imv.laboratory di Instagram!'
                );
            }

            const filename = `${fullname
                .toLowerCase()
                .replace(' ', '_')}_profile_${Date.now()}`;

            const { data: profileUpload, error: profileUploadError } =
                await supabase.storage
                    .from('webinar-photos')
                    .upload(`profile/${filename}`, profile, {
                        cacheControl: 0,
                        upsert: true,
                    });

            if (profileUploadError) throw new Error(profileUploadError.message);

            let profileURL = null;
            if (profileUpload) {
                const { data: urlData, error: errorURLData } =
                    await supabase.storage
                        .from('webinar-photos')
                        .getPublicUrl(`profile/${filename}`);

                if (errorURLData) throw new Error(errorURLData.message);
                if (urlData) profileURL = urlData.publicURL;
            }

            const { error: registartionError } = await supabase
                .from('webinar_participants')
                .insert({
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    instagram: igUsername,
                    major: major,
                    year: year,
                    webinar: activeWebinar.id,
                    status: 'Mahasiswa',
                    organization: 'Telkom University',
                    attendance: false,
                    profileURL: profileURL,
                });

            if (registartionError) throw new Error(registartionError.message);

            const message = `Selamat ${fullname}, kamu sudah terdaftar sebagai peserta webinar. Mohon ditunggu informasi selanjutnya ya 😊.`;
            return message;
        }
    } else {
        throw new Error('There is no active webinar currently!');
    }
};

export const useRegistration = (
    fullname,
    email,
    phone,
    igUsername,
    isFollower,
    major,
    year,
    profile
) => {
    return useMutation(() =>
        registerParticipant(
            fullname,
            email,
            phone,
            igUsername,
            isFollower,
            major,
            year,
            profile
        )
    );
};
