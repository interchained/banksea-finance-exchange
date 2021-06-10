import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Pagination, Select } from 'antd'
import { HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
// @ts-ignore
import LazyLoad from 'react-lazyload'

import lottie from 'lottie-web'

import '../../styles/override-antd-select-dropdown.scss'
import { useHistory } from 'react-router-dom'
import { banksyNftList } from '../../utils/banksyNft'

const PageContainer = styled.div`
  padding-top: 5.6rem;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  background: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default}) no-repeat;
  background-size: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7c6deb;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: 500;
`

const Description = styled.div`
  font-size: 1.4rem;
`

const FilterContainer = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 3rem;
  padding: 2rem 3rem 0.4rem 3rem;
  width: 120.2rem;
  background: rgba(255,255,255,0.7);
  border-radius: 10px;

  .filter-item {
    font-size: 1.6rem;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.4rem;

    .key {
      flex: 2;
      margin-right: 2rem;
      color: #341f97;
      font-weight: bolder;
    }

    .values {
      flex: 9;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .value {
        margin-right: 2rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
      }
    }
  }
`

const MyArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 4rem;
  border-radius: 10px;
  color: white;
  background-color: #7c6deb;

  margin-right: 2rem;
`

const MintArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 4rem;
  border-radius: 10px;
  border-color: #7c6deb;

  background-color: white;
  color: #7c6deb;
`

const SearchInput = styled(Input)`
  width: 22rem;
  height: 4rem;
  border-color: #7c6deb;
  background-color: #e5e2fb;
  border-radius: 10px;

  .ant-input {
    background-color: #e5e2fb;
    color: #7c6deb;
    font-weight: bold;
  }
`

const MySelect = styled(Select)`
  margin-left: 2rem;
  margin-left: 2rem;

  &,
  .ant-select {
    height: 4rem !important;
  }

  .ant-select-selector {
    border-color: #7c6deb !important;
    border-radius: 10px !important;
    width: fit-content;
    height: 5rem !important;
    background-color: #e5e2fb !important;
    color: #7c6deb;
    height: 4rem !important;
    display: flex;
    align-items: center
  }

  .ant-select-selection-item {
    font-weight: bold;
    text-align: center !important;
    line-height: 5rem !important;
    margin: 0 0.5rem !important;
  }
`

const NFTItemCardContainer = styled.div`
  width: 26.2rem;
  height: 40rem;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2.5rem;
  margin-right: 2.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img, .spin {
    width: 24.2rem;
    height: 28.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
  }

  .spin {
    position: relative;
    top: 10rem;
  }

  .name {
    margin-bottom: 1.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .like {
    display: flex;
    align-items: center;

    .heart {
      margin-right: 0.5rem;
    }
  }

  .button {
    width: 100%;
    height: 4rem;
    border-radius: 1rem;
    background-color: #7c6deb;
    color: white;
    font-weight: 500;
  }
`

const NFTListContainer = styled.div`
  width: 120.2rem;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
`

const CustomPagination = styled(Pagination)`
  margin-bottom: 50px;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
    color: #7C6DEB;
  }

  .ant-pagination-item-active {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item-active a {
    color: #7C6DEB !important;
  }

  .ant-pagination-item {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item a {
    //color: rgba(124,109,235,0.2) !important;
  }

  .ant-pagination-next .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
    color: #7C6DEB;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    background-color: rgba(124, 109, 235, 0.2);
  }

  .ant-select {
    color: #7C6DEB;
  }

  .ant-select-arrow {
    color: #7C6DEB;
  }
`

const Filter: React.FC = () => {
  const filterItems = [
    {
      key: 'Chinese-Style Artworks',
      values: [
        'Calligraphy-NFT',
        'Landscape-Painting '
      ]
    },
    {
      key: 'Digital Artworks',
      values: [
        'AI-NFT',
        'Gamification-NFT'
      ]
    },
    {
      key: 'Cross-Platform',
      values: ['Opensea', 'Rarible']
    }
  ]

  return (
    <FilterContainer>
      {filterItems.map(item => (
        <div className="filter-item" key={item.key}>
          <div className="key">{item.key}:</div>
          <div className="values">
            {item.values.map(value => (
              <div className="value" key={value}>
                {value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </FilterContainer>
  )
}

const TypeSelector: React.FC = () => {
  return (
    <MySelect defaultValue="1">
      <Select.Option value="1">All</Select.Option>
      <Select.Option value="2">Picture</Select.Option>
      <Select.Option value="3">Lucy</Select.Option>
    </MySelect>
  )
}

const OrderSelector: React.FC = () => {
  return (
    <MySelect defaultValue="1">
      <Select.Option className="customized-option" value="1">
        Recently Listed
      </Select.Option>
      <Select.Option className="customized-option" value="2">
        Recently Created
      </Select.Option>
      <Select.Option className="customized-option" value="3">
        Recently Sold
      </Select.Option>
      <Select.Option className="customized-option" value="4">
        Price: Low to High
      </Select.Option>
      <Select.Option className="customized-option" value="5">
        Price: High to Low
      </Select.Option>
      <Select.Option className="customized-option" value="6">
        Most Favorited
      </Select.Option>
    </MySelect>
  )
}

const NFTItemCard: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const CornerFlag: React.FC = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '-1rem',
          left: '-0.45rem',
          color: 'white',
          fontWeight: 500,
          textAlign: 'center',
          lineHeight: '3rem',
          width: '8.5rem',
          height: '3.7rem',
          backgroundImage: `url(${require('../../assets/images/collectibles-item-corner-flag-bg.png').default})`,
          backgroundSize: 'cover'
        }}
      >
        on Sale
      </div>
    )
  }

  const ApproveVoteButton: React.FC = () => {
    return (
      <Button
        style={{
          position: 'absolute',
          right: '3.7rem',
          top: '2.4rem',
          width: '10.9rem',
          height: '3rem',
          color: 'white',
          borderRadius: '1rem',
          fontSize: '1.2rem',
          fontWeight: 500,
          border: 'none',
          backgroundColor: '#829FF2'
        }}
      >
        Approve Vote
      </Button>
    )
  }

  const routeToDetailPage = () => history.push(
    `/collectible/${data.name}`,
    { tokenPull:{
      tokenId: `${data.tokenId}`,
      addressContract: `${data.addressContract}`
    } }
  )

  useEffect(() => {
    setLoading(true)
  }, [data])

  return (
    <div style={{ position: 'relative' }}>
      <CornerFlag />
      <ApproveVoteButton />
      <NFTItemCardContainer>
        <div style={{ cursor: 'pointer' }} onClick={routeToDetailPage}>
          <LazyLoad>
            <img
              style={{ display: loading?'none': '' }}
              key={data.id}
              src={data.image}
              alt=""
              onLoad={() => setTimeout(() => setLoading(false), 1500)}
              onError={() => setLoading(false)}
            />
          </LazyLoad>
          {
            loading && <Spin className="spin" />
          }
          <div className="name">{data?.name}</div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
            <div className="like">
              <HeartOutlined className="heart" />5
            </div>
            <div className="price">5 ETH</div>
          </div>
        </div>
      </NFTItemCardContainer>
    </div>
  )
}

const NFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {list?.map((nft: any, index: number) => (
        <NFTItemCard data={nft} key={index} />
      ))}
    </NFTListContainer>
  )
}


const CollectiblesPage: React.FC = () => {
  const [data, setData] = useState<any>()
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>()
  const [searchKey, setSearchKey] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const form = {
    current: current,
    size: 20,
    searchKey: searchKey
  }

  const init = useCallback(async () => {
    banksyNftList(form).then(res => {
      const _data = res.data.data.records.map((item: any) => ({
        ...item,
        image: `https://banksy.mypinata.cloud${item?.image.slice(25)}`
      }))
      console.log(_data)
      setData(_data)
      setTotal(res.data.data.total)
      setLoading(false)
      // console.log(data)
    }).catch(err => err)
  }, [current, searchKey])

  useEffect(() => {
    init()

    lottie.loadAnimation({
      // @ts-ignore
      container: document.getElementById('lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets3.lottiefiles.com/packages/lf20_NddMyN.json'
    })

  }, [init])


  const onChangePage = (pageNumber: number) => {
    setCurrent(pageNumber)
    init()
  }

  const onPressEnter = (e: any) => {
    setSearchKey(e.target.attributes[2].value)
    init()
  }

  return (
    <PageContainer>
      <Title>NFT Marketplace</Title>
      <Description>A market made for NFT, where everything is special.</Description>
      <Filter />
      <div style={{ width: '120.2rem', display: 'flex', justifyContent: 'space-between', marginBottom: '5.5rem' }}>
        <div style={{ display: 'flex' }}>
          <MyArtworksButton>My Artworks</MyArtworksButton>
          <MintArtworksButton>Mint Artworks</MintArtworksButton>
        </div>
        <div style={{ display: 'flex' }}>
          <SearchInput onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />}
          />
          <TypeSelector />
          <OrderSelector />
        </div>
      </div>
      {
        loading?
          <div id="lottie-animation" style={{ width: '150px', height: '150px' }} />:
          <NFTList list={data} />
      }
      <CustomPagination defaultCurrent={current}
        total={total}
        onChange={onChangePage}
        pageSize={20}
        pageSizeOptions={['20']}
      />
    </PageContainer>
  )
}

export default CollectiblesPage
