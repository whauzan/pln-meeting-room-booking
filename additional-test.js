// ===================================================================
// SOAL 1: DERET FIBONACCI
//
// PERTANYAAN:
// Buatlah sebuah program yang menghasilkan deret angka sederhana yang
// susunan angkanya merupakan penjumlahan dari dua angka sebelumnya
// (0,1,1,2,3,5,8,13,21)
// ===================================================================

function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextValue);
  }

  return sequence;
}

// ===================================================================
// SOAL 2: KEUNTUNGAN SAHAM TERBAIK
//
// PERTANYAAN:
// Buatkan fungsi untuk mengambil nilai saham dengan keuntungan terbaik
//
// Contoh:
// Input : [10,9,6,5,15]
// Output : 10
// (Beli di harga 5, jual di harga 15 = keuntungan 10)
//
// Soal yang harus diselesaikan:
// 1. [7,8,3,10,8]
// 2. [5,12,11,12,10]
// 3. [7,18,27,10,29]
// 4. [20,17,15,14,10]
// ===================================================================

function maxStockProfit(prices) {
  if (prices.length < 2) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Update harga minimum jika ditemukan harga yang lebih rendah
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }

    // Hitung keuntungan jika menjual pada hari ini
    const currentProfit = prices[i] - minPrice;

    // Update keuntungan maksimum
    if (currentProfit > maxProfit) {
      maxProfit = currentProfit;
    }
  }

  return maxProfit;
}

// ===================================================================
// SOAL 3: HITUNG ANGKA DALAM ARRAY STRING
//
// PERTANYAAN:
// Buatkan fungsi untuk mengetahui ada berapa banyak angka yang terdapat
// pada list string array berikut
//
// Contoh:
// Input : [2,h,6,u,y,t,7,j,y,h,8]
// Output : 4
// (Angka yang ditemukan: 2, 6, 7, 8)
//
// Soal yang harus diselesaikan:
// 1. [b,7,h,6,h,k,i,5,g,7,8]
// 2. [7,b,8,5,6,9,n,f,y,6,9]
// 3. [u,h,b,n,7,6,5,1,g,7,9]
// ===================================================================

function countNumbers(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    // Cek apakah elemen adalah angka
    if (typeof arr[i] === "number" || !isNaN(Number(arr[i]))) {
      count++;
    }
  }

  return count;
}

// ===================================================================
// TESTING DAN DEMO
// ===================================================================

console.log("=== SOAL 1: DERET FIBONACCI ===");
console.log("Contoh: 9 angka pertama");
console.log("Hasil:", generateFibonacci(9));
console.log("Output:", generateFibonacci(9).join(","));
console.log();

console.log("=== SOAL 2: KEUNTUNGAN SAHAM TERBAIK ===");
console.log("Contoh: [10,9,6,5,15]");
console.log("Penjelasan: Beli di harga 5, jual di harga 15 = keuntungan 10");
console.log("Hasil:", maxStockProfit([10, 9, 6, 5, 15]));
console.log();

console.log("Soal 1: [7,8,3,10,8]");
console.log("Hasil:", maxStockProfit([7, 8, 3, 10, 8]));
console.log("Penjelasan: Beli di harga 3, jual di harga 10 = keuntungan 7");
console.log();

console.log("Soal 2: [5,12,11,12,10]");
console.log("Hasil:", maxStockProfit([5, 12, 11, 12, 10]));
console.log("Penjelasan: Beli di harga 5, jual di harga 12 = keuntungan 7");
console.log();

console.log("Soal 3: [7,18,27,10,29]");
console.log("Hasil:", maxStockProfit([7, 18, 27, 10, 29]));
console.log("Penjelasan: Beli di harga 7, jual di harga 29 = keuntungan 22");
console.log();

console.log("Soal 4: [20,17,15,14,10]");
console.log("Hasil:", maxStockProfit([20, 17, 15, 14, 10]));
console.log("Penjelasan: Harga terus turun, tidak ada keuntungan = 0");
console.log();

console.log("=== SOAL 3: HITUNG ANGKA DALAM ARRAY ===");
console.log("Contoh: [2,'h',6,'u','y','t',7,'j','y','h',8]");
console.log(
  "Hasil:",
  countNumbers([2, "h", 6, "u", "y", "t", 7, "j", "y", "h", 8])
);
console.log("Penjelasan: Angka yang ditemukan: 2, 6, 7, 8 = total 4");
console.log();

console.log("Soal 1: ['b',7,'h',6,'h','k','i',5,'g',7,8]");
console.log(
  "Hasil:",
  countNumbers(["b", 7, "h", 6, "h", "k", "i", 5, "g", 7, 8])
);
console.log("Penjelasan: Angka yang ditemukan: 7, 6, 5, 7, 8 = total 5");
console.log();

console.log("Soal 2: [7,'b',8,5,6,9,'n','f','y',6,9]");
console.log("Hasil:", countNumbers([7, "b", 8, 5, 6, 9, "n", "f", "y", 6, 9]));
console.log("Penjelasan: Angka yang ditemukan: 7, 8, 5, 6, 9, 6, 9 = total 7");
console.log();

console.log("Soal 3: ['u','h','b','n',7,6,5,1,'g',7,9]");
console.log(
  "Hasil:",
  countNumbers(["u", "h", "b", "n", 7, 6, 5, 1, "g", 7, 9])
);
console.log("Penjelasan: Angka yang ditemukan: 7, 6, 5, 1, 7, 9 = total 6");
console.log();
