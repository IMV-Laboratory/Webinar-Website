import { useMutation } from 'react-query';

const checkFollower = async username => {
    if (username) {
        console.log(`Checking whether ${username} is follower...`);

        const res = await fetch(
            `https://imvlaboratory.herokuapp.com/username/${username}`
        );
        const data = await res.json();

        if (!data.isFollower)
            throw new Error(
                `Akun Anda ${username}, belum mengikuti @imv.laboratory di Instagram!`
            );

        return data.isFollower;
    } else {
        throw new Error(`Masukkan username Anda!`);
    }
};

export const useCheckFollower = username => {
    return useMutation(() => checkFollower(username));
};
