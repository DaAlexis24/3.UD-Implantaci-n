export function fizzbuzz(n: number): string {
  // Se crea responses ya que fizz y buzz son magic strings
  const responses: [string, string, string] = ['Fizz', 'Buzz', 'FizzBuzz'];

  if (n % 3 === 0 && n % 5 === 0) {
    return responses[2];
  } else if (n % 3 === 0) {
    return responses[0];
  } else if (n % 5 === 0) {
    return responses[1];
  } else {
    return n.toString();
  }
}

// Función que imprima cosas es un void
export function fizzBuzzSerie(limit = 100): void {
  for (let i = 1; i <= limit; i++) {
    console.log(fizzbuzz(i));
  }
}

fizzBuzzSerie();
