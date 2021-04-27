export async function register(email, password) {
  //Login is using localStorage as an example here, please note that for real use cases you should not store the user data in front-end
  try {
    let users = await JSON.parse(localStorage.getItem("listfav-users"));

    let usr = [];
    if (users) {
      usr = await users.filter((user) => {
        return user.email === email;
      });

      if (usr.length > 0) {
        return { error: "There is already a user with this email" };
      }

      await users.push({ email: email, password: password, favorites: [] });
      localStorage.setItem("listfav-users", JSON.stringify(users));
      return { success: true };
    }

    localStorage.setItem(
      "listfav-users",
      JSON.stringify([{ email: email, password: password, favorites: [] }])
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Oops, something unexpected occured, please try again " };
  }
}
