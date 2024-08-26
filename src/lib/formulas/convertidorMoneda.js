const currency = function(number) {
    return new Intl
        .NumberFormat(
            'es-AR',
            {style: 'currency', currency: 'ars', minimumFractionDigits: 2})
        .format(number);
  };

  export default currency