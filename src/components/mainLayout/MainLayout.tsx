import { DatePicker, Layout, Menu, Statistic } from "antd";
import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_CONFIG } from "../../services/router";
import Icon from "../icon/Icon";
import Logo from "../logo/Logo";
import "./MainLayout.css";

const { Sider, Content } = Layout;
const { Item } = Menu;

const MainLayout: FC = () => {
  const { pathname } = useLocation();
  return (
    <Layout className="app">
      <Sider className="sider" theme="light" collapsible>
        <Logo />
        <Menu defaultSelectedKeys={[pathname]}>
          <Item key="detail" icon={<Icon icon={"icon-zhuye"} />}>
            <Link to="/">明细</Link>
          </Item>
          <Item key="chart" icon={<Icon icon={"icon-Chart"} />}>
            <Link to="/chart">图表</Link>
          </Item>
        </Menu>
      </Sider>
      <Content className="content">
        <div className={"header"}>
          <Logo size={"large"} />
          <div className={"header-category"}>
            <Statistic
              title={"请选择月份"}
              valueRender={() => <DatePicker picker={"month"} />}
            />
            <Statistic title={"总收入"} value={10000} />
            <Statistic title={"总支出"} value={5000} />
          </div>
        </div>
        <div className="body">{renderRoutes(ROUTE_CONFIG)}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
