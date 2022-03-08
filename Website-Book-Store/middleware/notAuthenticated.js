export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  let dataLogin = process.browser ? JSON.parse(localStorage.getItem('data_login')) : null;
  if (!dataLogin) {
    return redirect('/');
  }
}