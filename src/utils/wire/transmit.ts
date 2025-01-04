export async function transmit(
  route: string,
  data: unknown,
): Promise<Response> {
  const authHeaders: Record<string, string> = {}

  if (window.loggedIn) {
    authHeaders['1YMX_W_SDEJF_WJKNK_JNKN_Z'] = encodeURI(window.identity.id)
    authHeaders['0X238bx04898349'] = window.identity.token
  }

  return window.fetch(
    `http://localhost:8888${route.startsWith('/') ? route : `/${route}`}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({
        data,
      }),
    },
  )
}
