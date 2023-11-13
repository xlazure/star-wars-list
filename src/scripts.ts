export async function useFetch(url: string, options: any = {}): Promise<any> {
  try {
    const response = await fetch(url, options);
    const records:any = await response.json();
    return {loading: false, records, error: null};
  } catch (e:any) {
    return {loading: true, records: null, error: `Error fetching data from ${url}: ${e.message}`};
  }
}
