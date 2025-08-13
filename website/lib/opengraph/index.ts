export async function loadGoogleFont(fontSpec: string) {
  const url = `https://fonts.googleapis.com/css2?family=${fontSpec}&display=swap`;
  const css = await (await fetch(url)).text();
  const match = css.match(
    /src:\s*url\((.+?)\)\s*format\('(opentype|truetype)'\)/,
  );
  if (!match) throw new Error("failed to load font data");
  const fontUrl = match[1];
  const res = await fetch(fontUrl);
  if (res.status !== 200) throw new Error("failed to fetch font file");
  return await res.arrayBuffer();
}
