/**
 * Kumpulan gaya untuk tampilan web yang digunakan dalam layouting komponen.
 *
 * @constant {Object} layoutStyle
 * @property {string} phonecontainer - Gaya untuk container utama yang mengisi seluruh layar handphone dengan posisi relatif dan latar belakang khusus.
 * @property {string} phonelayout - Gaya untuk layout inti dengan lebar tetap 30rem (ukuran handphone), tinggi dinamis, dan efek bayangan untuk tampilan yang elegan.
 * @property {string} flexLayout - Gaya dasar flexbox dengan lebar penuh dan item yang disejajarkan secara vertikal di tengah.
 * @property {string} flexCenter - Gaya flexbox untuk menyusun elemen secara horizontal dan vertikal di tengah.
 * @property {string} flexCol - Flexbox dengan arah kolom (vertical).
 * @property {string} flexColCenter - Flexbox dengan arah kolom, item diatur di tengah secara horizontal dan vertikal.
 * @property {string} flexBetween - Flexbox dengan distribusi jarak antar elemen (space-between).
 * @property {string} flexAround - Flexbox dengan distribusi jarak di sekitar elemen (space-around).
 * @property {string} flexEvenly - Flexbox dengan distribusi jarak yang merata (space-evenly).
 * @property {string} gridCenter - Grid layout dengan item yang disejajarkan di tengah secara horizontal dan vertikal.
 * @property {string} absoluteCenter - Posisi absolute yang sepenuhnya di tengah elemen parent.
 */

const layoutStyle = {
    phonecontainer:
        "relative overflow-x-hidden flex h-full w-full items-center justify-center bg-background",
    phonelayout:
        "w-[30rem] fixed overflow-x-hidden z-20 min-h-screen bg-white max-phone:w-full shadow-lg  !pt-0",
    // Flexbox utilities
    flexLayout: "flex items-center w-full",
    flexCenter: "flex items-center justify-center w-full",
    flexCol: "flex flex-col w-full gap-1",
    flexColCenter: "flex flex-col items-center w-full justify-center",
    flexBetween: "flex w-full justify-between items-center",
    flexAround: "flex w-full justify-around items-center",
    flexEvenly: "flex w-full justify-evenly items-center",

    // Grid utilities
    gridCenter: "grid place-items-center",

    // Absolute positioning
    absoluteCenter: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
};

export default layoutStyle;
