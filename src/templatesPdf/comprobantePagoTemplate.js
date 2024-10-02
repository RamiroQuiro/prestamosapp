function generateHTMLComprobantePago(infoData, cabecera) {
    // console.log(cabecera, infoData, cabecera);
    return `
    
    
 <html>
      <head>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f8f8f8;
    width:50vw;
    padding:20px;
    margin:20px;
    border:1px solid #cccccc
  }

  .semibold {
    font-weight: 600;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .container {
    width: 70%;
    margin: 20px auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .header .logo {
    max-width: 150px;
  }

  .header .company-info {
    text-align: right;
  }

  .company-info h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }

  .company-info p {
    margin: 2px 0;
    font-size: 14px;
    color: #555;
  }

  .invoice-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    gap: 10px 0;
    padding-bottom: 10px;
  }

  .invoice-info .customer-info,
  .invoice-info .invoice-details {
    display: inline-block;
    vertical-align: top;
    border-bottom: 1px solid #e0e0e0;
  }

  .customer-info h3,
  .invoice-details h3 {
    margin: 0;
    font-size: 16px;
    color: #555;
  }

  .customer-info p,
  .invoice-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  table th,
  table td {
    text-align: left;
    padding: 12px;
    border: 1px solid #e0e0e0;
  }

  table th {
    background: #f4f4f4;
    color: #333;
  }

  .total-section {
    text-align: right;
    margin-top: 20px;
  }

  .total-section .total-label {
    font-size: 16px;
    color: #333;
  }

  .total-section .total-amount {
    font-size: 20px;
    color: #555;
    font-weight: bold;
  }

  .footer {
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
    color: #999;
  }
</style>
      </head>
      <body>

      <div>
    <!-- Header: Logo and Company Information -->
    <div class="header">
      <img
        width="130px"
        height="130px"
        src=${infoData?.usuario?.src}
        alt="Logo de la Empresa"
        class="logo"
      />
      <div class="company-info">
        <h2 class="semibold capitalize">${infoData?.usuario?.userName}</h2>
        <p>
          Nombre: ${infoData?.usuario?.nombre}
          ${" "}${infoData?.usuario?.apellido}
        </p>
        <p>Dirección: ${infoData?.usuario?.direccion}</p>
        <p>
          Ciudad: ${infoData?.usuario?.ciudad} Provincia: ${
            infoData?.usuario?.provincia
          }
        </p>
        <p>Teléfono: ${infoData?.usuario?.celular}</p>
      </div>
    </div>

    <!-- Invoice Information: Customer and Invoice Details -->
    <div class="invoice-info">
      <div class="customer-info capitalize">
        <h3 class="semibold">Información del Cliente</h3>
        <p>
          Nombre: ${infoData?.cliente?.nombre}
          ${" "}${infoData?.cliente?.apellido}
        </p>
        <p>Dirección: ${infoData?.cliente?.direccion}</p>
        <p>
          Ciudad: ${infoData?.cliente?.ciudad} | ${infoData?.cliente?.provincia}
        </p>
        <p>Teléfono: ${infoData?.cliente?.celular}</p>
      </div>
      <div class="invoice-details">
        <h3 class="semibold">Detalles del Comprobante</h3>
        <p>ID Comprobante: ${infoData?.pago?.id}</p>
        <p>ID Cuota: ${infoData?.pago?.cuotaId}</p>
        <p>Fecha: ${infoData?.pago?.fechaPago.toLocaleString()}</p>
        <p>Metodo de Pago: ${infoData?.pago?.metodoPago}</p>
      </div>
    </div>

    <!-- Total Section -->
    <div class="total-section">
      <p class="total-label">Total Pagado:</p>
      <p class="total-amount">${infoData?.pago?.monto.toLocaleString()}</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>Gracias por su preferencia</p>
      <p>
        Este comprobante ha sido generado automáticamente y no requiere firma.
      </p>
    </div>
  </div>
    </body>
    `}



    export {generateHTMLComprobantePago}