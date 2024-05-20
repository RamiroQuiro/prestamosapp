export async function GET({params}) {
    return new Response(JSON.stringify({
        data:'hello andando men'
    }))
}