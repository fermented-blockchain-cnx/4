import { helper } from '@/lib/helper'
import { useStore } from '@/store/index'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  Image,
  Img,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import { observer, useLocalStore, useObserver } from 'mobx-react-lite'
import { IoMoon, IoSunny } from 'react-icons/io5';
import Link from 'next/link'
import React from 'react'
import Jazzicon from '../Jazzicon'

export const DesktopNav = observer((props: BoxProps) => {
  const { god, lang } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSizeClick = () => {
    onOpen()
  }

  const store = useLocalStore(() => ({
    showConnecter() {
      god.setShowConnecter(true)
    },

    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true
    },
  }))

  const NavLink = ({ pathUrl, name }) => (
    <Link href={pathUrl ? pathUrl : '/'}>
      <Button
        variant="ghost"
        px={2}
        py={1}
        rounded={'md'}
        fontSize="sm"
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        {name}
      </Button>
    </Link>
  )

  const Links = [

  ]

  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return (
        <Button colorScheme="pink" onClick={store.showConnecter}>
          {lang.t('connect.wallet')}
        </Button>
      )
    }
    return (
      <Button pr="0" pl="4" bg={useColorModeValue('gray.100', 'dark.100')}>
        <Text mr="2" fontSize="sm">
          <chakra.span mr={1}>{god.currentChain.Coin.balance.format}</chakra.span>
          <chakra.span>{god.currentChain.Coin.symbol}</chakra.span>
        </Text>
        <Button
          px={4}
          onClick={store.showWalletInfo}
          sx={{
            color: 'white',
            bgGradient: god.currentChain.info.theme?.bgGradient,
            _hover: { bgGradient: god.currentChain.info.theme?.bgGradient },
            _active: { bgGradient: god.currentChain.info.theme?.bgGradient },
          }}
        >
          <Text mr={2}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</Text>
          <Jazzicon
            diameter={22}
            address={god.currentNetwork.account}
            style={{ border: '2px solid #617aff', borderRadius: '50px', padding: '1px' }}
          ></Jazzicon>
        </Button>
      </Button>
    )
  })

  return (
    <Stack direction={'column'} spacing={2} {...props} w={'100%'}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <HamburgerIcon w={8} h={8} onClick={() => handleSizeClick()} />
        </Box>
        <Box>
          {/* <Image src={'icon/CCDC_logo.png'} w={'175px'} /> */}
        </Box>
      </Flex>
      <Divider />
      <HStack spacing={8} justifyContent="space-between">
        <Box>
          {lang.configs.map((i) => (
            <Button
              isActive={i.lang === lang.lang}
              bg={'none'}
              key={i.lang}
              onClick={() => {
                onClose()
                lang.setLang(i.lang)
              }}
            >
              <Image src={`/images/${i.lang}.png`} boxSize="15px" />
            </Button>
          ))}
        </Box>
        <Box>
          <Stack direction={'row'} spacing={2} {...props}>
            <Button onClick={store.showConnecter} pl={1} borderRadius="40">
              <Img w={8} src={god.currentChain.logoUrl} />
              <Box ml={2}>{god.currentChain.name}</Box>
            </Button>
            {accountView}
            <IconButton borderRadius="12" aria-label={'Toggle Color Mode'} onClick={toggleColorMode} icon={colorMode == 'light' ? <IoMoon size={18} /> : <IoSunny size={18} />} />
          </Stack>
        </Box>
      </HStack>
      <Divider colorScheme="green300" />
      <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
        <Box mx="auto" mt="24px">
          {Links.map((link, index) => (
            <NavLink key={index} pathUrl={link.url} name={link.name} />
          ))}
        </Box>
      </HStack>
      <>
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Image src={'icon/CCDC_logo.png'} w={'175px'} />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList>
                {Links.map((link, index) => (
                  <ListItem key={index}>{link}</ListItem>
                ))}
              </UnorderedList>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </Stack>
  )
})
