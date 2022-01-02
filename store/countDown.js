import create from 'zustand';

export const useCountDown = create(set => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOutOfTime: false,
    updateCountDown: (d, h, m, s) =>
        set({
            days: d,
            hours: h,
            minutes: m,
            seconds: s,
        }),
    checkIsOutOfTime: () =>
        set(state => {
            if (
                state.days <= 0 &&
                state.hours <= 0 &&
                state.minutes <= 0 &&
                state.seconds <= 0
            )
                return { isOutOfTime: true };
        }),
}));
