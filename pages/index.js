import BannerUI from "../components/bannerUI"
import styled from 'styled-components';
import PriceBoard from "../components/sgx/PriceBoard3";

export default function Home() {

  const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  color: #efb348;
  text-align: center;
  padding: 3rem 0 0;
`;
  return (
      <BannerUI>
        <Title>Node Fintech</Title>
      </BannerUI>
  )
}
