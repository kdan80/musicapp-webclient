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





// const delay = .25
// const xOffset = 125

// export const hideUserText = {

//     initial: {
//         x: 0,
//         opacity: 1,
//         zIndex: 2,
//     },

//     animate: {
//         x: xOffset * -1,
//         opacity: 0,
//         zIndex: 1
//     }
// }

// export const showUserText = {

//     initial: {
//         x: xOffset * -1,
//         opacity: 0,
//         zIndex: 1,
//     },

//     animate: {
//         x: 0,
//         opacity: 1,
//         zIndex: 2,
//         transition: {
//             delay: delay
//         }
//     }
// }

// export const hideGuestText = {

//     initial: {
//         x: 0,
//         translateY: "-200%",
//         opacity: 1,
//         zIndex: 2,
//     },

//     animate: {
//         x: xOffset,
//         translateY: "-200%",
//         opacity: 0,
//         zIndex: 1
//     }
// }

// export const showGuestText = {

//     initial: {
//         x: xOffset,
//         translateY: "-200%",
//         opacity: 0,
//         zIndex: 1,
//     },

//     animate: {
//         x: 0,
//         opacity: 1,
//         translateY: "-200%",
//         zIndex: 2,
//         transition: {
//             delay: delay
//         }
//     }
// }

// export const buttonText = {

//     initial: {
//         scale: 0
//     },

//     animate: {
//         scale: 1
//     }
// }