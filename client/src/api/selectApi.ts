export async function fetchOptions() {
  const res = await fetch("http://localhost:4000/options/for/select");

  if (!res.ok) {
    throw new Error("Ошибка загрузки списка");
  }

  return res.json();
}

export async function sendSelectedOption(value: string) {
  const res = await fetch("http://localhost:4000/selected/option", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });

  if (!res.ok) {
    throw new Error("Ошибка отправки данных");
  }

  return res.json();
}
