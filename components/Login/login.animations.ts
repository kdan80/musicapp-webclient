export const userText = {
    initial: {
        opacity: 0,
        x: -100,
        zIndex: -10,
      },
    enter: {
        opacity: 1,
        x: 0,
        zIndex: 10,
    },
    exit: {
        opacity: 0,
        x: -100,
        zIndex: -10,
    },
}

export const guestText = {
    initial: {
        opacity: 0,
        x: 100,
        zIndex: -20,
    },
    enter: {
        opacity: 1,
        x: 0,
        zIndex: 20,
    },
    exit: {
        opacity: 0,
        x: 100,
        zIndex: -20,
    },
}

export const submitButton = {
    initial: {
        scale: 0,
        zIndex: -1
    },
    enter: {
        scale: 1,
        zIndex: 1
    },
    exit: {
        scale: 0,
        zIndex: -1
    }
}