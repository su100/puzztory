export function replaceNewline(text: string) {
  return text.split('\n').map((t, index) => {
    return <p key={index}>{t}</p>;
  });
}
