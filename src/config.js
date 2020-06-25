
// module.exports = {
//   apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
// }
const production = process.env.NODE_ENV === "production";
export const apiBaseUrl = production ? "https://backsketchcircle.herokuapp.com/" : process.env.REACT_APP_API_BASE_URL;
