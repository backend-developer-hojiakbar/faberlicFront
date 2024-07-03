const auth = {
  async signUp(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password2: string
  ) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_FABERLIC_API}/accounts/register/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          password,
          password2,
        }),
      }
    );
    return data;
  },
  async login(email: string, password: string) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_FABERLIC_API}/accounts/login/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    return data;
  },
  async logOut(refresh_token: string) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_FABERLIC_API}/accounts/logout/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );
    return data;
  },
  async verify(otp: string) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_FABERLIC_API}/accounts/verify-email/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      }
    );
    return data;
  },
};

export default auth;
