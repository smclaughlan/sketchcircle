
// module.exports = {
//   apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
// }
const production = process.env.NODE_ENV === "production";
const apiBaseUrl = production ? "https://backsketchcircle.herokuapp.com" : process.env.REACT_APP_API_BASE_URL;
const localBaseUrl = production ? "https://sketchcircle.herokuapp.com" : "http://localhost:3000"
export {
  apiBaseUrl,
  localBaseUrl,
}
