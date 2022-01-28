import { useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const checkEmail = async (email, webinarId) => {
    const { data, error } = await supabase
        .from('webinar_participants')
        .select('id, fullname, email, webinar')
        .eq('webinar', webinarId)
        .eq('email', email)
        .single();

    if (error) throw new Error('Email Anda tidak terdaftar!');

    return {
        id: data.id,
        message: `Hai ${data.fullname} 👋🏻, silahkan isi review di bawah ya!`,
    };
};

export const useCheckEmail = (email, webinarId) => {
    return useMutation(() => checkEmail(email, webinarId));
};

const attendParticipant = async (participantId, review, screenshot) => {
    if (!participantId || review === '' || !screenshot) {
        throw new Error('Semua data wajib diisi!');
    }

    const screenshotUrl = await uploadScreenshot(participantId, screenshot);

    const { error } = await supabase
        .from('webinar_participants')
        .update({
            attendance: true,
            review: review,
            screenshot: screenshotUrl,
        })
        .match({ id: participantId });

    if (error) throw new Error(error.message);
    return { message: 'Yeay, kehadiran Anda sudah tercatat di sistem!' };
};

const uploadScreenshot = async (participantId, screenshotFile) => {
    const filename = `${participantId}_screenshot_${Date.now()}`;

    const { data: screenshotUpload, error: screenshotUploadError } =
        await supabase.storage
            .from('webinar-photos')
            .upload(`screenshot/${filename}`, screenshotFile, {
                cacheControl: 0,
                upsert: true,
            });

    if (screenshotUploadError) throw new Error(screenshotUploadError.message);

    let screenshotUrl = null;
    if (screenshotUpload) {
        const { data: urlData, error: errorURLData } = await supabase.storage
            .from('webinar-photos')
            .getPublicUrl(`profile/${filename}`);

        if (errorURLData) throw new Error(errorURLData.message);
        if (urlData) screenshotUrl = urlData.publicURL;
        return screenshotUrl;
    }
};

export const useAttend = (participantId, review, screenshotFile) => {
    return useMutation(() =>
        attendParticipant(participantId, review, screenshotFile)
    );
};
