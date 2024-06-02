const notaArray = [
    {
        id:1,
        products: [ "2cost,2pan","2mac,2sur"]
    },
    {
        id:2,
        products: [ "1con,2mid"]
    },
    {
        id:3,
        products: [ "1con,2mid"]
    },
    {
      id:3,
      products: [ "1con,2mid"]
  },      
]
/*
const [data, setData] = useState([])
const [loading,setloading] = useState(true)

const url = "http://192.168.1.192:8686/cuentas"

useEffect(()=>{
  fetch(url)
  .then((response)=>response.json())
  .then((json)=>setData(json))
  .catch((error)=>console.error(error))
  .finally(()=>setloading(false))
},[])
*/

/*<View>
{loading ? ( <Text>Loading....</Text>) : ( 
  data.map((post,xid)=>(
    <View key={xid}>
      <Text style={styles.texto}>{post._id.slice(-2)}</Text>
    </View>
  ))
)}
</View>*/

let cuenta = notaArray.map((product) => {
    return product.products
})

export { notaArray,cuenta };

