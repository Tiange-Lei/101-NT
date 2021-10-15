import { Layout } from "antd";
import Navbar from "../navbar";
import useIsClient from "../../utils/useIsClient";
import CustomizedFooter from "../customizedFooter";

const { Content, Footer, Header } = Layout;

const GlobalLayout = (props) => (
  <Layout className="global-layout">
    <Header className="global-header">{useIsClient() && <Navbar />}</Header>
    <Content className="global-content">
      <Layout className="content-layout">
        <Content className="main-content">
          <main>{props.children}</main>
        </Content>
      </Layout>
    </Content>
    <Footer className="global-footer">
        <CustomizedFooter />
    </Footer>
  </Layout>
);

export default GlobalLayout;
