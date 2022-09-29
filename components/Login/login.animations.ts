const delay = .25
const xOffset = 125

export const userText = {

    show: {
        x: 0,
        opacity: 1,
        zIndex: 2,
        transition: {
            delay: delay
        }
    },

    hide: {
        x: xOffset * -1,
        opacity: 0,
        zIndex: 1,
    }
}

export const guestText = {

    show: {
        x: 0,
        opacity: 1,
        zIndex: 2,
        transition: {
            delay: delay
        }
    },

    hide: {
        x: xOffset,
        opacity: 0,
        zIndex: 1
    }

}

export const buttonText = {

    initial: {
        scale: 0
    },

    animate: {
        scale: 1
    }
}