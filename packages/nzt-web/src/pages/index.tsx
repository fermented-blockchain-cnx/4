import { useInterval } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { add } from 'lodash'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React from 'react'
import ORACLE_ABI from '../constants/abi/myoracle.json'
import { useStore } from '../store'

import { MyOracle__factory } from '../generated/factories/MyOracle__factory'
import { YourContract__factory } from '../generated/factories/YourContract__factory'
import { YourContract } from 'generated/YourContract'
import { ContractFactory } from 'ethers'




const FullMap: any = dynamic(() => import('../components/Maps') as any, {
  ssr: false,
})

export const Home = observer(() => {
  const { lang, god } = useStore()
  const { library, chainId } = useWeb3React()

  const addr = '0x767fF00098f128c4660ECB7edA5d251Bf19211E8'
  const ccc = new MyOracle__factory().attach(addr)

  const [rectangle, setRectangle] = React.useState<[number, number, string][]>([])

  async function run() {
    try {
      const locations: any[] = (await god.currentNetwork.execContract({
        address: addr,
        abi: ORACLE_ABI,
        method: 'getAllLocations',
        params: [],
      })) as any[]
      // console.log(locations)

      const arr = []
      for (const loc of locations) {
        arr.push([loc.lat, loc.lon, loc.name])
      }

      if (rectangle.length != arr.length) {
        setRectangle(arr)
        console.log('updating..', arr[arr.length -1])
      }
      else {
        console.log('no change')
      }
        const contract =  ccc.connect(library.getSigner())
        console.log(">", await contract.dummy())
        console.log(await contract.getAllLocations());
    } catch (e) {
      console.log(e)
    }
  }

  useInterval(() => {
    run()
  }, 2000)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     run()
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <>
      <div className="container flex flex-col items-center mx-auto">
        <FullMap markers={rectangle} hello="world" />
      </div>
    </>
  )
})

export default Home
