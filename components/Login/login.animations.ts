export const userText = {

    initial: {
        x: 0,
        opacity: 1,
        zIndex: 2
    },

    animate: {
        x: -100,
        opacity: 0,
        zIndex: 1
    }
}

export const guestText = {

    initial: {
        x: 100,
        translateY: "-200%",
        zIndex: 1,
        opacity: 0,
    },

    animate: {
        x: 0,
        translateY: "-200%",
        zIndex: 2,
        opacity: 1,
    }
}