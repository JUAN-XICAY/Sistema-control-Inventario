export function ConvertirCapitalize(input){
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function FormatearNumeroDinero(numero) {
    const numeroconvertido = numero.toLocaleString("es-GT", {
      style: "currency",
      currency: "GTQ",
    });
    return numeroconvertido;
  }
  