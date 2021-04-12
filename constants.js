import axios from "axios"
import { Dimensions } from "react-native"
export const MAX_WIDTH = Dimensions.get("window").width
export const MAX_HEIGHT = Dimensions.get("screen").height
const storeIcons = [
    {
        name: "Xbox Store",
    img: "https://compass-ssl.xbox.com/assets/56/72/5672b413-1b6a-4307-b1df-e4ff5311ee8d.svg?n=03958693_App-Icon-0_120x120.svg"
    },
    {
        name: "Steam",
    img: "data:image/png;base64,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"
    },
    {
        name: "PlayStation Store",
    img: "https://icon2.cleanpng.com/20180513/fjw/kisspng-playstation-4-raiders-of-the-broken-planet-playsta-5af8ffaf488867.3450057915262678232971.jpg"
    },
    {
        name: "Xbox 360 Store",
    img: "https://img2.pngio.com/xbox-store-logo-png-xbox-games-store-png-321_342.png"
    },
    {
        name: "GOG",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/GOG.com_logo.svg/840px-GOG.com_logo.svg.png"
    },
    {
        name: "Epic Games",
    img: "https://p.kindpng.com/picc/s/200-2007292_transparent-games-clipart-black-and-white-epic-games.png"
    },
    {
        name: "Google Play",
    img: "https://cdn.iconscout.com/icon/free/png-256/google-play-11-722703.png"
    },
    {
        name: "App Store",
    img: "https://i.pinimg.com/originals/92/3d/d0/923dd092ebf5d55e08be97063316e2c7.png"
    },
]
export function setIcon(name) {
    const res = storeIcons.find(s => s.name === name)
    return res && res.img
}
const genresIcons = [
    {
        name: "Adventure",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiVkV3T3cIWM9eHURuUH51gQEKeVU1t8g4CQ&usqp=CAU"
},
{
    name: "Action",
    img: "https://vistapointe.net/images/cyclops-wallpaper-3.jpg"
},
{
    name: "Shooter",
    img: "https://i.pinimg.com/originals/b7/bf/a2/b7bfa214491121058a753ab1b523bf6e.png"
},
{
    name: "Puzzle",
    img: "https://images.vexels.com/media/users/3/141049/isolated/lists/698dcc7cad0a5cb79122634623ab4021-puzzle-cartoon.png"
},
{
    name: "RPG",
    img: "https://i.pinimg.com/originals/0b/34/56/0b34565da1d5ef5ffadd4e404415ab31.png"
},
]
export const setGenreIcon = (name) => {
    const res = genresIcons.find(g => g.name === name)
    return res && res.img
}