import { identity } from '@/data/People'

export async function transmit(
  route: string,
  data: unknown,
): Promise<Response> {
  return window.fetch(
    `http://localhost:8888${route.startsWith('/') ? route : `/${route}`}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '1YMX_W_SDEJF_WJKNK_JNKN_Z': encodeURI(identity.id),
        '0X238bx04898349':
          '41a7b34a578249488e6725eea0979ae3d01f0c8ae9e1403d9544a9d77bbc2239', // FIXME: Don't hardcode this in the future
      },
      body: JSON.stringify({
        data,
      }),
    },
  )
}
