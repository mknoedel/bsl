import fetch from 'isomorphic-unfetch'

export async function fetcher(
  input: RequestInfo,
  init?: RequestInit
): Promise<any> {
  try {
    const data = await fetch(input, init).then(res => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

