export async function transmit(
  route: string,
  data: unknown,
): Promise<Response> {
  const authHeaders: Record<string, string> = {}

  if (window.id) {
    authHeaders['1YMX_W_SDEJF_WJKNK_JNKN_Z'] = encodeURI(window.id)
  }

  if (window.token) {
    authHeaders['0X238bx04898349'] = window.token
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
