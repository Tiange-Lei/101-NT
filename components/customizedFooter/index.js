import styled from "styled-components";
import { Row, Col } from "antd";
import Link from "next/link";

const ContactItem = styled.div`
  margin: 0.8em 0;
  position: relative;
  &[data-type="name"] {
    color: #f2c230;
    font-size: 2em;
  }
  &:not([data-type="name"]) {
    padding-left: 2px;
    color: #fff;
  }
  &[data-type]::before {
    position: absolute;
    top: 4px;
    left: 80px;
    width: 14px;
    height: 14px;
    background-size: cover;
    content: "";
  }
  &[data-type="phone"]::before {
    background: url("/icons/phone.svg") center no-repeat;
    fill: #fff;
  }
  &[data-type="address"]::before {
    background: url("/icons/location.svg") center no-repeat;
  }
  &[data-type="email"]::before {
    background: url("/icons/mail.svg") center no-repeat;
  }
  &[data-type="mobile"]::before {
    background: url("/icons/mobile.svg") center no-repeat;
  }
`;
const SiteLink = styled.div`
  margin: 1em 0;
  > a {
    color: #efb348;
    font-weight: 500;
  }
`;

const CustomizedFooter = () => (
  <div>
    <Row gutter={24}>
      <Col lg={8} md={24} sm={24} xs={24}>
        <ContactItem data-type="address">
          56 Pitt Street Sydney, Australia, 2000
        </ContactItem>
        <ContactItem data-type="email">accounts@sdce.com.au</ContactItem>
        <ContactItem data-type="phone">02 8067 0605</ContactItem>
      </Col>
      <Col lg={8} md={24} sm={24} xs={24}>
        <SiteLink>
          <a>AML and CTF Policy</a>
        </SiteLink>
        <SiteLink>
          <a>Complaints and Disputes</a>
        </SiteLink>
        <SiteLink>
          <a>Privacy Policy</a>
        </SiteLink>
        <SiteLink>
          <a>Terms of Service</a>
        </SiteLink>
      </Col>
      <Col lg={8} md={24} sm={24} xs={24}>
      </Col>
    </Row>
  </div>
);

export default CustomizedFooter;
