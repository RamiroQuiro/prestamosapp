import Td from "./Td";

// Componente Tr
export default function Tr({ id, data, styleTr, onClick }) {
  // Crear una copia del objeto data sin la propiedad id
  const dataSinId = { ...data };
  delete dataSinId.id;
  delete dataSinId.href
  return (
    <tr onClick={onClick} id={id} className={styleTr}>
      {Object?.values(dataSinId)?.map((value, i) => (
        <Td estado={data.estado} key={i}>{value}</Td>
      ))}
    </tr>
  );
}
