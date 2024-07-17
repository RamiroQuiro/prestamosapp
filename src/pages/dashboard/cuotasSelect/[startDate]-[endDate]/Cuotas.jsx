import { useStore } from '@nanostores/react'
import React from 'react'
import { rangoCuotasSelect } from '../../../../context/store'

export default function Cuotas() {
const $rangoCuotas=useStore(rangoCuotasSelect)


    return (
    <div>Cuotas</div>
  )
}
