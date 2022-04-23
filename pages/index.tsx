import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectWallet } from '../components/metamask'
import { Container, Content, Helper, Main, Title } from '../components/common'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { AppBanner } from '../components/appBanner'
import styled from 'styled-components'

const Link = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  padding: 12px 32px;
  margin: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  border-radius: 50px;

  background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
  border: 0;
  color: white !important;
  text-decoration: none;
`

const Home: NextPage = () => {
  const [isMetaMask, setMetaMask] = useState<Boolean>(false)

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setMetaMask(true)
    }
  }, [])

  return (
    <div style={{ background: 'rgb(15 19 22)' }}>
      <Container>
        <Head>
          <title>HENKAKU Shiniri</title>
          <meta name='description' content='' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Main>
          <Title>HENKAKU Shiniri - 新入り</Title>
          <Content>
            <p>
              Welcome to HENKAKU Community. Set up your MetaMask.
              <br />
              ようこそ 変革コミュニティへ まずはMetaMaskの設定をしてくれ。
              たったの3クリックで完了だ。
            </p>
          </Content>
          {isMobile && !isMetaMask && <AppBanner />}
          {!isMobile && !isMetaMask && (
            <Helper>
              <p>まずはMetaMaskのエクステンションをインストールしてね</p>
              <Link href='https://metamask.io/download/'>MetaMaskをインストール</Link>
            </Helper>
          )}
          {isMetaMask && <ConnectWallet />}
        </Main>
      </Container>
    </div>
  )
}

export default Home
