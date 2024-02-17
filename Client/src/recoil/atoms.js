import { atom } from 'recoil'

const isLoggedInAtom = atom({
    key: 'isLoggedInAtom',
    default: false
})

const rolesAtom = atom({
    key: 'rolesAtom',
    default: null
})

export {
    isLoggedInAtom,
    rolesAtom
}