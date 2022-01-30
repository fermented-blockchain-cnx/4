import { useInterval } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { add } from 'lodash'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import ORACLE_ABI from '../constants/abi/myoracle.json'
import { useStore } from '../store'

import { MyOracle__factory } from '../generated/typechain/factories/MyOracle__factory'
import { MyOracle, MySimpleContract, MySimpleContract__factory } from 'generated/typechain'


const FullMap: any = dynamic(() => import('../components/Maps') as any, {
  ssr: false,
})

export const Home = observer(() => {
  const { lang, god } = useStore()
  const { library, chainId } = useWeb3React()

  const myOracleContractFactory = new MyOracle__factory().attach('')
  const simpleContractFactory = new MySimpleContract__factory().attach('')

  const [rectangle, setRectangle] = React.useState<[number, number, string][]>([])

  async function run() {
    if (!library) return;
      const contract:MyOracle =  myOracleContractFactory.connect(library.getSigner())
      const simpleContract:MySimpleContract =  simpleContractFactory.connect(library.getSigner())
      const locations = await contract.getAllLocations();

      console.log(await simpleContract.getName());

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
  }

  useInterval(() => {
    run()
  }, 2000)

  useEffect(() => {
    if (!library) return;
    console.log('chainId', chainId, 'library is ready')
    const simpleContract:MySimpleContract =  simpleContractFactory.connect(library.getSigner())
    simpleContract.setName('Hello World!');


  }, [library])

  return (
    <>
      <div className="container flex flex-col items-center mx-auto">
        <FullMap markers={rectangle} hello="world" />
      </div>
    </>
  )
})

export default Home
