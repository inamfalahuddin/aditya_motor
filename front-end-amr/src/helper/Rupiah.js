export default function Rupiah(bilangan) {
  let reverse = bilangan.toString().split("").reverse().join("");

  let ribuan = reverse.match(/\d{1,3}/g);
  if (ribuan) {
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  }

  return 0;
}
